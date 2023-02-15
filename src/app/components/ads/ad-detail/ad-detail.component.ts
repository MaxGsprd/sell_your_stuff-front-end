import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAd } from 'src/app/models/IAd.interface';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {

  ad: any = {
    id: undefined,
    author : undefined,
    title :undefined ,
    description : undefined,
    category : undefined,
    price : undefined,
    publicationDate : undefined,
    condition : undefined,
    location : undefined,
    Image : undefined
  };

  constructor(private route: ActivatedRoute, private adService: AdService) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const adIdFromRoute = Number(routeParams.get('id'));

    this.adService.getAd(adIdFromRoute).subscribe({
      next: (res) => {
        this.mapAdInterface(res);
      },
      error: (err) => console.log(err)
    });
  }

  mapAdInterface(httpResponseObject: any) {
    console.log(httpResponseObject)
    this.ad.id = httpResponseObject.id;
    this.ad.author = httpResponseObject.author;
    this.ad.title = httpResponseObject.title;
    this.ad.description = httpResponseObject.description;
    this.ad.category = httpResponseObject.category;
    this.ad.publicationDate = httpResponseObject.publicationDate;
    this.ad.location = httpResponseObject.location;
    this.ad.Image = httpResponseObject.Image;
  }
}
