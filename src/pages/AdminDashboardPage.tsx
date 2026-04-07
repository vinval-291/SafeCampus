import React, { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  updateDoc, 
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { Property, UserProfile, Verification } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Home, 
  AlertTriangle,
  Search
} from 'lucide-react';

interface Props {
  profile: UserProfile | null;
}

const AdminDashboardPage = ({ profile }: Props) => {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [activeTab, setActiveTab] = useState<'verifications' | 'properties' | 'users'>('verifications');

  useEffect(() => {
    if (profile?.role !== 'admin') return;
    const unsubVer = onSnapshot(collection(db, 'verifications'), (snap) => {
      setVerifications(snap.docs.map(d => ({ id: d.id, ...d.data() } as Verification)));
    });
    const unsubProp = onSnapshot(collection(db, 'properties'), (snap) => {
      setProperties(snap.docs.map(d => ({ id: d.id, ...d.data() } as Property)));
    });
    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as UserProfile)));
    });
    return () => { unsubVer(); unsubProp(); unsubUsers(); };
  }, [profile]);

  const handleApproveVerification = async (v: Verification) => {
    try {
      await updateDoc(doc(db, 'verifications', v.id), { status: 'approved' });
      await updateDoc(doc(db, 'users', v.landlordId), { isVerified: true, verificationStatus: 'approved' });
    } catch (e) { console.error(e); }
  };

  const handleApproveProperty = async (p: Property) => {
    try {
      await updateDoc(doc(db, 'properties', p.id), { status: 'approved' });
    } catch (e) { console.error(e); }
  };

  const handleRejectProperty = async (p: Property) => {
    try {
      await updateDoc(doc(db, 'properties', p.id), { status: 'rejected' });
    } catch (e) { console.error(e); }
  };

  const handleDeleteProperty = async (p: Property) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteDoc(doc(db, 'properties', p.id));
      } catch (e) { console.error(e); }
    }
  };

  if (profile?.role !== 'admin') return <div className="p-24 text-center font-bold text-red-500">Access Denied</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-200">
          {['verifications', 'properties', 'users'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn("px-6 py-2.5 rounded-xl text-sm font-bold capitalize", activeTab === tab ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50")}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === 'verifications' && (
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr><th className="px-8 py-4">Landlord</th><th className="px-8 py-4">Status</th><th className="px-8 py-4">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {verifications.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50/30">
                    <td className="px-8 py-6 font-bold text-sm">ID: {v.landlordId.slice(0, 8)}...</td>
                    <td className="px-8 py-6">
                      <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase", v.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600")}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      {v.status === 'pending' && (
                        <button onClick={() => handleApproveVerification(v)} className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle2 className="w-4 h-4" /></button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === 'properties' && (
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr><th className="px-8 py-4">Property</th><th className="px-8 py-4">Status</th><th className="px-8 py-4">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {properties.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/30">
                    <td className="px-8 py-6 font-bold text-sm">{p.title}</td>
                    <td className="px-8 py-6">
                      <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase", p.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600")}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        {p.status === 'pending' && (
                          <button 
                            onClick={() => handleApproveProperty(p)} 
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all"
                          >
                            Approve
                          </button>
                        )}
                        <button 
                          onClick={() => handleRejectProperty(p)} 
                          className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
                        >
                          Reject
                        </button>
                        <button 
                          onClick={() => handleDeleteProperty(p)} 
                          className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === 'users' && (
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Role</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map(u => (
                  <tr key={u.uid} className="hover:bg-slate-50/30">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <img src={u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName}`} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{u.displayName}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={u.role}
                        onChange={async (e) => {
                          await updateDoc(doc(db, 'users', u.uid), { role: e.target.value });
                        }}
                        className="bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold p-1"
                      >
                        <option value="student">Student</option>
                        <option value="landlord">Landlord</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-8 py-6">
                      {u.isVerified ? (
                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-[10px] font-black uppercase">Verified</span>
                      ) : (
                        <span className="bg-slate-50 text-slate-400 px-2 py-1 rounded-full text-[10px] font-black uppercase">Unverified</span>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={async () => {
                          if (window.confirm('Delete user?')) await deleteDoc(doc(db, 'users', u.uid));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) { return inputs.filter(Boolean).join(' '); }
export default AdminDashboardPage;
