import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../profile.models';

@Component({
  selector: 'app-about-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-card.html',
  styleUrl: './about-card.css',
})
export class AboutCardComponent {
  @Input() user!: UserProfile;
}
