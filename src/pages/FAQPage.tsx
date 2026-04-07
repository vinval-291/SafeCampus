import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does SafeCampus verify landlords?",
      a: "Every landlord must upload a government-issued ID and proof of property ownership. Our team manually reviews these documents and performs background checks before any listing is approved."
    },
    {
      q: "Is it free for students to use?",
      a: "Yes! Students can browse, search, and send booking requests for free. We don't charge students any platform fees."
    },
    {
      q: "What should I do if a property doesn't match the listing?",
      a: "SafeCampus takes fraud seriously. If you find a property that doesn't match its description, please report it immediately via the 'Report Listing' button. We'll investigate and take appropriate action."
    },
    {
      q: "How do I list my property as a landlord?",
      a: "Simply create an account, click 'List Your Property', and follow the onboarding steps. Once your identity and property are verified, your listing will go live."
    },
    {
      q: "Can I book a viewing before paying?",
      a: "Absolutely. SafeCampus encourages students to view properties before signing any agreements. The booking request is just the first step to connect you with the landlord."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-slate-500 text-lg">Everything you need to know about SafeCampus.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
            >
              <span className="text-lg font-bold text-slate-900">{faq.q}</span>
              {openIndex === i ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-8 pb-6 text-slate-500 leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-blue-600 rounded-[3rem] text-center text-white relative overflow-hidden">
        <h3 className="text-2xl font-bold mb-4 relative z-10">Still have questions?</h3>
        <p className="text-blue-100 mb-8 relative z-10">Can't find the answer you're looking for? Please chat to our friendly team.</p>
        <button className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all relative z-10 shadow-xl">
          Get in Touch
        </button>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default FAQPage;
