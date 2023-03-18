import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { IMessageResponse } from 'src/app/models/dtos/IMessageResponseDto';
import { IUserResponseDto } from 'src/app/models/dtos/IUserResponseDto';
import { IAd } from 'src/app/models/IAd';
import { AdService } from 'src/app/services/ad/ad.service';
import { MessageService } from 'src/app/services/message/message.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent extends Unsubscribe implements OnInit {

  user = {} as IUserResponseDto;
  ads: IAd[] = [];
  messagesReceived: IMessageResponse[] = [];
  messagesSent: IMessageResponse[] = [];
  selectedAdId: number = 0;
  readingMessage: IMessageResponse = {} as IMessageResponse;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private userService: UserService, 
              private adService: AdService,
              private messageService: MessageService,
              private tokenService: TokenService,
              private viewportScroller: ViewportScroller) {
                super();
              }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('id'));

    if (userId) {
      this.checkUserId(userId.toString());

      this.userService.getUser(userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => this.user = res);

      this.adService.getAdByUser(userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => this.ads = res);

      this.messageService.getMessagesReceivedByUser(userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => this.messagesReceived = res.reverse());

      this.messageService.getMessagesSentByUser(userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => this.messagesSent = res.reverse());
    }
  }

  checkUserId(userId: string) {
    if (this.tokenService.isLogged()) {
      const userData = this.tokenService.getUserNameAndId();
      if (userData.id != userId) this.router.navigate(['/']);
    }
  }

  onClick(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
}

  confirmDelete(id: number): void {
    this.selectedAdId = id;
  }

  deleteAd(): void {
    this.adService.deleteAd(this.selectedAdId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.selectedAdId = 0;
    window.setTimeout(() => { window.location.reload() }, 1000)
  }

  readMsg(msg: IMessageResponse): void {
    this.readingMessage = msg;
    if (msg.isRead === false && msg.recipient.id === this.user.id) {
      const updateMsgObject = [{ "path": "/isRead", "op": "replace", "value": 1 }];

      this.messageService.updateMessage(this.readingMessage.id, updateMsgObject)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();
    }
  }

  onCloseReload() {
    window.location.reload();
  }
}
