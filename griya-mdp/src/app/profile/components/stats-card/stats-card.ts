import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsSummary } from '../../profile.models';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css',
})
export class StatsCardComponent {
  @Input() stats!: StatsSummary;
}
