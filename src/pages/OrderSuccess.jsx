import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    const location = useLocation();
    const order = location.state?.order;

    if (!order) {
        return <Navigate to="/" replace />;
    }

    // Mock calculations if not fully present in state
    const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxAndFees = order.total - subtotal;

    return (
        <div className="min-h-screen bg-white pt-20 pb-20 px-4">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                {/* Success Icon Section */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="relative mb-8"
                >
                    <div className="absolute inset-0 bg-green-100 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                    <div className="relative bg-green-50 w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                        <CheckCircle className="w-12 h-12 text-green-500 fill-white" strokeWidth={3} />
                    </div>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Order Placed Successfully!</h1>
                    <p className="text-gray-500 font-bold text-lg max-w-md mx-auto leading-relaxed">
                        Your delicious food is being prepared and will be delivered shortly.
                    </p>
                </motion.div>

                {/* Order Summary Card */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-2xl bg-white rounded-[48px] shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-gray-50 p-10 md:p-14 mb-12"
                >
                    <div className="flex items-center space-x-3 mb-10 pb-6 border-b border-gray-50">
                        <Package className="w-5 h-5 text-gray-400" />
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Order Summary</h3>
                    </div>

                    <div className="space-y-8 mb-12">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center group">
                                <div className="flex items-center space-x-6">
                                    <span className="bg-gray-50 text-gray-900 px-4 py-1.5 rounded-xl font-black text-sm min-w-[40px] text-center border border-gray-100">
                                        {item.quantity}
                                    </span>
                                    <span className="text-xl font-black text-gray-900 tracking-tight group-hover:text-brand transition-colors">
                                        {item.name}
                                    </span>
                                </div>
                                <span className="text-xl font-black text-gray-900 tracking-tighter">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 pt-8 border-t border-gray-50">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-bold">Subtotal</span>
                            <span className="text-gray-900 font-black tracking-tighter text-lg">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-bold">Tax & Fees</span>
                            <span className="text-gray-900 font-black tracking-tighter text-lg">${taxAndFees.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-6">
                            <span className="text-2xl font-black text-gray-900 tracking-tight">Grand Total</span>
                            <span className="text-3xl font-black text-brand tracking-tighter">${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl px-4"
                >
                    <Link
                        to="/"
                        className="flex-1 bg-gray-900 text-white py-6 rounded-[24px] font-black text-center hover:bg-brand transition-all flex items-center justify-center space-x-4 shadow-xl hover:shadow-brand/20 active:scale-95 uppercase tracking-widest text-xs"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back To Home</span>
                    </Link>
                    <button
                        className="flex-1 bg-white border-2 border-gray-100 text-gray-400 py-6 rounded-[24px] font-black hover:bg-gray-50 transition-all flex items-center justify-center space-x-4 uppercase tracking-widest text-xs cursor-default"
                        onClick={() => { }}
                    >
                        <Send className="w-4 h-4 opacity-30" />
                        <span>Tracking Order</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderSuccess;
