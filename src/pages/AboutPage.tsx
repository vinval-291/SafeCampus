import React from 'react';
import { ShieldCheck, Target, Users, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-slate-900 mb-6 tracking-tight"
        >
          Our Mission: <span className="text-blue-600">Safe Housing for Every Student</span>
        </motion.h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          SafeCampus was founded with a simple goal: to eliminate fraud and stress from the student housing search. We believe every student deserves a safe, verified home near their campus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
        {[
          { title: 'Trust First', icon: ShieldCheck, text: 'We verify every landlord and property listing manually to ensure authenticity.' },
          { title: 'Student Centric', icon: Users, text: 'Our platform is designed specifically for the needs and budgets of students.' },
          { title: 'Transparency', icon: Target, text: 'No hidden fees, no fake photos. What you see is exactly what you get.' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <item.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 leading-tight">Join the SafeCampus Community</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Whether you're a student looking for a home or a landlord with a property to list, SafeCampus provides the tools and security you need.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
                <span className="font-bold">10k+ Happy Students</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/about1/400/400" alt="" className="rounded-3xl rotate-3" />
            <img src="https://picsum.photos/seed/about2/400/400" alt="" className="rounded-3xl -rotate-3 mt-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
