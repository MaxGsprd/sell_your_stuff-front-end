import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { IMessageRequest } from 'src/app/models/dtos/IMessageRequestDto';
import { IAd } from 'src/app/models/IAd';
import { IUser } from 'src/app/models/IUser';
import { AdService } from 'src/app/services/ad/ad.service';
import { MessageService } from 'src/app/services/message/message.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent extends Unsubscribe implements OnInit {

  ad!: IAd;
  messageForm!: FormGroup;
  userSubmitted!:boolean;
  currentUser!: IUser;
  primaryPhotoUrl!: string;
  isUserAdAuthor!: boolean;

  constructor(private route: ActivatedRoute, 
              private adService: AdService,
              private toastr: ToastrService,
              private tokenService: TokenService,
              private messageService: MessageService,
              private router: Router) { 
                super(); 
              }

  ngOnInit(): void{
    this.getCurrentUser();
    this.getAd();
    this.messageForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
  }

  getAd(): void {
    const routeParams = this.route.snapshot.paramMap;
    const adIdFromRoute = Number(routeParams.get('id'));
    this.adService.getAd(adIdFromRoute)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
          next: (response) => {
            this.ad = response;
            if (this.currentUser.id) {
              this.isUserAdAuthor = this.ad.user.id == +this.currentUser.id
            }
            this.getPrimaryPhoto(this.ad);
          },
          error: () =>  this.router.navigate(['/'])
      });
  }

  sendMessage() {
    this.userSubmitted = true;
    if (this.messageForm.valid) {
      let newMessage = this.messageFormToMessage(this.messageForm.value);
      this.messageService.postMessage(newMessage).pipe(takeUntil(this.unsubscribe$)).subscribe();
      this.messageForm.reset();
      this.userSubmitted = false;
      this.toastr.success('Congratulations, your message has been sent.', 'Thank you !');
    }
  }

  messageFormToMessage(formValues: any): IMessageRequest {
    let message = {} as IMessageRequest;
    message.title = formValues.title;
    message.body = formValues.body;
    if (this.currentUser.id) {
      message.authorId = +this.currentUser.id;
    }
    message.recipientId = this.ad?.user.id;
    message.adId = this.ad?.id;
    message.isRead = false;
    message.date = new Date();
    return message;
  }

  getCurrentUser() {
    if (this.tokenService.isLogged()) {
      this.currentUser = this.tokenService.getUserNameAndId();
    }
  }

  getPrimaryPhoto(ad: IAd): void {
    if (ad?.photos?.length > 0) {
      ad.photos.forEach(p => {
        if (p.isPrimary) this.primaryPhotoUrl = p.imageUrl;
      });
    } else {
      this.primaryPhotoUrl = "assets/images/placeholder_img.png";
    }
  }

  /**
   * Getter methods for form controls
   */
    get title() { return this.messageForm.get('title'); }
    get body() { return this.messageForm.get('body'); }
}
