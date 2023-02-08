import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent {

  onSubmit(Form :NgForm) {
    console.log('congrats form submitted');
    console.log(Form);
  }
}
