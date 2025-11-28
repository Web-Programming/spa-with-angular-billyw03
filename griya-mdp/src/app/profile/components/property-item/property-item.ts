import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyItem } from '../../profile.models';

@Component({
  selector: 'app-property-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-item.html',
  styleUrl: './property-item.css',
})
export class PropertyItemComponent {
  @Input() item!: PropertyItem;
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.item.id);
  }

  onRemove() {
    this.remove.emit(this.item.id);
  }
}
