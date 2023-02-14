import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {

  public adId!: number;

  constructor(private route: ActivatedRoute, private adService: AdService) {}

  ngOnInit() {
    this.adId = +this.route.snapshot.params['id'];
    this.adService.getAd(this.adId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });
  }
}
