import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Property } from '../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  Home, 
  Users, 
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  Map as MapIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    campus: 'all'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  useEffect(() => {
    const q = query(
      collection(db, 'properties'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
      setProperties(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.campus.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || p.type === filters.type;
    const matchesCampus = filters.campus === 'all' || p.campus === filters.campus;
    
    let matchesPrice = true;
    if (filters.priceRange === 'under500') matchesPrice = p.price < 500;
    else if (filters.priceRange === '500-1000') matchesPrice = p.price >= 500 && p.price <= 1000;
    else if (filters.priceRange === 'over1000') matchesPrice = p.price > 1000;

    return matchesSearch && matchesType && matchesCampus && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-end">
        <div className="flex-1 w-full">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Find Your Next Home</h1>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by campus, city, or property name..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 rounded-lg transition-all flex items-center gap-2 text-sm font-bold",
              viewMode === 'grid' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <LayoutGrid className="w-4 h-4" /> Grid
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={cn(
              "p-2 rounded-lg transition-all flex items-center gap-2 text-sm font-bold",
              viewMode === 'map' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <MapIcon className="w-4 h-4" /> Map
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Property Type</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="studio">Studio</option>
                  <option value="room">Shared Room</option>
                  <option value="house">House</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Price Range</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                >
                  <option value="all">Any Price</option>
                  <option value="under500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="over1000">Over $1,000</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Campus</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  value={filters.campus}
                  onChange={(e) => setFilters({...filters, campus: e.target.value})}
                >
                  <option value="all">All Campuses</option>
                  <option value="City Center">City Center</option>
                  <option value="North Campus">North Campus</option>
                  <option value="South Campus">South Campus</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => setFilters({ type: 'all', priceRange: 'all', campus: 'all' })}
              className="w-full mt-8 py-3 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>

          <div className="bg-blue-600 p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold text-xl mb-2">Need Help?</h4>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">Our support team is here to help you find the perfect place.</p>
              <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all">
                Contact Support
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse bg-white rounded-3xl h-96 border border-slate-100"></div>
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProperties.map((property) => (
                  <motion.div 
                    key={property.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
                  >
                    <Link to={`/property/${property.id}`}>
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={property.images[0] || `https://picsum.photos/seed/${property.id}/800/600`} 
                          alt={property.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
                          {property.type}
                        </div>
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                          Verified
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1 pr-4">
                            <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">{property.title}</h3>
                            <p className="text-slate-500 text-sm flex items-center gap-1">
                              <MapPin className="w-4 h-4" /> {property.campus}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-black text-blue-600">${property.price}</span>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase">/ month</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-slate-400 text-xs border-t border-slate-50 pt-4">
                          <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                            <Home className="w-3.5 h-3.5" /> {property.rooms} Rooms
                          </span>
                          <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                            <Users className="w-3.5 h-3.5" /> {property.type}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No properties found</h3>
              <p className="text-slate-500 mb-8">Try adjusting your filters or search term.</p>
              <button 
                onClick={() => { setSearchTerm(''); setFilters({ type: 'all', priceRange: 'all', campus: 'all' }); }}
                className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function for class names
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default SearchPage;
