import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LokasiPerumahan } from '../lokasi-perumahan/lokasi-perumahan';
import { Housing } from '../lokasi-perumahan/housing.model';
import { HousingService } from '../services/housing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [LokasiPerumahan, CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  // Array untuk data perumahan
  housingList: Housing[] = [];
  filteredList: Housing[] = [];
  selectedFilter: string = 'all';
  
  // Search functionality
  searchQuery: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 6;
  
  // Loading and error states
  isLoading: boolean = false;
  errorMessage: string = '';

  // Data fallback jika backend tidak tersedia
  private fallbackData: Housing[] = [
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
      description: 'Hunian modern dengan desain minimalis di kawasan Jakarta Selatan yang strategis.',
      postedDays: 2
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
      postedDays: 5
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
      postedDays: 1
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
      postedDays: 3
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
      postedDays: 7
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
      postedDays: 4
    },
    {
      id: 7,
      title: 'Sunrise Garden',
      location: 'Bekasi',
      price: 450000000,
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop',
      rating: 4.3,
      status: 'Available',
      type: 'rumah',
      description: 'Rumah minimalis dengan taman yang asri dan nyaman.',
      postedDays: 6
    },
    {
      id: 8,
      title: 'Mountain View Villa',
      location: 'Puncak',
      price: 1500000000,
      bedrooms: 5,
      bathrooms: 4,
      area: 250,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
      rating: 5.0,
      status: 'Available',
      type: 'villa',
      description: 'Villa mewah dengan pemandangan gunung yang spektakuler.',
      postedDays: 2
    },
    {
      id: 9,
      title: 'City Center Apartment',
      location: 'Jakarta Pusat',
      price: 850000000,
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
      rating: 4.7,
      status: 'Available',
      type: 'apartemen',
      description: 'Apartemen modern dengan akses mudah ke berbagai fasilitas kota.',
      postedDays: 1
    }
  ];

  constructor(private housingService: HousingService) {}

  ngOnInit() {
    this.loadHousingData();
  }

  loadHousingData() {
    this.isLoading = true;
    this.errorMessage = '';

    this.housingService.getAllHousing().subscribe({
      next: (data) => {
        this.housingList = data;
        this.filteredList = data;
        this.isLoading = false;
        console.log('Data berhasil dimuat dari backend:', data);
      },
      error: (err) => {
        console.error('Error loading housing data:', err);
        console.log('Menggunakan data fallback...');
        
        // Gunakan data fallback jika backend tidak tersedia
        this.housingList = this.fallbackData;
        this.filteredList = this.fallbackData;
        this.isLoading = false;
        this.errorMessage = 'Menggunakan data demo (backend tidak tersedia)';
      }
    });
  }

  filterByType(type: string) {
    this.selectedFilter = type;
    this.currentPage = 1; // Reset ke halaman pertama saat filter berubah
    this.isLoading = true;
    this.errorMessage = '';
    
    if (type === 'all') {
      // Load semua data dari backend
      this.housingService.getAllHousing().subscribe({
        next: (data) => {
          this.housingList = data;
          this.filteredList = data;
          this.isLoading = false;
          
          // Terapkan search jika ada query
          if (this.searchQuery) {
            this.applySearch();
          }
        },
        error: (err) => {
          console.error('Error loading all housing data:', err);
          // Fallback ke filter lokal
          this.filteredList = [...this.housingList];
          this.isLoading = false;
          
          // Terapkan search jika ada query
          if (this.searchQuery) {
            this.applySearch();
          }
        }
      });
    } else {
      // Filter berdasarkan type dari backend
      this.housingService.filterHousingByType(type).subscribe({
        next: (data) => {
          this.filteredList = data;
          this.isLoading = false;
          
          // Terapkan search jika ada query
          if (this.searchQuery) {
            this.applySearch();
          }
        },
        error: (err) => {
          console.error('Error filtering housing by type:', err);
          // Fallback ke filter lokal
          this.filteredList = this.housingList.filter(h => h.type === type);
          this.isLoading = false;
          
          // Terapkan search jika ada query
          if (this.searchQuery) {
            this.applySearch();
          }
        }
      });
    }
  }

  isFilterActive(type: string): boolean {
    return this.selectedFilter === type;
  }

  // Search functionality
  searchHousing() {
    this.currentPage = 1; // Reset ke halaman pertama saat search
    this.applySearch();
  }

  private applySearch() {
    const query = this.searchQuery.toLowerCase().trim();
    
    if (!query) {
      // Jika search kosong, kembalikan ke filter saat ini
      this.filterByType(this.selectedFilter);
      return;
    }

    let baseList = this.selectedFilter === 'all' 
      ? this.housingList 
      : this.housingList.filter(h => h.type === this.selectedFilter);

    this.filteredList = baseList.filter(house => 
      house.title.toLowerCase().includes(query) ||
      house.location.toLowerCase().includes(query) ||
      house.description?.toLowerCase().includes(query) ||
      house.status.toLowerCase().includes(query)
    );
  }

  clearSearch() {
    this.searchQuery = '';
    this.filterByType(this.selectedFilter);
  }

  // Pagination functionality
  get paginatedList(): Housing[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredList.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredList.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Scroll to top of properties section
      document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredList.length);
  }
}
