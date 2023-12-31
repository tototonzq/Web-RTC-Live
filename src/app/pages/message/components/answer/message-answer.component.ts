import { Component, NgZone } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { IChat } from '../../intefaces/chat.interface';

@Component({
  selector: 'app-message-answer',
  templateUrl: './message-answer.component.html',
})
export class AnswerComponent {
  constructor(private _message: MessageService, private _zone: NgZone) {
    this._peer.onconnectionstatechange = () => {
      this._zone.run(() => {
        this._message.add({
          severity: 'info',
          summary: 'แจ้งเตือนการเชื่อมต่อ',
          detail: this._peer.connectionState,
        });
        switch (this._peer.connectionState) {
          case 'connected':
            this.connected = true;
            break;
          case 'disconnected':
            this.step = 0;
            this.offerData = '';
            this.answerData = '';
            this.connected = false;
            break;
        }
      });
    };
  }

  private _peer: RTCPeerConnection & { dc?: RTCDataChannel } =
    new RTCPeerConnection();

  public messageItems: IChat[] = [];
  public get channel() {
    return this._peer.dc;
  }

  connected: boolean = false;
  offerData: string = '';
  answerData: string = '';
  step: number = 0;
  steps: MenuItem[] = [
    { label: 'เก็บ Offer' },
    { label: 'สร้าง Answer' },
    { label: 'คัดลอก Answer' },
  ];

  /** เก็บข้อมูล Offer */
  storeOffer() {
    if (!this.offerData)
      return this._message.add({
        severity: 'warn',
        summary: 'แจ้งเตือน',
        detail: 'กรุณากรอกข้อมูล Offer',
      });
    this.step = 1;
  }

  /** สร้างข้อมูล Answer */
  createAnswer() {
    this._peer.ondatachannel = (ev) => {
      this._peer.dc = ev.channel;
      this._peer.dc.onmessage = (ev) => this._onChannelMessage(ev);
    };

    this._peer.onicecandidate = (ev) => {
      if (!ev.candidate) return;
      this._zone.run(() => {
        this.answerData = JSON.stringify(this._peer.localDescription);
        this.step = 2;
      });
    };

    this._peer.setRemoteDescription(JSON.parse(this.offerData));
    this._peer
      .createAnswer()
      .then((answer) => this._peer.setLocalDescription(answer));
  }

  /** เมื่ออีกเครื่องส่งข้อความมา */
  private _onChannelMessage(ev: MessageEvent<string>) {
    this._zone.run(() => {
      console.log('Message: ', ev.data);
      this.messageItems.push({ isMe: false, text: ev.data });
    });
  }
}
