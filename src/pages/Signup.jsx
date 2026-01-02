import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            signup({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-white pt-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[440px]"
            >
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Create Account</h1>
                    <p className="text-gray-400 font-bold text-lg">Join FoodKart and start ordering today!</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-brand/5 text-brand p-4 rounded-2xl text-sm font-bold border border-brand/10 text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Name Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-300">
                            <User className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="block w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-[20px] focus:border-brand/30 focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold placeholder:text-gray-300 text-gray-700 shadow-sm shadow-gray-100/50"
                            placeholder="Full Name"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-300">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="block w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-[20px] focus:border-brand/30 focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold placeholder:text-gray-300 text-gray-700 shadow-sm shadow-gray-100/50"
                            placeholder="Email Address"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-300">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="block w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-[20px] focus:border-brand/30 focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold placeholder:text-gray-300 text-gray-700 shadow-sm shadow-gray-100/50"
                            placeholder="Password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-300">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <input
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="block w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-[20px] focus:border-brand/30 focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold placeholder:text-gray-300 text-gray-700 shadow-sm shadow-gray-100/50"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-brand text-white rounded-[20px] font-black text-xl hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-[0.98] disabled:bg-gray-200 mt-4"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 text-center pb-20">
                    <p className="text-gray-500 font-bold">
                        Already have an account?{' '}
                        <Link to="/login" className="text-brand hover:underline font-black">
                            Log in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
