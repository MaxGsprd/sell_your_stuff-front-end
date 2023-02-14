import { Component, Input, OnInit } from '@angular/core';
import { IAd } from '../../../models/IAd.interface';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {
  @Input() ad!: IAd;

  ngOnInit(): void {
  }

}
