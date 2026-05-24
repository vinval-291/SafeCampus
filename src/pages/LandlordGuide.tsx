import React from 'react';
import { 
  Camera, 
  PenTool, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  Lightbulb,
  Image as ImageIcon,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const LandlordGuide = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] text-blue-600 mb-8"
          >
            <Lightbulb className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Landlord Success Guide
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Maximize your leads and find the perfect student tenants with our expert tips for high-performing listings.
          </p>
        </div>

        {/* Photography Section */}
        <section className="py-24 border-b border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-sm mb-6">
                <Camera className="w-5 h-5" /> 01. Photography
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                Photos That Sell <br />The Experience
              </h2>
              <div className="space-y-8 text-slate-600 dark:text-slate-400">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 font-bold text-slate-900 dark:text-white">1</div>
                  <p><span className="font-bold text-slate-900 dark:text-white">Use Natural Light:</span> Open all curtains and take photos during midday. Bright spaces feel larger and more welcoming.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 font-bold text-slate-900 dark:text-white">2</div>
                  <p><span className="font-bold text-slate-900 dark:text-white">Landscape Orientation:</span> Always hold your phone horizontally. Wide shots showcase more of the room and layout.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 font-bold text-slate-900 dark:text-white">3</div>
                  <p><span className="font-bold text-slate-900 dark:text-white">Highlight Study Areas:</span> Students care about where they’ll work. Make sure the desk and lighting are clearly visible.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-100 dark:bg-slate-900 rounded-[3rem] p-4 lg:p-8">
                <img 
                  src="https://images.unsplash.com/photo-1554995207-c18c20360a59?auto=format&fit=crop&q=80&w=1000" 
                  alt="Photography Tips" 
                  className="rounded-[2.5rem] shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="font-black text-slate-900 dark:text-white tracking-tight">+45% Engagement</div>
                  <div className="text-xs text-slate-400 font-bold uppercase">With Professional Photos</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Copywriting Section */}
        <section className="py-24 border-b border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="lg:order-2">
              <div className="flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-sm mb-6">
                <PenTool className="w-5 h-5" /> 02. Description
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                Write Clear, Honest <br />Descriptions
              </h2>
              <div className="space-y-8 text-slate-600 dark:text-slate-400">
                <p>Students value honesty over sales pitches. Be specific about the location, commute times, and inclusive bills.</p>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Pro Tip: The Commute Check</h4>
                  <p className="text-sm leading-relaxed italic">"Instead of saying 'near campus', say '5-minute walk to the main library' or 'Direct bus (No. 42) every 10 mins to School of Arts'."</p>
                </div>
              </div>
            </div>
            <div className="lg:order-1">
              <div className="bg-slate-100 dark:bg-slate-900 rounded-[3rem] p-12 text-center">
                <MessageCircle className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Respond Quickly</h3>
                <p className="text-slate-500 dark:text-slate-400">Students often apply to multiple places. The fastest landlord to respond usually wins the tenant.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Ready to update your listings?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/landlord-dashboard" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl">
                Go to My Dashboard
              </Link>
              <Link to="/add-property" className="px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-lg hover:border-blue-600 transition-all">
                Add New Listing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandlordGuide;
