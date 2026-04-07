import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  updateDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile } from '../types';
import { 
  ShieldCheck, 
  User, 
  FileText, 
  Camera, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  profile: UserProfile | null;
}

const LandlordOnboarding = ({ profile }: Props) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile?.role === 'landlord') {
      navigate('/landlord-dashboard');
    }
  }, [profile, navigate]);

  const [formData, setFormData] = useState({
    phoneNumber: '',
    idType: 'passport',
    propertyAddress: '',
    propertyType: 'apartment',
    rent: '',
    rooms: '1',
    campus: 'City Center'
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      // 1. Create verification request
      await addDoc(collection(db, 'verifications'), {
        landlordId: profile.uid,
        status: 'pending',
        createdAt: serverTimestamp(),
        ...formData
      });

      // 2. Update user profile
      await updateDoc(doc(db, 'users', profile.uid), {
        role: 'landlord',
        verificationStatus: 'pending',
        phoneNumber: formData.phoneNumber
      });

      setStep(5); // Success step
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to continue</h2>
        <p className="text-slate-500">You need an account to list your property.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                step >= i ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
              )}
            >
              {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
            </div>
          ))}
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${(step - 1) * 33.33}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Basic Information</h2>
            <p className="text-slate-500 mb-10">Let's start with your contact details so we can reach you.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
            </div>

            <div className="mt-12">
              <button 
                onClick={handleNext}
                disabled={!formData.phoneNumber}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Identity Verification</h2>
            <p className="text-slate-500 mb-10">We verify all landlords to ensure a safe community for students.</p>
            
            <div className="space-y-8">
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl text-center hover:border-blue-400 transition-colors cursor-pointer group">
                <Upload className="w-10 h-10 text-slate-300 mx-auto mb-4 group-hover:text-blue-500 transition-colors" />
                <h4 className="font-bold text-slate-900 mb-1">Upload Government ID</h4>
                <p className="text-slate-400 text-sm">Passport, Driver's License or National ID</p>
              </div>

              <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl text-center hover:border-blue-400 transition-colors cursor-pointer group">
                <Camera className="w-10 h-10 text-slate-300 mx-auto mb-4 group-hover:text-blue-500 transition-colors" />
                <h4 className="font-bold text-slate-900 mb-1">Take a Selfie</h4>
                <p className="text-slate-400 text-sm">To verify your identity matches your ID</p>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button onClick={handleBack} className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">Back</button>
              <button onClick={handleNext} className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all">Continue</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Property Details</h2>
            <p className="text-slate-500 mb-10">Tell us about the property you want to list.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Property Address</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Street, City, Postcode"
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Rent ($)</label>
                  <input 
                    type="number" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.rent}
                    onChange={(e) => setFormData({...formData, rent: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nearby Campus</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.campus}
                    onChange={(e) => setFormData({...formData, campus: e.target.value})}
                  >
                    <option>City Center</option>
                    <option>North Campus</option>
                    <option>South Campus</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button onClick={handleBack} className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">Back</button>
              <button onClick={handleNext} className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all">Continue</button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
              <CheckCircle2 className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Review & Submit</h2>
            <p className="text-slate-500 mb-10">Please review your information before submitting for verification.</p>
            
            <div className="bg-slate-50 p-8 rounded-3xl space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Phone</span>
                <span className="text-slate-900 font-bold">{formData.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Address</span>
                <span className="text-slate-900 font-bold">{formData.propertyAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Rent</span>
                <span className="text-slate-900 font-bold">${formData.rent}/mo</span>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button onClick={handleBack} className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">Back</button>
              <button 
                onClick={handleSubmit} 
                disabled={loading}
                className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Submitting..." : "Submit for Approval"}
              </button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div 
            key="step5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center"
          >
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Application Submitted!</h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Our team is reviewing your application. This usually takes 24-48 hours. We'll notify you once you're verified to list your property.
            </p>
            <Link 
              to="/profile" 
              className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
            >
              Go to Profile
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default LandlordOnboarding;
