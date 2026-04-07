import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserProfile } from '../types';
import { 
  Home, 
  MapPin, 
  DollarSign, 
  Type, 
  Users, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowLeft,
  Plus,
  X,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  profile: UserProfile | null;
}

const AddPropertyPage = ({ profile }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    campus: 'City Center',
    price: '',
    type: 'apartment',
    rooms: '1',
    whatsappNumber: profile?.phoneNumber || '',
    amenities: [] as string[],
    images: [] as string[]
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddAmenity = () => {
    if (newAmenity && !formData.amenities.includes(newAmenity)) {
      setFormData({ ...formData, amenities: [...formData.amenities, newAmenity] });
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) });
  };

  const handleAddImage = () => {
    if (imageUrl && !formData.images.includes(imageUrl)) {
      setFormData({ ...formData, images: [...formData.images, imageUrl] });
      setImageUrl('');
    }
  };

  const handleRemoveImage = (url: string) => {
    setFormData({ ...formData, images: formData.images.filter(i => i !== url) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !auth.currentUser) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'properties'), {
        landlordId: profile.uid,
        title: formData.title,
        description: formData.description,
        address: formData.address,
        campus: formData.campus,
        price: Number(formData.price),
        type: formData.type,
        rooms: Number(formData.rooms),
        whatsappNumber: formData.whatsappNumber,
        amenities: formData.amenities,
        images: formData.images.length > 0 ? formData.images : [`https://picsum.photos/seed/${Date.now()}/800/600`],
        status: 'pending', // Requires admin approval
        createdAt: serverTimestamp(),
        views: 0,
        whatsappClicks: 0
      });
      navigate('/landlord-dashboard');
    } catch (error) {
      console.error('Error adding property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile || profile.role !== 'landlord') {
    return <div className="p-24 text-center font-bold text-red-500">Access Denied. Only verified landlords can list properties.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-bold text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2">List Your Property</h1>
          <p className="text-slate-500">Fill in the details below to list your accommodation. All listings are reviewed by our team.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Property Title</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Modern Studio near City Center"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
              <textarea 
                required
                rows={4}
                placeholder="Describe the property, location, and what's included..."
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Monthly Rent ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="number" 
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Property Type</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                >
                  <option value="apartment">Apartment</option>
                  <option value="studio">Studio</option>
                  <option value="room">Shared Room</option>
                  <option value="house">House</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Rooms</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="number" 
                  placeholder="1"
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.rooms}
                  onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">WhatsApp Number</label>
              <div className="relative">
                <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="tel" 
                  placeholder="+1234567890"
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="text" 
                  placeholder="Full address of the property"
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nearby Campus</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.campus}
                onChange={(e) => setFormData({...formData, campus: e.target.value})}
              >
                <option>City Center</option>
                <option>North Campus</option>
                <option>South Campus</option>
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Amenities</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.amenities.map(amenity => (
                <span key={amenity} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100">
                  {amenity}
                  <button type="button" onClick={() => handleRemoveAmenity(amenity)} className="hover:text-blue-800"><X className="w-4 h-4" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add amenity (e.g. WiFi, Parking)"
                className="flex-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())}
              />
              <button 
                type="button"
                onClick={handleAddAmenity}
                className="px-6 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Add
              </button>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Property Images (URLs)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {formData.images.map(url => (
                <div key={url} className="relative aspect-video rounded-xl overflow-hidden border border-slate-100 group">
                  <img src={url} alt="Property" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveImage(url)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Paste image URL here..."
                className="flex-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <button 
                type="button"
                onClick={handleAddImage}
                className="px-6 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Add Image
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50">
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Listing Property..." : "Submit Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
