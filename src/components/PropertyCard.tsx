import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, Users, Heart, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Property, UserProfile } from '../types';
import { cn } from '../lib/utils';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';

interface PropertyCardProps {
  property: Property;
  profile: UserProfile | null;
  onToggleSave?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, profile, onToggleSave }) => {
  const isSaved = profile?.savedProperties?.includes(property.id);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!profile) return; // Should redirect to login or show alert

    const userRef = doc(db, 'users', profile.uid);
    try {
      if (isSaved) {
        await updateDoc(userRef, {
          savedProperties: arrayRemove(property.id)
        });
      } else {
        await updateDoc(userRef, {
          savedProperties: arrayUnion(property.id)
        });
      }
      onToggleSave?.();
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800 group relative"
    >
      <button 
        onClick={handleToggleSave}
        className={cn(
          "absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-lg border",
          isSaved 
            ? "bg-red-500 border-red-500 text-white" 
            : "bg-white/80 border-slate-100 text-slate-400 hover:text-red-500 dark:bg-slate-800/80 dark:border-slate-700"
        )}
      >
        <Heart className={cn("w-5 h-5", isSaved && "fill-current")} />
      </button>

      <Link to={`/property/${property.id}`}>
        <div className="relative h-64 overflow-hidden">
          <img 
            src={property.images[0] || `https://picsum.photos/seed/${property.id}/800/600`} 
            alt={property.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
            {property.type}
          </div>
          {property.status === 'approved' && (
            <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
              Verified
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 pr-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 truncate">{property.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {property.campus}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-600">${property.price}</span>
              <span className="block text-[10px] text-slate-400 font-bold uppercase">/ month</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 mb-4">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {property.rating ? property.rating.toFixed(1) : 'New'}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              ({property.reviewCount || 0} reviews)
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs border-t border-slate-50 dark:border-slate-800 pt-4">
            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
              <Home className="w-3.5 h-3.5" /> {property.rooms} Rooms
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
              <Users className="w-3.5 h-3.5" /> {property.type}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
