export interface UserDetails {
  id?: string;
  name?: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  token?: string;
  isNew?: boolean;
}

export interface Driver extends UserDetails {
  licenseNo: string;
  vehicleType: string;
  vehicleNo: string;
  isAvailable: boolean;
  rating: number;
  totalTrips: number;
}

export interface Trip {
  id: string;
  userId: string;
  driverId: string;
  from: Location;
  to: Location;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  fare: number;
  distance: number;
  duration: number;
  bookedAt: string;
  completedAt?: string;
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface BookingRequest {
  from: Location;
  to: Location;
  vehicleType: string;
  scheduledTime?: string;
  paymentMethod: 'card' | 'upi' | 'cash';
  notes?: string;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserDetails;
}

export type Language = 'en' | 'ta';

export interface Translations {
  en: Record<string, string>;
  ta: Record<string, string>;
}