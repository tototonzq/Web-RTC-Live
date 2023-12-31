import { Component, NgZone } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
})
export class OfferComponent {
  /* -------------------------------------------------------------------------- */
  /*                                   Stream                                   */
  /* -------------------------------------------------------------------------- */
  private _peer: RTCPeerConnection & { dc?: RTCDataChannel } =
    new RTCPeerConnection();

  constructor(private _message: MessageService, private _zone: NgZone) {
    this._initalizeLoadDevices();
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
            this.offerDataCamera = '';
            this.answerDataCamera = '';
            break;
        }
      });
    };
  }

  localStream?: MediaStream;
  remoteStream?: MediaStream;
  devliceItem = {
    videos: [] as MediaDeviceInfo[],
    audios: [] as MediaDeviceInfo[],
  };

  videoDevice: string = '';
  audioDevice: string = '';

  connected: boolean = false;

  offerDataCamera: string = '';
  answerDataCamera: string = '';

  step: number = 0;
  steps: MenuItem[] = [
    { label: 'เปิด Camera' },
    { label: 'สร้าง Offer Camera' },
    { label: 'คัดลอก Offer Camera' },
    { label: 'ยืนยัน Answer Camera' },
  ];

  /** เปิดกล้องและไมค์ */
  async openStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      this.step = 1;
    } catch (ex: any) {
      this._message.add({
        severity: 'error',
        summary: 'เปิดกล้องไม่ได้',
        detail: ex.message,
      });
    }
  }

  /** เมื่อกดปุ่มสร้างข้อมูล Offer */
  createOffer() {
    if (!this.localStream)
      return this._message.add({
        severity: 'warn',
        summary: 'แจ้งเตือน',
        detail: 'ไม่มีข้อมูล Stream',
      });

    this.localStream
      .getTracks()
      .forEach((track) => this._peer.addTrack(track, this.localStream!));
    this._peer.ontrack = (ev) => this._onTrackStream(ev);
    this._peer.onicecandidate = (ev) => {
      if (!ev.candidate) return;
      this._zone.run(() => {
        this.offerDataCamera = JSON.stringify(this._peer.localDescription);
        this.step = 2;
      });
    };
    this._peer
      .createOffer()
      .then((offer) => this._peer.setLocalDescription(offer));
  }

  /** ยืนยันข้อมูล Answer */
  confirmAnswer() {
    if (!this.answerDataCamera)
      return this._message.add({
        severity: 'warn',
        summary: 'แจ้งเตือน',
        detail: 'กรุณากรอกข้อมูล Offer',
      });
    this._peer.setRemoteDescription(JSON.parse(this.answerDataCamera));
  }

  /** เมื่อเครื่องที่เชื่อมต่อส่งข้อมูล Stream มาให้ */
  private _onTrackStream(ev: RTCTrackEvent) {
    this._zone.run(() => {
      if (ev.streams.length <= 0) return;
      this.remoteStream = ev.streams[0];
    });
  }

  /** โหลดข้อมูล device กล้องและไมค์ */
  private async _initalizeLoadDevices() {
    const deviceItems = await navigator.mediaDevices.enumerateDevices();
    deviceItems.forEach((item) => {
      switch (item.kind) {
        case 'audioinput':
          this.devliceItem.audios.push(item);
          break;
        case 'videoinput':
          this.devliceItem.videos.push(item);
          break;
      }
    });

    if (this.devliceItem.videos.length > 0)
      this.videoDevice = this.devliceItem.videos[0].deviceId;
    if (this.devliceItem.audios.length > 0)
      this.audioDevice = this.devliceItem.audios[0].deviceId;
  }
}
