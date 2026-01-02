import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Search, Filter, Heart, Clock, Percent } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Pizza', 'Burger', 'Sushi', 'Italian', 'Chinese', 'Indian', 'Healthy'];

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'restaurants'));
                const resData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRestaurants(resData);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    const filteredRestaurants = restaurants.filter(res => {
        const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || res.cuisine.includes(activeCategory);
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[500px] flex items-center overflow-hidden mx-4 sm:mx-12 lg:mx-16 mt-6 rounded-[60px]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600"
                        className="w-full h-full object-cover"
                        alt="Hero background"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl px-8 md:px-20 py-20">
                    <div className="max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-[1.05]"
                        >
                            Order Food From Your Favorite Restaurants
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-2 rounded-2xl shadow-2xl flex items-center max-w-lg border border-white/20"
                        >
                            <div className="flex-1 flex items-center px-5 py-2">
                                <Search className="text-gray-400 w-6 h-6 mr-4" />
                                <input
                                    type="text"
                                    placeholder="Search for restaurants or cuisines..."
                                    className="w-full py-2 bg-transparent outline-none text-gray-700 font-semibold placeholder:text-gray-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Voucher Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 pt-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden bg-gradient-to-r from-brand to-rose-500 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-brand/20 group cursor-pointer"
                >
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-black/10 rounded-full blur-2xl group-hover:bg-black/20 transition-all duration-700"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center space-x-8 text-center md:text-left">
                            <div className="hidden md:flex w-24 h-24 bg-white/20 backdrop-blur-md rounded-[32px] items-center justify-center border border-white/30 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                <Percent className="text-white w-12 h-12" strokeWidth={3} />
                            </div>
                            <div>
                                <h3 className="text-white text-5xl font-black tracking-tighter mb-2">13.13 MEGA SALE</h3>
                                <p className="text-rose-100 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Special Weekend Discount • Limited Time Offer</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-end">
                            <div className="bg-white/10 backdrop-blur-md px-10 py-5 rounded-[32px] border border-white/20 mb-4 group-hover:bg-white/20 transition-all">
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-black text-rose-100 uppercase tracking-widest mb-1">Use Code</span>
                                    <span className="text-white text-3xl font-black tracking-widest">FK1313</span>
                                </div>
                            </div>
                            <p className="text-white font-black text-xl tracking-tight">GET 50% OFF UP TO $13</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Categories Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 pt-16">
                <div className="flex items-center space-x-4 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`whitespace-nowrap px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all
                                ${activeCategory === category
                                    ? 'bg-gray-900 text-white shadow-xl shadow-gray-200'
                                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Restaurant List */}
            <section className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 py-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Popular Restaurants</h2>

                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 bg-gray-50 border border-gray-100 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 hover:bg-gray-100 transition-colors">
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-gray-50 border border-gray-100 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 hover:bg-gray-100 transition-colors">
                            <Star className="w-4 h-4" />
                            <span>Rating 4.0+</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="animate-pulse bg-gray-50 h-[400px] rounded-[48px]"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {filteredRestaurants.length > 0 ? (
                            filteredRestaurants.map((res, index) => (
                                <motion.div
                                    key={res.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group bg-white rounded-[48px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64px_rgba(225,29,72,0.08)] transition-all duration-500 overflow-hidden border border-gray-50 flex flex-col"
                                >
                                    {/* Image Section */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Link to={`/restaurant/${res.id}`}>
                                            <img
                                                src={res.image}
                                                alt={res.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                        </Link>

                                        {/* Overlay Badges */}
                                        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                                            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-xl border border-white/20">
                                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                                <span className="text-xs font-black text-gray-900">{res.rating}</span>
                                            </div>
                                            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-xl border border-white/20">
                                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="text-xs font-black text-gray-900">25-30 min</span>
                                            </div>
                                        </div>

                                        {/* Heart Button -> Navigate to Cart */}
                                        <Link
                                            to="/cart"
                                            className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-brand transition-all border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300 shadow-xl z-10"
                                        >
                                            <Heart className="w-5 h-5" />
                                        </Link>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-brand transition-colors tracking-tight">
                                                {res.name}
                                            </h3>
                                            <span className="text-sm font-black text-gray-300 tracking-widest">$$</span>
                                        </div>

                                        <p className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">{res.cuisine}</p>

                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-xs font-black text-green-600 uppercase tracking-widest">Free Delivery</span>
                                            </div>
                                            <Link
                                                to={`/restaurant/${res.id}`}
                                                className="text-brand font-black text-xs uppercase tracking-[0.2em] border-b-2 border-transparent hover:border-brand transition-all pb-1 translate-x-2 group-hover:translate-x-0"
                                            >
                                                View Menu
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-24">
                                <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">No restaurants found</h3>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Try searching for something else</p>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
