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
  createdAt: any;
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
}

export interface Booking {
  id: string;
  studentId: string;
  landlordId: string;
  propertyId: string;
  status: BookingStatus;
  moveInDate: string;
  createdAt: any;
}

export interface Verification {
  id: string;
  landlordId: string;
  idUrl: string;
  selfieUrl: string;
  ownershipDocUrl: string;
  status: VerificationStatus;
  createdAt: any;
}
