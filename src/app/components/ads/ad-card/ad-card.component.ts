import { Component, Input } from '@angular/core';
import { IAd } from '../../../models/IAd.interface';
import { TruncateTextPipe } from 'src/app/pipes/truncateText.pipe';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent {
  @Input() ad!: IAd;
  @Input() categories: any;
}
