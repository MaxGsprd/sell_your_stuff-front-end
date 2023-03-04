import { Component, Input } from '@angular/core';
import { IAdResponseDto } from 'src/app/models/dtos/IAdResponseDto';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent {
  @Input() ad!: IAdResponseDto;
  @Input() adImagePreview!: any;
}
