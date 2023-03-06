import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { IAdResponseDto } from 'src/app/models/dtos/IAdResponseDto';
import { IMessageResponse } from 'src/app/models/dtos/IMessageResponseDto';
import { IUserResponseDto } from 'src/app/models/dtos/IUserResponseDto';
import { AdService } from 'src/app/services/ad/ad.service';
import { MessageService } from 'src/app/services/message/message.service';
import { UserService } from 'src/app/services/user.service';
import { Unsubscribe } from 'src/app/_helpers/_unscubscribe/unsubscribe';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent extends Unsubscribe implements OnInit {

  user = {} as IUserResponseDto;
  ads: IAdResponseDto[] = [];
  messagesReceived: IMessageResponse[] = [];
  messagesSent: IMessageResponse[] = [];
  selectedAdId: number = 0;
  readingMessage: IMessageResponse = {} as IMessageResponse;

  constructor(private route: ActivatedRoute, 
              private userService: UserService, 
              private adService: AdService,
              private messageService: MessageService,
              private viewportScroller: ViewportScroller) {
                super();
              }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('id'));

    if (userId) {
      this.userService.getUser(userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => this.user = res);

      this.adService.getAdByUser(userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => this.ads = res);

      this.messageService.getMessagesReceivedByUser(userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => this.messagesReceived = res);

      this.messageService.getMessagesSentByUser(userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => this.messagesSent = res);
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
    window.location.reload();
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
