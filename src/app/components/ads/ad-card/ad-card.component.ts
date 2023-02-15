import { Component, Input, OnInit } from '@angular/core';
import { IAd } from '../../../models/IAd.interface';
import { TruncateTextPipe } from 'src/app/pipes/truncateText.pipe';
import { ICategory } from 'src/app/models/ICategory.interface';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {
  @Input() ad!: IAd;
  @Input() categories: any;


  ngOnInit(): void {
    // console.log(this.ad);
    console.log(this.categories);
  }

}
