export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  isPremium: boolean;
  isVerified: boolean;
  memberSince: string;
  bio?: string;
  job?: string;
  birthdate?: string;
  status?: string;
}

export interface StatsSummary {
  properties: number;
  favorites: number;
  rating: number;
  memberSince: string;
}

export interface PropertyItem {
  id: number;
  title: string;
  location: string;
  price: number; // per bulan
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // m2
  status: 'Active' | 'Pending' | 'Inactive';
}

export interface FavoriteItem {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  rating: number;
}

export interface HistoryItem {
  icon: string; // e.g. 'bi-check-circle-fill'
  iconColor: 'success' | 'primary' | 'info' | 'warning' | 'danger';
  title: string;
  description: string;
  time: string; // e.g. '2 hari yang lalu'
  badge?: string; // e.g. 'Rp 5.000.000'
  badgeColor?: 'success' | 'primary' | 'info' | 'warning' | 'danger';
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}
