import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ShoppingCart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="bg-brand p-2 rounded-xl shadow-lg shadow-brand/20">
                                <ShoppingCart className="text-white w-5 h-5 fill-white" />
                            </div>
                            <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">FoodKart</span>
                        </div>
                        <p className="text-sm font-bold uppercase tracking-widest leading-relaxed mb-8 text-gray-400">
                            The best food delivery service in town. Fresh, hot, and fast delivery to your doorstep.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-300 hover:text-brand transition-all"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-300 hover:text-brand transition-all"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-300 hover:text-brand transition-all"><Instagram className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-gray-900 font-black mb-8 uppercase text-xs tracking-[0.2em]">Quick Links</h3>
                        <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
                            <li><a href="/" className="hover:text-brand transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-brand transition-colors">Restaurants</a></li>
                            <li><a href="#" className="hover:text-brand transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-brand transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-900 font-black mb-8 uppercase text-xs tracking-[0.2em]">Help & Legal</h3>
                        <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
                            <li><a href="#" className="hover:text-brand transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-brand transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-brand transition-colors">Refund Policy</a></li>
                            <li><a href="#" className="hover:text-brand transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-900 font-black mb-8 uppercase text-xs tracking-[0.2em]">Contact Us</h3>
                        <ul className="space-y-6 text-[10px] font-black uppercase tracking-widest">
                            <li className="flex items-start space-x-4">
                                <MapPin className="w-5 h-5 text-brand shrink-0 opacity-20" />
                                <span className="leading-relaxed">123 Food Street, Tasty Town, NY 12345</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <Phone className="w-5 h-5 text-brand shrink-0 opacity-20" />
                                <span>+1 (234) 567-890</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <Mail className="w-5 h-5 text-brand shrink-0 opacity-20" />
                                <span>support@foodkart.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-20 pt-10 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                    <p>© {new Date().getFullYear()} FoodKart • Handcrafted for foodies</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
