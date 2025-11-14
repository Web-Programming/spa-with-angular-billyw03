import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LokasiPerumahan } from '../lokasi-perumahan/lokasi-perumahan';
import { Housing } from '../lokasi-perumahan/housing.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [LokasiPerumahan, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  // Array untuk data perumahan (bisa diisi dari backend nanti)
  housingList: Housing[] = [
    {
      id: 1,
      title: 'Griya Asri Residence',
      location: 'Jakarta Selatan',
      price: 850000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
      rating: 4.5,
      status: 'Available',
      type: 'rumah',
      description:
        'Hunian modern dengan desain minimalis di kawasan Jakarta Selatan yang strategis.',
      postedDays: 2,
    },
    {
      id: 2,
      title: 'Taman Indah Village',
      location: 'Tangerang',
      price: 650000000,
      bedrooms: 2,
      bathrooms: 1,
      area: 90,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
      rating: 4.8,
      status: 'Available',
      type: 'rumah',
      description: 'Rumah nyaman dengan lingkungan asri dan fasilitas lengkap.',
      postedDays: 5,
    },
    {
      id: 3,
      title: 'Villa Sejahtera',
      location: 'Bogor',
      price: 1200000000,
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
      rating: 4.9,
      status: 'Available',
      type: 'villa',
      description: 'Villa mewah dengan pemandangan pegunungan yang indah.',
      postedDays: 1,
    },
    {
      id: 4,
      title: 'Skyline Apartment',
      location: 'Jakarta Pusat',
      price: 750000000,
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
      rating: 4.6,
      status: 'Pending',
      type: 'apartemen',
      description: 'Apartemen modern di pusat kota dengan akses ke berbagai fasilitas.',
      postedDays: 3,
    },
    {
      id: 5,
      title: 'Green Valley Residence',
      location: 'Depok',
      price: 550000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 100,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
      rating: 4.4,
      status: 'Available',
      type: 'rumah',
      description: 'Perumahan cluster dengan konsep hijau dan lingkungan yang asri.',
      postedDays: 7,
    },
    {
      id: 6,
      title: 'Royal Tower Apartment',
      location: 'Jakarta Barat',
      price: 950000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 110,
      image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&h=400&fit=crop',
      rating: 4.7,
      status: 'Available',
      type: 'apartemen',
      description: 'Apartemen premium dengan fasilitas lengkap dan lokasi strategis.',
      postedDays: 4,
    },
  ];

  filteredList: Housing[] = [];
  selectedFilter: string = 'all';

  ngOnInit() {
    // Initialize filtered list with all housing
    this.filteredList = [...this.housingList];
  }

  filterByType(type: string) {
    this.selectedFilter = type;
    if (type === 'all') {
      this.filteredList = [...this.housingList];
    } else {
      this.filteredList = this.housingList.filter((h) => h.type === type);
    }
  }

  isFilterActive(type: string): boolean {
    return this.selectedFilter === type;
  }
}
