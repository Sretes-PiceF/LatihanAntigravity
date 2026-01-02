import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="bg-brand p-1.5 rounded-lg">
                                <ShoppingCart className="text-white w-5 h-5 fill-white" />
                            </div>
                            <span className="text-2xl font-black text-gray-900 tracking-tight">
                                FoodKart
                            </span>
                        </Link>
                    </div>

                    {/* Main Nav Links - Centered */}
                    <div className="hidden md:flex items-center space-x-10 flex-1 justify-center">
                        <Link to="/" className="text-gray-900 hover:text-brand font-bold transition-colors text-xs uppercase tracking-[0.2em]">Home</Link>
                        <Link to="/" className="text-gray-400 hover:text-brand font-bold transition-colors text-xs uppercase tracking-[0.2em]">Restaurants</Link>
                        <Link to="/" className="text-gray-400 hover:text-brand font-bold transition-colors text-xs uppercase tracking-[0.2em]">Offers</Link>
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/cart" className="relative p-2 text-gray-700 hover:text-brand transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-brand text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 hover:text-brand hover:bg-gray-100 transition-all border border-gray-100"
                                    >
                                        <User className="w-5 h-5" />
                                    </button>

                                    <AnimatePresence>
                                        {isUserDropdownOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-0"
                                                    onClick={() => setIsUserDropdownOpen(false)}
                                                ></div>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute right-0 mt-4 w-56 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 py-3 z-10 overflow-hidden"
                                                >
                                                    <div className="px-6 py-3 border-b border-gray-50 mb-2">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account</p>
                                                        <p className="text-sm font-black text-gray-900 truncate">{user.name}</p>
                                                    </div>
                                                    <button className="w-full text-left px-6 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors uppercase tracking-widest">Profile Setting</button>
                                                    <button className="w-full text-left px-6 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors uppercase tracking-widest">My Orders</button>
                                                    <button className="w-full text-left px-6 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors uppercase tracking-widest">Settings</button>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-brand hover:bg-brand/5 transition-all border border-gray-100"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-6">
                                <Link
                                    to="/login"
                                    className="text-gray-900 hover:text-brand font-black text-xs uppercase tracking-widest transition-colors px-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-brand text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-95"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link to="/cart" className="relative p-2">
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 p-2"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2 text-center">
                            <Link to="/" className="block py-2 text-gray-700 font-bold" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link to="/" className="block py-2 text-gray-400 font-bold" onClick={() => setIsMenuOpen(false)}>Restaurants</Link>
                            <Link to="/" className="block py-2 text-gray-400 font-bold" onClick={() => setIsMenuOpen(false)}>Offers</Link>
                            {user ? (
                                <div className="border-t border-gray-50 my-4 pt-4 space-y-4">
                                    <div className="flex items-center justify-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 border border-gray-100">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-black text-gray-900 uppercase tracking-widest">{user.name}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button className="py-3 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">Profile</button>
                                        <button className="py-3 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">Settings</button>
                                    </div>
                                    <button
                                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                        className="flex items-center justify-center space-x-2 w-full py-4 bg-brand/5 text-brand rounded-2xl font-black text-xs uppercase tracking-widest"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-50">
                                    <Link to="/login" className="py-2 text-gray-700 font-bold" onClick={() => setIsMenuOpen(false)}>Login</Link>
                                    <Link to="/signup" className="py-2 text-brand font-black" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
