import React from 'react';
import { 
  ShieldAlert, 
  Search, 
  MessageCircle, 
  CreditCard, 
  Eye, 
  Handshake, 
  AlertTriangle,
  Lock,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const SafetyTips = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-[2rem] text-red-600 mb-8"
          >
            <ShieldAlert className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Stay Safe & Avoid Frauds
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            While we verify every listing, it's crucial to stay alert and follow these safety guidelines to ensure your student housing journey is secure.
          </p>
        </div>

        {/* The Dirty Dozen Red Flags */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {[
            { 
              icon: <CreditCard className="w-6 h-6" />, 
              title: "Upfront Payments", 
              desc: "Never pay a deposit or rent before seeing the property and signing a formal agreement." 
            },
            { 
              icon: <MessageCircle className="w-6 h-6" />, 
              title: "External Chat", 
              desc: "Be cautious if a landlord insists on moving the conversation immediately away from verifiable channels." 
            },
            { 
              icon: <AlertTriangle className="w-6 h-6" />, 
              title: "Too Good to Be True", 
              desc: "Extreme low prices for prime locations are often a sign of a potential scam." 
            },
            { 
              icon: <Eye className="w-6 h-6" />, 
              title: "Refusal to View", 
              desc: "Avoid landlords who say they are out of the country or can't show you the property." 
            },
            { 
              icon: <Lock className="w-6 h-6" />, 
              title: "Bank Account Scams", 
              desc: "Only pay via traceable bank transfers. Never use Western Union, MoneyGram, or 'AirBnB' links." 
            },
            { 
              icon: <Handshake className="w-6 h-6" />, 
              title: "Pressure Tactics", 
              desc: "Scammers often try to rush you into making a decision. Take your time to verify everything." 
            }
          ].map((tip, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800"
            >
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-red-600 mb-6 shadow-sm">
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{tip.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{tip.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Steps */}
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white shadow-2xl shadow-slate-200 dark:shadow-none mb-24 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Your 3-Step Verification Checklist</h2>
              <div className="space-y-6">
                {[
                  { step: "01", text: "Always verify the landlord's contact details and check if they have a 'Verified' badge on SafeCampus." },
                  { step: "02", text: "Request a video call or a live walk-through if you cannot visit the property in person." },
                  { step: "03", text: "Never share sensitive documents (Passport, ID) outside of our secure profile verification system." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-blue-500 font-black text-2xl tracking-tighter">{item.step}</span>
                    <p className="text-slate-400 text-lg">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <div className="w-48 h-48 bg-blue-600/30 rounded-full flex items-center justify-center border border-blue-500/50">
                  <ShieldAlert className="w-24 h-24 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </div>

        {/* Report Something */}
        <div className="text-center py-12 border-2 border-dashed border-red-100 dark:border-red-900/30 rounded-[3rem] max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 italic">See something suspicious?</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Our team is available 24/7 to investigate potential scams. Your report helps keep the entire community safe.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-100 dark:shadow-none"
          >
            Report an Issue <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
