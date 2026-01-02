import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart, cart } = useCart();
    const { user } = useAuth();
    const totalAmount = location.state?.total || 0;

    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');

        if (parseFloat(amount) !== parseFloat(totalAmount.toFixed(2))) {
            return setError(`Incorrect amount. Please enter exactly $${totalAmount.toFixed(2)}`);
        }

        setLoading(true);

        try {
            // Save order to Firestore
            const orderData = {
                userId: user?.uid || 'guest',
                userName: user?.displayName || 'Guest User',
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    restaurantName: item.restaurantName
                })),
                total: totalAmount,
                status: 'confirmed',
                createdAt: serverTimestamp(),
                orderId: Math.floor(100000 + Math.random() * 900000).toString()
            };

            const docRef = await addDoc(collection(db, 'orders'), orderData);

            // Pass the generated ID to success page
            await clearCart();
            navigate('/order-success', {
                state: {
                    order: {
                        ...orderData,
                        firestoreId: docRef.id,
                        date: new Date().toISOString() // for display
                    }
                }
            });
        } catch (err) {
            console.error("Payment error:", err);
            setError('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (totalAmount === 0 && !loading) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full">
                <button
                    onClick={() => navigate('/cart')}
                    className="flex items-center text-gray-400 hover:text-brand mb-8 font-black transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Cart
                </button>

                <div className="bg-white rounded-[48px] shadow-2xl overflow-hidden border border-gray-100">
                    <div className="bg-gray-900 p-12 text-white text-center">
                        <div className="bg-brand w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-xl shadow-brand/20">
                            <CreditCard className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter">Secure Checkout</h1>
                        <p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">Verify payment to complete order</p>
                    </div>

                    <div className="p-10 sm:p-12">
                        <div className="bg-gray-50 p-8 rounded-[32px] mb-12 flex justify-between items-center border border-gray-100">
                            <div>
                                <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest block mb-1">Amount to Pay</span>
                                <span className="text-4xl font-black text-gray-900 tracking-tighter">${totalAmount.toFixed(2)}</span>
                            </div>
                            <ShieldCheck className="w-12 h-12 text-brand opacity-20" />
                        </div>

                        <form onSubmit={handlePayment} className="space-y-10">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 ml-1 uppercase tracking-widest">Type total amount to confirm</label>
                                <div className="relative">
                                    <span className="absolute left-7 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-[24px] py-7 pl-14 pr-7 text-3xl font-black focus:ring-8 focus:ring-brand/5 focus:border-brand transition-all outline-none tracking-tighter"
                                        placeholder="0.00"
                                    />
                                </div>
                                {error && (
                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-2 text-brand text-xs font-black bg-brand/5 p-4 rounded-2xl mt-4 uppercase tracking-wider">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gray-900 text-white rounded-[32px] py-7 font-black text-xl hover:bg-brand transition-all shadow-2xl hover:shadow-brand/30 active:scale-95 flex items-center justify-center space-x-4 disabled:bg-gray-200 uppercase tracking-widest"
                            >
                                {loading ? (
                                    <><div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div><span>Processing...</span></>
                                ) : (
                                    <><CheckCircle2 className="w-7 h-7" /><span>Complete Order</span></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Payment;
