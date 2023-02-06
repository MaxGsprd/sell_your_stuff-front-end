import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-posting-card',
  templateUrl: './posting-card.component.html',
  styleUrls: ['./posting-card.component.css']
})
export class PostingCardComponent {

  @Input() item : any;

}
