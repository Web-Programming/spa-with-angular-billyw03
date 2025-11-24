import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Housing } from './housing.model';

@Component({
  selector: 'app-lokasi-perumahan',
  imports: [CommonModule, RouterLink],
  templateUrl: './lokasi-perumahan.html',
  styleUrl: './lokasi-perumahan.css',
})
export class LokasiPerumahan {
  @Input() housing: Housing = {
    id: 0,
    title: 'Griya Asri Residence',
    location: 'Jakarta Selatan',
    price: 850000000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
    rating: 4.5,
    status: 'Available',
    description: 'Hunian modern dengan desain minimalis, dilengkapi fasilitas lengkap dan akses mudah ke berbagai tempat strategis.',
    postedDays: 2
  };

  getStars(): number[] {
    const fullStars = Math.floor(this.housing.rating);
    return Array(fullStars).fill(0);
  }

  hasHalfStar(): boolean {
    return this.housing.rating % 1 >= 0.5;
  }

  getEmptyStars(): number[] {
    const fullStars = Math.floor(this.housing.rating);
    const hasHalf = this.hasHalfStar() ? 1 : 0;
    const emptyStars = 5 - fullStars - hasHalf;
    return Array(emptyStars).fill(0);
  }

  // Format harga ke Rupiah
  formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }
}