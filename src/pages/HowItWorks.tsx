import React from 'react';
import { 
  UserPlus, 
  Search, 
  Calendar, 
  Key, 
  ShieldCheck, 
  Building2, 
  BarChart3, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors">
      {/* Header */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6"
          >
            How SafeCampus Works
          </motion.h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We've built a seamless, secure platform to connect verified landlords with students seeking reliable housing.
          </p>
        </div>
      </section>

      {/* For Students */}
      <section className="py-24 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold text-sm mb-12">
            FOR STUDENTS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { 
                icon: <UserPlus className="w-8 h-8" />, 
                title: "Create Account", 
                desc: "Sign up for free and set up your student profile to browse verified listings." 
              },
              { 
                icon: <Search className="w-8 h-8" />, 
                title: "Find Housing", 
                desc: "Search by campus, price, or type. All properties are verified for your safety." 
              },
              { 
                icon: <Calendar className="w-8 h-8" />, 
                title: "Book Viewing", 
                desc: "Send a request to the landlord to arrange a physical or virtual viewing." 
              },
              { 
                icon: <Key className="w-8 h-8" />, 
                title: "Move In", 
                desc: "Finalize your agreement directly with the landlord and start your new chapter." 
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-200 dark:shadow-none">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-slate-100 dark:bg-slate-800 -z-10"></div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/search" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
              Browse Properties <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* For Landlords */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 font-bold text-sm mb-12">
            FOR LANDLORDS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
            {[
              { 
                icon: <ShieldCheck className="w-8 h-8" />, 
                title: "Get Verified", 
                desc: "Complete our rigorous verification process to prove you're a trusted provider." 
              },
              { 
                icon: <Building2 className="w-8 h-8" />, 
                title: "List Properties", 
                desc: "Add your properties with high-quality photos and detailed amenities." 
              },
              { 
                icon: <MessageCircle className="w-8 h-8" />, 
                title: "Receive Inquiries", 
                desc: "Get direct WhatsApp inquiries and booking requests from interested students." 
              },
              { 
                icon: <BarChart3 className="w-8 h-8" />, 
                title: "Track Success", 
                desc: "Use your dashboard to monitor property performance and manage leads." 
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-green-600 text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-green-200 dark:shadow-none">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/list-property" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-xl shadow-green-100">
              Start Listing <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <ShieldCheck className="w-16 h-16 mx-auto mb-8 opacity-50" />
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                Our verification process is the heart of what we do.
              </h2>
              <p className="text-blue-100 text-xl leading-relaxed">
                By manually checking IDs, property ownership, and conducting periodic audits, we ensure that both students and landlords have a safe and transparent experience.
              </p>
            </motion.div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
