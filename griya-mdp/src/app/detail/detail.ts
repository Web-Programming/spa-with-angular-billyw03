import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Housing } from '../lokasi-perumahan/housing.model';
import { HOUSING_DATA } from '../data/housing-data';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail implements OnInit {
  housing: Housing | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  propertyId: number = 0;

  // Data lokal - menggunakan data dari file terpisah yang sama dengan Home Component
  private housingData: Housing[] = HOUSING_DATA;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Ambil ID dari route parameter
    this.route.params.subscribe(params => {
      this.propertyId = +params['id']; // + untuk convert string ke number
      this.loadPropertyDetail();
    });
  }

  loadPropertyDetail(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Simulasi delay loading (seperti API call)
    setTimeout(() => {
      // Cari data berdasarkan ID
      const foundHousing = this.housingData.find(h => h.id === this.propertyId);
      
      if (foundHousing) {
        this.housing = foundHousing;
        this.isLoading = false;
        console.log('Detail properti berhasil dimuat:', foundHousing);
      } else {
        this.errorMessage = 'Properti tidak ditemukan.';
        this.isLoading = false;
        console.error('Properti dengan ID', this.propertyId, 'tidak ditemukan');
      }
    }, 500); // Delay 500ms untuk UX yang lebih baik
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  // Format harga ke Rupiah
  formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  // Get badge class berdasarkan status
  getStatusClass(status: string): string {
    switch(status.toLowerCase()) {
      case 'available':
        return 'bg-success';
      case 'pending':
        return 'bg-warning text-dark';
      case 'sold':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  // Get type badge class
  getTypeClass(type: string): string {
    switch(type?.toLowerCase()) {
      case 'rumah':
        return 'bg-primary';
      case 'apartemen':
        return 'bg-info';
      case 'villa':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }
}