import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ← Untuk search
import { LokasiPerumahan } from '../lokasi-perumahan/lokasi-perumahan';
import { Housing } from '../lokasi-perumahan/housing.model';
import { HousingService } from '../services/housing'; // ← Import service
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [LokasiPerumahan, CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  // Data arrays
  housingList: Housing[] = []; // Data dari backend
  filteredList: Housing[] = []; // Data setelah filter/search

  // State management
  isLoading: boolean = false; // Loading state
  errorMessage: string = ''; // Error message
  selectedFilter: string = 'all'; // Filter aktif

  // Search
  searchQuery: string = ''; // Query pencarian

  // Pagination
  currentPage: number = 1; // Halaman saat ini
  itemsPerPage: number = 6; // Items per halaman

  // Fallback data (jika backend tidak tersedia)
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
      description: 'Hunian modern dengan desain minimalis.',
      postedDays: 2,
    },
    // ... tambahkan data lainnya
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
        // Gunakan data fallback
        this.housingList = this.fallbackData;
        this.filteredList = this.fallbackData;
        this.isLoading = false;
        this.errorMessage = 'Menggunakan data demo (backend tidak tersedia)';
      },
    });
  }

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

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredList.length);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Smooth scroll ke section
      document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage - 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  // Method yang dipanggil saat user mengetik
  searchHousing() {
    this.currentPage = 1; // Reset ke halaman pertama
    this.applySearch();
  }

  // Logic search sebenarnya
  private applySearch() {
    const query = this.searchQuery.toLowerCase().trim();

    // Jika search kosong, kembalikan ke filter saat ini
    if (!query) {
      this.filterByType(this.selectedFilter);
      return;
    }

    // Base list berdasarkan filter
    let baseList =
      this.selectedFilter === 'all'
        ? this.housingList
        : this.housingList.filter((h) => h.type === this.selectedFilter);

    // Apply search pada base list
    this.filteredList = baseList.filter(
      (house) =>
        house.title.toLowerCase().includes(query) ||
        house.location.toLowerCase().includes(query) ||
        house.description?.toLowerCase().includes(query) ||
        house.status.toLowerCase().includes(query)
    );
  }

  // Clear search
  clearSearch() {
    this.searchQuery = '';
    this.filterByType(this.selectedFilter);
  }

  filterByType(type: string) {
    this.selectedFilter = type;
    this.currentPage = 1; // Reset ke halaman pertama
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
        },
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
          this.filteredList = this.housingList.filter((h) => h.type === type);
          this.isLoading = false;

          // Terapkan search jika ada query
          if (this.searchQuery) {
            this.applySearch();
          }
        },
      });
    }
  }
}
