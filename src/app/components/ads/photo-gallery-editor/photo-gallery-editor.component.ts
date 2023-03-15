import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { takeUntil, tap } from 'rxjs';
import { IAd } from 'src/app/models/IAd';
import { AdService } from 'src/app/services/ad/ad.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-photo-gallery-editor',
  templateUrl: './photo-gallery-editor.component.html',
  styleUrls: ['./photo-gallery-editor.component.css']
})
export class PhotoGalleryEditorComponent extends Unsubscribe implements OnInit {
  ad?: IAd;
  loggedInUserId?: string | null;
  fileUploader?: FileUploader;
  maxAllowedFileSize: number = 10*1024*1024;
  hasBaseDropZoneOver?: boolean;

  constructor (private adService: AdService,
               private route: ActivatedRoute,
               private router: Router,
               private tokenService: TokenService,
               private toastr: ToastrService) {
                 super()
              }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const adIdFromRoute = Number(routeParams.get('id'));
    this.getCurrentUser();
    this.adService.getAd(adIdFromRoute)
      .pipe(
        tap( ad => { 
          if (ad.user.id != this.loggedInUserId) this.router.navigate(['/']);
         }
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(ad => {
        this.ad = ad;
        this.initializeFileUploader(this.ad.id);
      });
  }

  initializeFileUploader(adId: number) {
    this.fileUploader = new FileUploader({
      url: `${environment.apiUrl}/Cl-Ad/add/Photo/${adId}`,
      authToken: `Bearer ${localStorage.getItem('authToken')}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: this.maxAllowedFileSize
    });

    this.fileUploader.onAfterAddingFile = (file) => file.withCredentials = false;

    this.fileUploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.ad?.photos.push(photo);
      }
    };
    this.fileUploader.onCompleteAll = () => { window.location.reload()}
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getCurrentUser() {
    if (this.tokenService.isLogged()) {
      const user = this.tokenService.getUserNameAndId();
      this.loggedInUserId = user.id;
    }
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
