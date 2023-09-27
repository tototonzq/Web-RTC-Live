import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  items: MenuItem[] = [
    { label: 'Simple Message Offer', routerLink: ['/message/offer'] },
    { label: 'Simple Message Answer', routerLink: ['/message/answer'] },
    { label: 'Simple Stream Offer', routerLink: ['/stream/offer'] },
    { label: 'Simple Stream Answer', routerLink: ['/stream/answer'] },
    {
      label: 'Simple Message Stream Offer',
      routerLink: ['/message-stream/offer'],
    },
    {
      label: 'Simple Message Stream Answer',
      routerLink: ['/message-stream/answer'],
    },
    { label: 'Room Chat', routerLink: ['/room'] },
    { label: 'Room Chat History', routerLink: ['/room-chat-history'] },
  ];
}
