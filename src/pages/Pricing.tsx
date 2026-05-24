import React from 'react';
import { Check, ShieldCheck, ArrowRight, Star, Building2, Zap, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6"
          >
            Simple, Transparent <span className="text-blue-600">Pricing</span>
          </motion.h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Free for students. Affordable for landlords. We grow when you do.
          </p>
        </div>

        {/* Roles Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Students Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-slate-50 dark:bg-slate-900/50 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-100 dark:shadow-none">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Students</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-slate-900 dark:text-white">$0</span>
                <span className="text-slate-500">Free forever</span>
              </div>
              <ul className="space-y-4 mb-12">
                {[
                  "Access to all verified listings",
                  "Direct contact with landlords",
                  "Saved properties favorites list",
                  "Email alerts for new housing",
                  "24/7 dedicated support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium">
                    <Check className="w-5 h-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/search" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                Find Accommodation <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Landlords Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border-4 border-blue-600 shadow-2xl shadow-blue-100 dark:shadow-none relative overflow-hidden"
          >
            <div className="absolute top-8 right-8 bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              POPULAR
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Landlords</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-slate-900 dark:text-white">$29</span>
                <span className="text-slate-500">Per property/mo</span>
              </div>
              <ul className="space-y-4 mb-12">
                {[
                  "Full verification badge",
                  "Unlimited property images",
                  "Dashboard with analytics",
                  "Priority WhatsApp routing",
                  "Featured listing visibility"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium">
                    <Check className="w-5 h-5 text-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/list-property" className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 dark:shadow-none">
                List Your Property <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic underline decoration-blue-600 decoration-8 underline-offset-4">Why we charge?</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Our fee covers the manual verification of every document and property, ensuring the platform remains fraud-free.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { q: "Is there a free trial for landlords?", a: "Yes! Your first property is free for the first 14 days so you can experience the quality of leads we provide." },
              { q: "Can I cancel my subscription anytime?", a: "Absolutely. You can manage your listings and subscriptions directly from your dashboard. No hidden exit fees." },
              { q: "Do you take a commission on rent?", a: "No. We only charge a flat monthly listing fee. You keep 100% of the rent paid by students." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
