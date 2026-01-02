import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Info, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const RestaurantMenu = () => {
    const { id } = useParams();
    const { cart, addToCart, updateQuantity } = useCart();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const docRef = doc(db, 'restaurants', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRestaurant({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("No such restaurant!");
                }
            } catch (error) {
                console.error("Error fetching restaurant:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-gray-100 border-t-brand rounded-full animate-spin"></div>
                    <p className="mt-6 text-gray-400 font-bold uppercase tracking-widest text-xs">Preparing Menu...</p>
                </div>
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-black mb-4">Restaurant not found</h2>
                    <Link to="/" className="text-brand font-bold hover:underline">Back to Home</Link>
                </div>
            </div>
        );
    }

    const getItemQuantity = (itemId) => {
        const item = cart.find(i => i.id === itemId);
        return item ? item.quantity : 0;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Restaurant Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link to="/" className="inline-flex items-center text-gray-400 hover:text-brand mb-8 font-bold transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Restaurants</span>
                    </Link>

                    <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
                        <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full md:w-80 aspect-[4/3] object-cover rounded-[40px] shadow-2xl shadow-gray-200"
                        />
                        <div className="flex-1">
                            <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">{restaurant.name}</h1>
                            <p className="text-gray-400 text-xl font-medium mb-8 uppercase tracking-widest">{restaurant.cuisine}</p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="flex items-center space-x-2 bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100">
                                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                    <span className="font-black text-gray-900">{restaurant.rating} <span className="text-gray-400 font-bold text-xs ml-1">(500+)</span></span>
                                </div>
                                <div className="flex items-center space-x-2 bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span className="font-black text-gray-900">25-30 min</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100">
                                    <Info className="w-4 h-4 text-gray-400" />
                                    <span className="font-black text-gray-900">Info</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 py-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase">Menu Selection</h2>
                        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">Freshly prepared for you</p>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {restaurant.menu.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 border border-gray-50 flex flex-col md:flex-row gap-10 group"
                        >
                            <div className="w-full md:w-56 h-56 shrink-0 overflow-hidden rounded-[32px] shadow-sm">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-center py-2">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tight group-hover:text-brand transition-colors">{item.name}</h3>
                                    <span className="hidden md:block text-2xl font-black text-brand tracking-tighter">${item.price.toFixed(2)}</span>
                                </div>
                                <p className="text-gray-400 text-base font-medium mb-8 leading-relaxed max-w-2xl">{item.description}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-300">Recommended</span>
                                    <div className="md:hidden">
                                        <span className="text-2xl font-black text-brand tracking-tighter">${item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-end items-end shrink-0 pl-10">
                                {getItemQuantity(item.id) > 0 ? (
                                    <div className="flex items-center bg-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden p-1">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="p-3 hover:text-brand transition-colors"><Minus className="w-4 h-4" /></button>
                                        <span className="px-5 font-black text-xl min-w-[50px] text-center">{getItemQuantity(item.id)}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="p-3 hover:text-brand transition-colors"><Plus className="w-4 h-4" /></button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(item, restaurant.id, restaurant.name)}
                                        className="flex items-center space-x-3 bg-brand text-white px-10 py-4.5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-95 group/btn"
                                    >
                                        <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
                                        <span>Add to Cart</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {cart.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-8 left-4 right-4 z-40 bg-gray-900 text-white p-5 rounded-[24px] shadow-2xl flex items-center justify-between md:hidden border border-white/10"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-brand p-2.5 rounded-xl"><ShoppingBag className="w-6 h-6" /></div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Cart Total</span>
                                <span className="text-xl font-black leading-none">${cart.reduce((a, b) => a + (b.price * b.quantity), 0).toFixed(2)}</span>
                            </div>
                        </div>
                        <Link to="/cart" className="bg-white text-gray-900 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-brand hover:text-white transition-colors">View Cart</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RestaurantMenu;
