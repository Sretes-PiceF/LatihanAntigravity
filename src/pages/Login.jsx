import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            login(email, password);
            navigate(from, { replace: true });
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
                    <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Login</h1>
                    <p className="text-gray-400 font-bold text-lg">Welcome back to FoodKart!</p>
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

                    <div className="relative">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-300">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-[20px] focus:border-brand/30 focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold placeholder:text-gray-300 text-gray-700 shadow-sm shadow-gray-100/50"
                            placeholder="Email Address"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-300">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-[20px] focus:border-brand/30 focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold placeholder:text-gray-300 text-gray-700 shadow-sm shadow-gray-100/50"
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-brand text-white rounded-[20px] font-black text-xl hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-[0.98] disabled:bg-gray-200 mt-4"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 font-bold">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-brand hover:underline font-black">
                            Sign up
                        </Link>
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 bg-[#F0F7FF] p-8 rounded-[24px] border border-[#E1EEFF]"
                >
                    <h3 className="text-[#2B6CB0] font-black text-sm uppercase tracking-widest mb-4">Demo Credentials:</h3>
                    <ul className="text-[#4A5568] text-sm font-bold space-y-2">
                        <li className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-[#4299E1] rounded-full"></span>
                            <span>1. Signup first to create an account</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-[#4299E1] rounded-full"></span>
                            <span>2. Or use any credentials if you've already signed up</span>
                        </li>
                    </ul>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Login;
