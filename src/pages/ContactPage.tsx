import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h1 className="text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
            Get in Touch with <br />
            <span className="text-blue-600">SafeCampus</span>
          </h1>
          <p className="text-xl text-slate-500 mb-12 leading-relaxed">
            Have a question about a listing? Need help with verification? Our team is here to support you 24/7.
          </p>

          <div className="space-y-8">
            {[
              { icon: Mail, title: 'Email Us', text: 'support@safecampus.com', sub: 'We reply within 24 hours' },
              { icon: Phone, title: 'Call Us', text: '+1 (555) 000-0000', sub: 'Mon-Fri from 8am to 5pm' },
              { icon: MapPin, title: 'Visit Us', text: '123 University St, Manchester', sub: 'Come say hello!' }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-blue-600 font-bold text-xl mb-1">{item.text}</p>
                  <p className="text-slate-400 text-sm">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200">
          {submitted ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h2>
              <p className="text-slate-500 text-lg mb-10">Thanks for reaching out. We'll get back to you as soon as possible.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">First Name</label>
                  <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Last Name</label>
                  <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                <input required type="email" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Message</label>
                <textarea required rows={5} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
