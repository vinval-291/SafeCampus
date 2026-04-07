import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { Property, UserProfile, Booking } from '../types';
import { 
  Home, 
  Eye, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  XCircle,
  TrendingUp,
  Users,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface Props {
  profile: UserProfile | null;
}

const LandlordDashboard = ({ profile }: Props) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile || profile.role !== 'landlord') return;

    const propQuery = query(
      collection(db, 'properties'), 
      where('landlordId', '==', profile.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubProps = onSnapshot(propQuery, (snap) => {
      setProperties(snap.docs.map(d => ({ id: d.id, ...d.data() } as Property)));
    });

    const bookingQuery = query(
      collection(db, 'bookings'), 
      where('landlordId', '==', profile.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubBookings = onSnapshot(bookingQuery, (snap) => {
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() } as Booking)));
    });

    setLoading(false);
    return () => { unsubProps(); unsubBookings(); };
  }, [profile]);

  if (!profile || profile.role !== 'landlord') {
    return <div className="p-24 text-center font-bold text-red-500">Access Denied</div>;
  }

  const totalViews = properties.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalClicks = properties.reduce((acc, p) => acc + (p.whatsappClicks || 0), 0);
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  const stats = [
    { label: 'Total Property Views', value: totalViews, icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'WhatsApp Clicks', value: totalClicks, icon: MessageCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Bookings', value: pendingBookings, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Listings', value: properties.filter(p => p.status === 'approved').length, icon: Home, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const chartData = properties.slice(0, 5).map(p => ({
    name: p.title.slice(0, 10) + '...',
    views: p.views || 0,
    clicks: p.whatsappClicks || 0
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Landlord Dashboard</h1>
          <p className="text-slate-500">Track your property performance and manage bookings.</p>
        </div>
        <Link 
          to="/add-property"
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Add New Listing
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Analytics Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-12">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Performance Overview
              </h3>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1.5 text-blue-600">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div> Views
                </div>
                <div className="flex items-center gap-1.5 text-green-600">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div> WhatsApp
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="views" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="clicks" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Properties List */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-bold text-slate-900">My Properties</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-4">Property</th>
                    <th className="px-8 py-4 text-center">Views</th>
                    <th className="px-8 py-4 text-center">WA Clicks</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {properties.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
                            <img src={p.images[0] || 'https://picsum.photos/100'} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{p.title}</p>
                            <p className="text-xs text-slate-400">{p.campus}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center font-bold text-slate-600">{p.views || 0}</td>
                      <td className="px-8 py-6 text-center font-bold text-green-600">{p.whatsappClicks || 0}</td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          p.status === 'approved' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                        )}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Link to={`/property/${p.id}`} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Bookings Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-28">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Recent Requests
            </h3>
            <div className="space-y-6">
              {bookings.slice(0, 5).map(booking => (
                <div key={booking.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">New Booking Request</p>
                    <p className="text-xs text-slate-500 mt-1">Status: <span className="capitalize">{booking.status}</span></p>
                    <Link to="/profile" className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2 block hover:underline">
                      Manage Request
                    </Link>
                  </div>
                </div>
              ))}
              {bookings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-sm">No requests yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) { return inputs.filter(Boolean).join(' '); }
export default LandlordDashboard;
