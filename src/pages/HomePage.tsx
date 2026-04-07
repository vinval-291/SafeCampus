import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Home,
  Users,
  Building2
} from 'lucide-react';
import { motion } from 'motion/react';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
                <ShieldCheck className="w-4 h-4" />
                Verified Student Housing
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Find Your Perfect <br />
                <span className="text-blue-600">Safe Haven</span> Near Campus
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                SafeCampus connects students with verified landlords. No fraud, no hidden fees, just quality housing you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/search" 
                  className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group"
                >
                  Find Accommodation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/list-property" 
                  className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  List Your Property
                </Link>
              </div>
              
              {/* Development Seeding Button */}
              {process.env.NODE_ENV === 'development' && (
                <button 
                  onClick={async () => {
                    const { seedDatabase } = await import('../seed');
                    await seedDatabase();
                    alert('Database seeded!');
                  }}
                  className="mt-4 text-xs text-slate-400 hover:text-blue-600 underline"
                >
                  Seed Sample Data
                </button>
              )}
              
              <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Building2 className="w-5 h-5" />
                  <span>500+ Properties</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Users className="w-5 h-5" />
                  <span>10k+ Students</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Apartment" 
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Modern Studio near City Center</h3>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> 2 mins walk to Campus
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-blue-600">$450</span>
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Per Month</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full -z-10 blur-2xl opacity-60"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full -z-10 blur-3xl opacity-60"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
          {['Verified Landlords', 'Fraud-Free Listings', 'Secure Payments', '24/7 Support'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-slate-500 font-medium">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <Search className="w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Which campus are you near?" 
                className="bg-transparent border-none focus:ring-0 w-full text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
              <Home className="w-5 h-5 text-slate-400" />
              <select className="bg-transparent border-none focus:ring-0 w-full text-slate-900 font-medium appearance-none">
                <option>All Types</option>
                <option>Apartment</option>
                <option>Studio</option>
                <option>Shared Room</option>
              </select>
            </div>
            <Link 
              to="/search"
              className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center"
            >
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Accommodations</h2>
              <p className="text-slate-500 max-w-md">Hand-picked properties that offer the best value and safety for students.</p>
            </div>
            <Link to="/search" className="text-blue-600 font-bold hover:underline hidden md:block">
              View all listings
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/house${i}/800/600`} 
                    alt="Property" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    Verified
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">Premium Student Studio</h3>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Oxford Road, Manchester
                      </p>
                    </div>
                    <span className="text-xl font-black text-blue-600">$520</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 text-sm border-t border-slate-50 pt-4">
                    <span className="flex items-center gap-1"><Home className="w-4 h-4" /> Studio</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 1 Person</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our Students Say</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Join thousands of students who found their home through SafeCampus.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "Medical Student", text: "Finding a place was so stressful until I found SafeCampus. The verification process gave me so much peace of mind." },
              { name: "David K.", role: "Engineering Student", text: "The landlord was amazing and the property was exactly as described. No surprises, just a great home." },
              { name: "Emma L.", role: "Arts Student", text: "I love the map view! It helped me find a place literally 5 minutes from my studio. Highly recommend!" }
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map(star => <CheckCircle2 key={star} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">Ready to find your new home?</h2>
              <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
                Start your search today and join the safest community for student housing.
              </p>
              <Link 
                to="/search" 
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl"
              >
                Browse All Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
