import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user, loading } = useAuth();

    // Safety ref to track if we should sync to DB
    const isLoadedRef = useRef(false);

    // 1. Load Cart Logic
    useEffect(() => {
        const loadCart = async () => {
            if (loading) return; // Wait for auth to settle

            if (user) {
                try {
                    const docRef = doc(db, 'carts', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setCart(docSnap.data().items || []);
                    } else {
                        // Check local storage for migrating guest cart
                        const localCart = localStorage.getItem('foodkart_cart');
                        if (localCart) {
                            const parsed = JSON.parse(localCart);
                            setCart(parsed);
                            setDoc(docRef, { items: parsed }).catch(console.error);
                            localStorage.removeItem('foodkart_cart');
                        }
                    }
                } catch (err) {
                    console.error("Error fetching cart:", err);
                }
            } else {
                // Guest User
                const localCart = localStorage.getItem('foodkart_cart');
                if (localCart) {
                    setCart(JSON.parse(localCart));
                }
            }
            isLoadedRef.current = true;
        };

        loadCart();
    }, [user, loading]);

    // 2. Persist Helper
    const saveCartToStorage = async (newCart) => {
        if (!isLoadedRef.current && user) return; // Don't overwrite cloud with empty initial state

        if (user) {
            try {
                await setDoc(doc(db, 'carts', user.uid), { items: newCart });
            } catch (err) {
                console.error("Error saving cart:", err);
            }
        } else {
            localStorage.setItem('foodkart_cart', JSON.stringify(newCart));
        }
    };

    // 3. Actions
    const addToCart = useCallback((item, restaurantId, restaurantName) => {
        setCart((prevCart) => {
            // Simplified logic: Just add the item, don't worry about restaurant matching for now
            // to prevent accidental clearing of the cart.
            const existingItemIndex = prevCart.findIndex(i => String(i.id) === String(item.id));

            let newCart;
            if (existingItemIndex > -1) {
                // Update quantity
                newCart = prevCart.map((i, idx) =>
                    idx === existingItemIndex ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                // Add new item
                newCart = [...prevCart, {
                    ...item,
                    quantity: 1,
                    restaurantId: String(restaurantId),
                    restaurantName
                }];
            }

            saveCartToStorage(newCart);
            return newCart;
        });
    }, [user]);

    const removeFromCart = useCallback((itemId) => {
        setCart((prevCart) => {
            const newCart = prevCart.filter(i => String(i.id) !== String(itemId));
            saveCartToStorage(newCart);
            return newCart;
        });
    }, [user]);

    const updateQuantity = useCallback((itemId, amount) => {
        setCart((prevCart) => {
            const newCart = prevCart.map(item => {
                if (String(item.id) === String(itemId)) {
                    return { ...item, quantity: Math.max(1, item.quantity + amount) };
                }
                return item;
            });
            saveCartToStorage(newCart);
            return newCart;
        });
    }, [user]);

    const clearCart = useCallback(async () => {
        setCart([]);
        if (user) {
            await setDoc(doc(db, 'carts', user.uid), { items: [] });
        } else {
            localStorage.removeItem('foodkart_cart');
        }
    }, [user]);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
