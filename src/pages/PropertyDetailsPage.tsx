import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  doc, 
  getDoc, 
  addDoc, 
  collection, 
  serverTimestamp,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db, auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Property, UserProfile } from '../types';
import { 
  MapPin, 
  Home, 
  Users, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  Lock,
  Phone,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [landlord, setLandlord] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      const docRef = doc(db, 'properties', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() } as Property;
        setProperty(data);
        
        // Increment views
        await updateDoc(docRef, {
          views: increment(1)
        });

        // Fetch landlord details if logged in
        if (auth.currentUser) {
          const landlordRef = doc(db, 'users', data.landlordId);
          const landlordSnap = await getDoc(landlordRef);
          if (landlordSnap.exists()) {
            setLandlord(landlordSnap.data() as UserProfile);
          }
        }
      }
      setLoading(false);
    };
    fetchProperty();
  }, [id, isLoggedIn]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleWhatsappClick = async () => {
    if (!property || !id) return;
    try {
      await updateDoc(doc(db, 'properties', id), {
        whatsappClicks: increment(1)
      });
      const message = encodeURIComponent(`Hi, I'm interested in your property: ${property.title} on SafeCampus.`);
      window.open(`https://wa.me/${property.whatsappNumber || landlord?.phoneNumber || ''}?text=${message}`, '_blank');
    } catch (e) {
      console.error(e);
    }
  };

  const handleBooking = async () => {
    if (!auth.currentUser) {
      handleLogin();
      return;
    }
    if (!property) return;

    setBookingLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        propertyId: property.id,
        studentId: auth.currentUser.uid,
        landlordId: property.landlordId,
        status: 'pending',
        createdAt: serverTimestamp(),
        moveInDate: new Date().toISOString().split('T')[0]
      });
      setBookingSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="p-24 text-center">Loading...</div>;
  if (!property) return <div className="p-24 text-center">Property not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-bold text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Images & Info */}
        <div className="lg:col-span-2 space-y-12">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200">
            <img 
              src={property.images[0] || `https://picsum.photos/seed/${property.id}/1200/800`} 
              alt={property.title} 
              className="w-full h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-black text-blue-600 uppercase tracking-widest shadow-lg">
                {property.type}
              </span>
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{property.title}</h1>
                <p className="text-slate-500 flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-blue-600" /> {property.address} • {property.campus}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-600 hover:bg-blue-50 transition-all">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-600 hover:bg-blue-50 transition-all">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-50 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Type</p>
                <p className="font-bold text-slate-900 capitalize">{property.type}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Rooms</p>
                <p className="font-bold text-slate-900">{property.rooms} Bedrooms</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Availability</p>
                <p className="font-bold text-slate-900">Immediate</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {property.description || "This beautiful student accommodation offers a perfect blend of comfort and convenience. Located just minutes away from campus, it features modern amenities and a safe environment for your studies."}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['High-speed WiFi', 'Laundry Room', 'Study Area', '24/7 Security', 'Bike Storage', 'Fully Furnished'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-slate-600 font-medium bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-4xl font-black text-blue-600">${property.price}</span>
                  <span className="text-slate-400 font-bold ml-2">/ month</span>
                </div>
                <div className="text-right">
                  <p className="text-green-500 text-xs font-black uppercase tracking-widest">All Inclusive</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Move-in Date</label>
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    September 2026
                  </div>
                </div>
              </div>

              {isLoggedIn ? (
                <div className="space-y-4">
                  {bookingSuccess ? (
                    <div className="bg-green-50 p-6 rounded-2xl text-center border border-green-100">
                      <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                      <h4 className="font-bold text-green-900 mb-1">Request Sent!</h4>
                      <p className="text-green-700 text-sm">The landlord will review your request and contact you soon.</p>
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={handleBooking}
                        disabled={bookingLoading}
                        className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        {bookingLoading ? "Processing..." : "Request to Book"}
                      </button>
                      <button 
                        onClick={handleWhatsappClick}
                        className="w-full py-5 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                      </button>
                    </>
                  )}
                  
                  {landlord && (
                    <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Landlord Details</p>
                      <div className="flex items-center gap-3">
                        <img 
                          src={landlord.photoURL || `https://ui-avatars.com/api/?name=${landlord.displayName}`} 
                          alt={landlord.displayName || 'Landlord'} 
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{landlord.displayName}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {landlord.phoneNumber || 'No phone provided'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 p-8 rounded-3xl text-center border border-slate-100">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Login to Book</h4>
                  <p className="text-slate-500 text-sm mb-6">Create an account to see landlord details and book this property.</p>
                  <button 
                    onClick={handleLogin}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    Login / Sign Up
                  </button>
                </div>
              )}

              <p className="text-center text-slate-400 text-xs mt-6 leading-relaxed">
                You won't be charged yet. The landlord will contact you to arrange a viewing and sign the agreement.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">SafeCampus Guarantee</h4>
                    <p className="text-slate-400 text-xs">Your safety is our priority</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    Verified Landlord Identity
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    Property Ownership Proof
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    Fraud Protection Support
                  </li>
                </ul>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
            </div>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => window.alert('Listing reported. Our team will investigate.')}
                className="w-full py-4 border-2 border-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-5 h-5" /> Report Listing
              </button>
              <p className="text-[10px] text-slate-400 text-center uppercase font-black tracking-widest">
                SafeCampus Trust & Safety
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
