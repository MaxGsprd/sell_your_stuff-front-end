import { Component } from '@angular/core';

@Component({
  selector: 'app-posting-list',
  templateUrl: './posting-list.component.html',
  styleUrls: ['./posting-list.component.css']
})
export class PostingListComponent {

  Items: Array<any> = [
    {
      "Id":1,
      "Name":"Default product A",
      "Category":"Clothe",
      "Price":5
    },
    {
      "Id":2,
      "Name":"Default product B",
      "Category":"Clothe",
      "Price":70
    },
    {
      "Id":3,
      "Name":"Default product C",
      "Category":"Clothe",
      "Price":99
    },
    {
      "Id":4,
      "Name":"Default product D",
      "Category":"Clothe",
      "Price":8
    },
    {
      "Id":5,
      "Name":"Default product E",
      "Category":"Clothe",
      "Price":62
    },
    {
      "Id":6,
      "Name":"Default product F",
      "Category":"Clothe",
      "Price":102
    }
  ] 
}
