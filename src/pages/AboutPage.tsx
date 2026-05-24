import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Users, 
  Phone, 
  Zap, 
  Globe, 
  MessageCircle,
  CheckCircle2,
  Fingerprint
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-slate-50 dark:border-slate-900 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-purple-400/5 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-blue-100 dark:border-blue-800"
            >
              <Zap className="w-3 h-3 fill-current" /> Redefining Student Living
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl lg:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.9]"
            >
              Bridging the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Student & Shelter.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-12"
            >
              SafeCampus is not just a listing site. We are a trust-based ecosystem designed to eliminate housing anxiety for students across the globe.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <Link to="/search" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 dark:shadow-none hover:-translate-y-1">
                Explore Listings
              </Link>
              <Link to="/contact" className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-1">
                Speak to Support
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Origin Story */}
      <section className="py-32 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80"
                alt="Students studying" 
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-blue-600 p-12 rounded-[3.5rem] text-white shadow-2xl">
              <div className="text-6xl font-black mb-2 tracking-tighter">0%</div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-80">Fraud Tolerance Policy</div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">Born out of Necessity.</h2>
            <div className="space-y-6 text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              <p>
                In early 2024, our founders noticed a recurring heartbreak: students traveling hundreds of miles only to reach a "property" that didn't exist, or a landlord that wasn't who they claimed to be.
              </p>
              <p>
                Student housing is about more than just four walls and a roof; it's about the security required for academic pursuit. We built SafeCampus to be the digital safeguard for that journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">The SafeCampus Promise</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">Every interaction on our platform is built on three core systemic pillars.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: 'Verification Engine', 
                text: 'We go beyond basic identity checks. Our multi-step landlord verification includes title deed validation and physical site checks.',
                color: 'bg-blue-500'
              },
              { 
                icon: MessageCircle, 
                title: 'Direct Transparency', 
                text: 'No agents, no "middle-man" fees. We provide the encrypted channels for you to speak directly with owners in real-time.',
                color: 'bg-indigo-500'
              },
              { 
                icon: Fingerprint, 
                title: 'Zero Fraud Guarantee', 
                text: 'Our AI monitoring tools detect suspicious patterns before they reach your feed, ensuring 99.9% clean listing accuracy.',
                color: 'bg-slate-900 text-white'
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm"
              >
                <div className={`w-16 h-16 ${pillar.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                  <pillar.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{pillar.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Call to action */}
      <section className="py-32 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-blue-600 p-16 rounded-[4rem] text-white flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 font-bold">Our Vision</span>
              <h3 className="text-4xl font-black leading-tight mb-6">Building a safer housing ecosystem for Africa's future leaders.</h3>
              <p className="text-blue-100 text-lg font-medium leading-relaxed">By 2028, we aim to have served over 1 million students across 500 campuses, setting the gold standard for verified residential living.</p>
            </div>
            <div className="absolute bottom-0 right-0 p-8 opacity-20 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all">
              <Globe className="w-48 h-48" />
            </div>
          </div>

          <div className="bg-slate-900 p-16 rounded-[4rem] text-white flex flex-col justify-between">
            <div>
              <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 text-slate-300 font-bold">Join Us</span>
              <h3 className="text-4xl font-black leading-tight mb-8">Ready to list or lease?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Direct landlord verification</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">No agency commissions</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">24/7 dedicated local support</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link to="/list-property" className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black text-center hover:bg-blue-700 transition-all">
                List Property
              </Link>
              <Link to="/search" className="flex-1 py-5 bg-white text-slate-900 rounded-2xl font-black text-center hover:bg-slate-50 transition-all">
                Browse Rooms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Contact teaser */}
      <section className="py-24 border-t border-slate-50 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i + 15}`} 
                  className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-950 shadow-xl" 
                  alt="Student" 
                />
              ))}
            </div>
          </div>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Questions? We are here to help.</h4>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-10">(+234) 816 091 1474 • support@safecampus.com</p>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="font-black text-slate-900 dark:text-white text-xl">2+ Years</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest px-2">In Operations</div>
            </div>
            <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-800 my-auto"></div>
            <div className="flex flex-col items-center">
              <div className="font-black text-slate-900 dark:text-white text-xl uppercase tracking-tighter">Verified</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest px-2">Listings Only</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
