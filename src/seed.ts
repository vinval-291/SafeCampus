import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const sampleProperties = [
  {
    landlordId: 'system',
    title: 'Luxury Studio near City Center',
    description: 'A modern, fully furnished studio apartment just 5 minutes walk from the main campus. Includes high-speed WiFi and all utilities. Perfect for students who value privacy and convenience.',
    address: '123 University Ave, Manchester',
    campus: 'City Center',
    price: 450,
    type: 'studio',
    rooms: 1,
    amenities: ['High-speed WiFi', 'Laundry Room', 'Study Area', '24/7 Security', 'Bike Storage', 'Fully Furnished'],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000'],
    status: 'approved',
    createdAt: serverTimestamp(),
    views: Math.floor(Math.random() * 500),
    whatsappClicks: Math.floor(Math.random() * 50),
    rating: 4.8,
    reviewCount: 12
  },
  {
    landlordId: 'system',
    title: 'Shared 3-Bedroom Apartment',
    description: 'Perfect for a group of friends. Spacious living area and modern kitchen. Close to North Campus library and local shops. Social atmosphere with study-focused roommates.',
    address: '45 Library Lane, Manchester',
    campus: 'North Campus',
    price: 380,
    type: 'apartment',
    rooms: 3,
    amenities: ['High-speed WiFi', 'Kitchen', 'Parking', 'Laundry Room', 'Smart TV'],
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000'],
    status: 'approved',
    createdAt: serverTimestamp(),
    views: Math.floor(Math.random() * 300),
    whatsappClicks: Math.floor(Math.random() * 30),
    rating: 4.2,
    reviewCount: 8
  },
  {
    landlordId: 'system',
    title: 'Modern Room in Eco-House',
    description: 'Sustainable living for the modern student. Solar powered, large communal garden, and fantastic kitchen. 10 mins from South Campus.',
    address: '88 Garden St, Manchester',
    campus: 'South Campus',
    price: 320,
    type: 'room',
    rooms: 1,
    amenities: ['Solar Power', 'WiFi', 'Garden', 'Shared Kitchen', 'Recycling Hub'],
    images: ['https://images.unsplash.com/photo-1486304845751-63df001f45a7?auto=format&fit=crop&q=80&w=1000'],
    status: 'approved',
    createdAt: serverTimestamp(),
    views: Math.floor(Math.random() * 200),
    whatsappClicks: Math.floor(Math.random() * 15),
    rating: 4.5,
    reviewCount: 5
  },
  {
    landlordId: 'system',
    title: 'Penthouse Apartment - Sky View',
    description: 'Experience luxury student living. Panoramic views of the city campus, private balcony, and state-of-the-art gym access included.',
    address: '2 Sky Tower, Manchester',
    campus: 'City Center',
    price: 1200,
    type: 'apartment',
    rooms: 2,
    amenities: ['Gym Access', 'Concierge', 'Private Balcony', 'High-speed WiFi', 'Air Conditioning'],
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000'],
    status: 'approved',
    createdAt: serverTimestamp(),
    views: Math.floor(Math.random() * 800),
    whatsappClicks: Math.floor(Math.random() * 100),
    rating: 4.9,
    reviewCount: 24
  },
  {
    landlordId: 'system',
    title: 'Friendly Flatshare near Arts Bldg',
    description: 'Looking for creative roommates! 1 room available in a colorful, shared flat. 2 mins walk to the School of Arts.',
    address: '15 Canvas Way, Manchester',
    campus: 'North Campus',
    price: 410,
    type: 'room',
    rooms: 1,
    amenities: ['WiFi', 'Art Studio', 'Laundry', 'Shared Living Room'],
    images: ['https://images.unsplash.com/photo-1554995207-c18c20360a59?auto=format&fit=crop&q=80&w=1000'],
    status: 'approved',
    createdAt: serverTimestamp(),
    views: Math.floor(Math.random() * 150),
    whatsappClicks: Math.floor(Math.random() * 12),
    rating: 3.9,
    reviewCount: 3
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
