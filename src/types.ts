export type UserRole = 'student' | 'landlord' | 'admin';
export type VerificationStatus = 'pending' | 'approved' | 'rejected';
export type PropertyStatus = 'pending' | 'approved' | 'rejected' | 'archived';
export type BookingStatus = 'pending' | 'accepted' | 'declined' | 'cancelled';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  isVerified?: boolean;
  verificationStatus?: VerificationStatus;
  phoneNumber?: string;
  businessName?: string;
  createdAt: any;
  savedProperties?: string[]; // Array of property IDs
}

export interface Property {
  id: string;
  landlordId: string;
  title: string;
  description: string;
  address: string;
  campus: string;
  price: number;
  type: 'apartment' | 'studio' | 'room' | 'house';
  rooms: number;
  amenities: string[];
  images: string[];
  status: PropertyStatus;
  createdAt: any;
  views?: number;
  whatsappClicks?: number;
  whatsappNumber?: string;
  rating?: number;
  reviewCount?: number;
}

export interface Booking {
  id: string;
  studentId: string;
  landlordId: string;
  propertyId: string;
  status: BookingStatus;
  moveInDate: string;
  createdAt: any;
  studentName?: string;
  propertyName?: string;
  reviewId?: string; // Reference to review if completed
}

export interface Review {
  id: string;
  propertyId: string;
  landlordId: string;
  studentId: string;
  studentName: string;
  studentPhoto?: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export interface Chat {
  id: string;
  participants: string[]; // [studentId, landlordId]
  propertyId: string;
  lastMessage?: string;
  updatedAt: any;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: any;
}

export interface Verification {
  id: string;
  landlordId: string;
  idNumber: string;
  businessName?: string;
  registrationNumber: string;
  idUrl?: string;
  selfieUrl?: string;
  ownershipDocUrl?: string;
  status: VerificationStatus;
  createdAt: any;
}
