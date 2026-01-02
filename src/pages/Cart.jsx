import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');
    const [isApplying, setIsApplying] = useState(false);

    const applyPromo = async () => {
        if (!promoCode) return;

        setIsApplying(true);
        setPromoError('');

        try {
            const q = query(collection(db, 'promos'), where('code', '==', promoCode.toUpperCase()));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const promoData = querySnapshot.docs[0].data();
                let finalDiscount = 0;

                if (promoData.discountType === 'percentage') {
                    const potentialDiscount = cartTotal * promoData.value;
                    finalDiscount = Math.min(potentialDiscount, promoData.maxDiscount || Infinity);
                } else {
                    finalDiscount = promoData.value;
                }

                setDiscount(finalDiscount);
                setPromoError('');
            } else {
                setPromoError('Invalid Promo Code');
                setDiscount(0);
            }
        } catch (error) {
            console.error("Error applying promo:", error);
            setPromoError('Error processing coupon');
        } finally {
            setIsApplying(false);
        }
    };

    const tax = cartTotal * 0.1; // 10% tax
    const deliveryFee = cart.length > 0 ? 2.99 : 0;
    const totalBeforeDiscount = cartTotal + tax + deliveryFee;
    const grandTotal = Math.max(0, totalBeforeDiscount - discount);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100"
                >
                    <div className="bg-brand/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                        <ShoppingCart className="w-12 h-12 text-brand" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Your cart is empty</h2>
                    <p className="text-gray-500 mb-10 text-lg font-medium">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/"
                        className="inline-block bg-brand text-white px-10 py-4 rounded-2xl font-black hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-95 uppercase tracking-widest text-sm"
                    >
                        Explore Restaurants
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-6 mb-12">
                    <Link to="/" className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-gray-400 hover:text-brand transition-colors group">
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Your Order</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode='popLayout'>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex items-center gap-8 group hover:shadow-xl transition-all"
                                >
                                    <img src={item.image} alt={item.name} className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-[24px] shadow-md" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-xl font-black text-gray-900 leading-tight">{item.name}</h3>
                                                <p className="text-xs text-brand font-black uppercase tracking-widest mt-1">{item.restaurantName}</p>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-200 hover:text-brand transition-colors p-2"><Trash2 className="w-6 h-6" /></button>
                                        </div>
                                        <div className="flex justify-between items-end mt-6">
                                            <span className="text-2xl font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                            <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden px-1 border border-gray-100">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="p-3 hover:text-brand transition-colors font-black"><Minus className="w-4 h-4" /></button>
                                                <span className="px-5 font-black text-lg">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="p-3 hover:text-brand transition-colors font-black"><Plus className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <Link to="/" className="inline-flex items-center text-brand font-black uppercase tracking-widest text-sm hover:underline underline-offset-8 pt-6 transition-all"><Plus className="w-4 h-4 mr-2" />Add more items</Link>
                    </div>

                    <div className="lg:col-span-1">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 text-white p-10 rounded-[48px] shadow-2xl sticky top-28 border border-white/5">
                            <div className="space-y-6 mb-10">
                                <div className="space-y-3 pb-6 border-b border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Coupon Code</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="XXXXXX"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-black tracking-widest outline-none focus:border-brand/40 uppercase placeholder:text-white/20"
                                        />
                                        <button onClick={applyPromo} disabled={isApplying} className="bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors disabled:opacity-50">
                                            {isApplying ? '...' : 'Apply'}
                                        </button>
                                    </div>
                                    {promoError && <p className="text-brand text-[10px] font-bold uppercase tracking-widest">{promoError}</p>}
                                    {discount > 0 && <p className="text-green-500 text-[10px] font-bold uppercase tracking-widest">Promotion Applied!</p>}
                                </div>
                                <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-xs"><span>Subtotal</span><span className="text-white font-black text-base">${cartTotal.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-xs"><span>Tax (10%)</span><span className="text-white font-black text-base">${tax.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-xs"><span>Delivery Fee</span><span className="text-white font-black text-base">${deliveryFee.toFixed(2)}</span></div>
                                {discount > 0 && <div className="flex justify-between text-green-500 font-black uppercase tracking-widest text-xs"><span>Discount</span><span className="text-base">-${discount.toFixed(2)}</span></div>}
                                <div className="border-t border-white/10 pt-8 flex justify-between items-center mt-4"><span className="text-xl font-bold uppercase tracking-widest">Total</span><span className="text-4xl font-black text-brand">${grandTotal.toFixed(2)}</span></div>
                            </div>
                            <button onClick={() => navigate('/payment', { state: { total: grandTotal } })} className="w-full flex justify-center items-center space-x-4 py-6 bg-brand text-white rounded-3xl font-black text-xl hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-95 uppercase tracking-widest"><CreditCard className="w-6 h-6" /><span>Go to Checkout</span></button>
                            <p className="text-center text-white/30 text-[10px] font-bold uppercase tracking-widest mt-8 px-6 leading-relaxed">Secure encrypted checkout powered by FoodKart Pay.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
