import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil, tap } from 'rxjs';
import { IAd } from 'src/app/models/IAd';
import { AdService } from 'src/app/services/ad/ad.service';
import { UserService } from 'src/app/services/user/user.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';

@Component({
  selector: 'app-photo-gallery-editor',
  templateUrl: './photo-gallery-editor.component.html',
  styleUrls: ['./photo-gallery-editor.component.css']
})
export class PhotoGalleryEditorComponent extends Unsubscribe implements OnInit {
  ad?: IAd;
  loggedInUserId?: number;

  constructor (private adService: AdService,
               private route: ActivatedRoute,
               private router: Router,
               private userService: UserService,
               private toastr: ToastrService) {
                 super()
              }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const adIdFromRoute = Number(routeParams.get('id'));
    
    this.userService.getLoggedInUserId()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(loggedInUserId => this.loggedInUserId = +loggedInUserId);

    this.adService.getAd(adIdFromRoute)
      .pipe(
        tap( ad => { 
          if (ad.user.id != this.loggedInUserId) this.router.navigate(['/']);
         }
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(ad => this.ad = ad);
  }

  setPrimaryPhoto(adId: number, photo: string) {
    this.adService.setPrimaryPhoto(adId, photo).pipe(takeUntil(this.unsubscribe$)).subscribe();
    window.location.reload();
  }

  deletePhoto(adId: number, photo: string) {
    this.adService.deletePhoto(adId, photo).pipe(takeUntil(this.unsubscribe$)).subscribe();
    window.setTimeout(() => { window.location.reload() }, 700)
    this.toastr.success('Your photo has successfully been deleted');
  }
}
