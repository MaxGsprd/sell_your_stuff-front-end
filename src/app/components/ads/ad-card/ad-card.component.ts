import { Component, Input } from '@angular/core';
import { IAd } from '../IAd.interface';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent {
  @Input() ad!: IAd;
}
