import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteItem } from '../../profile.models';

@Component({
  selector: 'app-favorite-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-item.html',
  styleUrl: './favorite-item.css',
})
export class FavoriteItemComponent {
  @Input() item!: FavoriteItem;
}
