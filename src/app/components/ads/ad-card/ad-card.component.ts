import { Component, Input, OnInit } from '@angular/core';
import { TruncateTextPipe } from 'src/app/pipes/truncateText.pipe';
import { IAdResponseDto } from 'src/app/models/dtos/IAdResponseDto';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {
  
  @Input() ad!: IAdResponseDto;
  
  ngOnInit(): void {
    // console.log(this.ad);
  }
}
