import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryItem } from '../../profile.models';

@Component({
  selector: 'app-history-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-item.html',
  styleUrl: './history-item.css',
})
export class HistoryItemComponent {
  @Input() item!: HistoryItem;
}
