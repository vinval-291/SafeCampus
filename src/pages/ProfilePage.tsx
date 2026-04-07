import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserProfile, Booking, Property } from '../types';
import { 
  User, 
  Settings, 
  Home, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  XCircle,
  LogOut,
  PlusCircle,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

interface Props {
  profile: UserProfile | null;
  user: any;
}

const ProfilePage = ({ profile, user }: Props) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'properties'>('bookings');

  useEffect(() => {
    if (!profile) return;

    // Fetch bookings (as student or landlord)
    const bookingQuery = profile.role === 'student' 
      ? query(collection(db, 'bookings'), where('studentId', '==', profile.uid))
      : query(collection(db, 'bookings'), where('landlordId', '==', profile.uid));

    const unsubBookings = onSnapshot(bookingQuery, (snap) => {
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() } as Booking)));
    });

    // Fetch properties (if landlord)
    if (profile.role === 'landlord') {
      const propQuery = query(collection(db, 'properties'), where('landlordId', '==', profile.uid));
      const unsubProps = onSnapshot(propQuery, (snap) => {
        setMyProperties(snap.docs.map(d => ({ id: d.id, ...d.data() } as Property)));
      });
      return () => { unsubBookings(); unsubProps(); };
    }

    setLoading(false);
    return () => unsubBookings();
  }, [profile]);

  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
    } catch (e) { console.error(e); }
  };

  if (!profile) return <div className="p-24 text-center">Please log in</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar: Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-28">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-blue-50 shadow-lg"
                />
                {profile.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 p-1.5 rounded-full border-2 border-white shadow-lg">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{profile.displayName}</h2>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">{profile.role}</p>
            </div>

            <div className="space-y-4 pt-8 border-t border-slate-50">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="w-5 h-5 text-slate-300" />
                <span className="text-sm font-medium">{profile.email}</span>
              </div>
              {profile.phoneNumber && (
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-5 h-5 text-slate-300" />
                  <span className="text-sm font-medium">{profile.phoneNumber}</span>
                </div>
              )}
            </div>

            <div className="mt-10 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
                <Settings className="w-5 h-5" /> Account Settings
              </button>
              <button 
                onClick={() => auth.signOut()}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 font-bold hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Bookings & Properties */}
        <div className="lg:col-span-3">
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setActiveTab('bookings')}
              className={cn(
                "px-8 py-3 rounded-2xl font-bold text-sm transition-all",
                activeTab === 'bookings' ? "bg-blue-600 text-white shadow-xl shadow-blue-100" : "bg-white text-slate-500 border border-slate-100"
              )}
            >
              My Bookings
            </button>
            {profile.role === 'landlord' && (
              <button 
                onClick={() => setActiveTab('properties')}
                className={cn(
                  "px-8 py-3 rounded-2xl font-bold text-sm transition-all",
                  activeTab === 'properties' ? "bg-blue-600 text-white shadow-xl shadow-blue-100" : "bg-white text-slate-500 border border-slate-100"
                )}
              >
                My Properties
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'bookings' && (
              <motion.div 
                key="bookings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {bookings.length > 0 ? bookings.map(booking => (
                  <div key={booking.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <Calendar className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">Booking Request</h4>
                        <p className="text-slate-500 text-sm">Property ID: {booking.propertyId.slice(0, 8)}...</p>
                        <p className="text-slate-400 text-xs mt-1">Move-in: {booking.moveInDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                        booking.status === 'pending' ? "bg-amber-50 text-amber-600" :
                        booking.status === 'accepted' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                      )}>
                        {booking.status}
                      </span>
                      
                      {profile.role === 'landlord' && booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleUpdateBookingStatus(booking.id, 'accepted')}
                            className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-all"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleUpdateBookingStatus(booking.id, 'declined')}
                            className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100">
                    <p className="text-slate-400 font-medium">No bookings found.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'properties' && (
              <motion.div 
                key="properties"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {myProperties.map(property => (
                  <div key={property.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-slate-900 truncate pr-4">{property.title}</h4>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        property.status === 'approved' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                      )}>
                        {property.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-xl font-black text-blue-600">${property.price}</span>
                      <Link to={`/property/${property.id}`} className="text-blue-600 font-bold text-sm hover:underline">View Listing</Link>
                    </div>
                  </div>
                ))}
                <Link 
                  to="/list-property" 
                  className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-3 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                >
                  <PlusCircle className="w-10 h-10 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  <span className="font-bold text-slate-400 group-hover:text-blue-600 transition-colors">Add New Property</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default ProfilePage;
