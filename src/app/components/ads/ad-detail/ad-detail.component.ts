import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent {

  public adId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.adId = this.route.snapshot.params['id'];
  }

}
