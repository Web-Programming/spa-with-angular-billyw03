import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from './components/profile-header/profile-header';
import { StatsCardComponent } from './components/stats-card/stats-card';
import { AboutCardComponent } from './components/about-card/about-card';
import { SocialCardComponent } from './components/social-card/social-card';
import { PropertyItemComponent } from './components/property-item/property-item';
import { FavoriteItemComponent } from './components/favorite-item/favorite-item';
import { HistoryItemComponent } from './components/history-item/history-item';
import {
  UserProfile,
  StatsSummary,
  PropertyItem,
  FavoriteItem,
  HistoryItem,
  SocialLinks,
} from './profile.models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileHeaderComponent,
    StatsCardComponent,
    AboutCardComponent,
    SocialCardComponent,
    PropertyItemComponent,
    FavoriteItemComponent,
    HistoryItemComponent,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, Indonesia',
    avatar:
      'https://ui-avatars.com/api/?name=John+Doe&size=150&background=667eea&color=fff&bold=true',
    isPremium: true,
    isVerified: true,
    memberSince: 'Jan 2024',
    bio: 'Seorang profesional yang mencari properti berkualitas untuk investasi dan tempat tinggal. Tertarik dengan properti di area strategis dengan fasilitas lengkap.',
    job: 'Software Developer',
    birthdate: '15 Januari 1990',
    status: 'Married',
  };

  stats: StatsSummary = {
    properties: 3,
    favorites: 12,
    rating: 4.8,
    memberSince: 'Jan 2024',
  };

  socialLinks: SocialLinks = {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#',
  };

  properties: PropertyItem[] = [
    {
      id: 1,
      title: 'Modern Apartment',
      location: 'Jakarta Selatan',
      price: 5000000,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      bedrooms: 2,
      bathrooms: 1,
      area: 45,
      status: 'Active',
    },
    {
      id: 2,
      title: 'Luxury House',
      location: 'Jakarta Pusat',
      price: 15000000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop',
      bedrooms: 4,
      bathrooms: 3,
      area: 120,
      status: 'Pending',
    },
    {
      id: 3,
      title: 'Cozy Studio',
      location: 'Jakarta Barat',
      price: 3500000,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop',
      bedrooms: 1,
      bathrooms: 1,
      area: 30,
      status: 'Active',
    },
  ];

  favorites: FavoriteItem[] = [
    {
      id: 101,
      title: 'Beautiful Villa',
      location: 'Bali, Indonesia',
      price: 20000000,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop',
      bedrooms: 5,
      bathrooms: 4,
      area: 200,
      rating: 4.9,
    },
    {
      id: 102,
      title: 'Urban Loft',
      location: 'Jakarta Utara',
      price: 8000000,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop',
      bedrooms: 2,
      bathrooms: 2,
      area: 80,
      rating: 4.7,
    },
  ];

  history: HistoryItem[] = [
    {
      icon: 'bi-check-circle-fill',
      iconColor: 'success',
      title: 'Pembayaran Berhasil',
      description: 'Modern Apartment - November 2024',
      time: '2 hari yang lalu',
      badge: 'Rp 5.000.000',
      badgeColor: 'success',
    },
    {
      icon: 'bi-house-fill',
      iconColor: 'primary',
      title: 'Properti Ditambahkan',
      description: 'Cozy Studio telah terdaftar',
      time: '5 hari yang lalu',
      badge: 'Properti Baru',
      badgeColor: 'primary',
    },
    {
      icon: 'bi-pencil-fill',
      iconColor: 'info',
      title: 'Profile Diperbarui',
      description: 'Informasi kontak dan foto profil',
      time: '1 minggu yang lalu',
      badge: 'Update',
      badgeColor: 'info',
    },
    {
      icon: 'bi-star-fill',
      iconColor: 'warning',
      title: 'Review Diterima',
      description: 'Luxury House - Rating 5.0',
      time: '2 minggu yang lalu',
      badge: 'Review',
      badgeColor: 'warning',
    },
  ];

  onEditProfile() {
    console.log('Edit profile clicked');
    // Navigate to edit profile page
  }

  onSettings() {
    console.log('Settings clicked');
    // Navigate to settings page
  }

  onEditProperty(propertyId: number) {
    console.log('Edit property:', propertyId);
    // Navigate to edit property page
  }

  onDeleteProperty(propertyId: number) {
    if (confirm('Yakin ingin menghapus properti ini?')) {
      //menghapus properti dari daftar
      this.properties = this.properties.filter((p) => p.id !== propertyId);
      console.log('Property deleted:', propertyId);
    }
  }
}
