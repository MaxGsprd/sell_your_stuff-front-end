import { Component, Input, OnInit } from '@angular/core';
import { IAd } from 'src/app/models/IAd';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {
  @Input() ad!: IAd;
  @Input() adImagePreview!: Object;
  primaryPhotoUrl: string = "assets/images/placeholder_img.png" ;

  ngOnInit(): void {
    if (this.ad?.photos && this.ad.photos.length > 0) {
      this.ad.photos.forEach( p => {
        if (p.isPrimary) {
          this.primaryPhotoUrl = p.imageUrl;
        }
      });
    }
  }
}
