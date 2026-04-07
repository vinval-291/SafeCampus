import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const sampleProperties = [
  {
    landlordId: 'system',
    title: 'Luxury Studio near City Center',
    description: 'A modern, fully furnished studio apartment just 5 minutes walk from the main campus. Includes high-speed WiFi and all utilities.',
    address: '123 University Ave, Manchester',
    campus: 'City Center',
    price: 450,
    type: 'studio',
    rooms: 1,
    amenities: ['WiFi', 'Laundry', 'Furnished'],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000'],
    status: 'approved',
    createdAt: serverTimestamp(),
    views: Math.floor(Math.random() * 100),
    whatsappClicks: Math.floor(Math.random() * 20)
  },
  {
    landlordId: 'system',
    title: 'Shared 3-Bedroom Apartment',
    description: 'Perfect for a group of friends. Spacious living area and modern kitchen. Close to North Campus library.',
    address: '45 Library Lane, Manchester',
    campus: 'North Campus',
    price: 380,
    type: 'apartment',
    rooms: 3,
    amenities: ['WiFi', 'Kitchen', 'Parking'],
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000'],
    status: 'approved',
    createdAt: serverTimestamp(),
    views: Math.floor(Math.random() * 100),
    whatsappClicks: Math.floor(Math.random() * 20)
  },
  {
    landlordId: 'system',
    title: 'Cozy Room in Student House',
    description: 'A quiet room in a friendly student house. Large garden and shared common areas. Great for focused studies.',
    address: '88 Garden St, Manchester',
    campus: 'South Campus',
    price: 320,
    type: 'room',
    rooms: 1,
    amenities: ['WiFi', 'Garden', 'Shared Kitchen'],
    images: ['https://images.unsplash.com/photo-1486304845751-63df001f45a7?auto=format&fit=crop&q=80&w=1000'],
    status: 'approved',
    createdAt: serverTimestamp(),
    views: Math.floor(Math.random() * 100),
    whatsappClicks: Math.floor(Math.random() * 20)
  }
];

export const seedDatabase = async () => {
  try {
    for (const prop of sampleProperties) {
      await addDoc(collection(db, 'properties'), prop);
    }
    console.log('Database seeded successfully');
  } catch (e) {
    console.error('Seeding error:', e);
  }
};
