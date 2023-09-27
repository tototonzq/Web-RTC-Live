import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChat } from '../../intefaces/chat.interface';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-stream',
  templateUrl: './chat-stream.component.html',
})
export class ChatStreamComponent implements OnInit {
  constructor(private _socket: Socket, private _http: HttpClient) {}

  ngOnInit(): void {
    this._socket.fromEvent('100').subscribe((data: any) => {
      this.msg.push(data.content);
    });
  }

  @Input() isLocalStream: boolean = true;
  @Input() isRemoteStream: boolean = true;
  @Input('localStream') localStream?: MediaStream;
  @Input('remoteStream') remoteStream?: MediaStream;
  @Input('channel') channel?: RTCDataChannel;
  @Input('items') items: IChat[] = [];
  @Output('itemsChange') itemsChange = new EventEmitter<IChat[]>();

  /* -------------------------------------------------------------------------- */
  /*                                  Variable                                  */
  /* -------------------------------------------------------------------------- */
  msg: any[] = [];

  form: FormGroup = new FormGroup({
    user_id: new FormControl<number>(1, [Validators.required]),
    send_message: new FormControl<string>('ทำการทดสอบ', [Validators.required]),
    receive_user: new FormControl<number>(100, [Validators.required]),
    room_chat: new FormControl<string | null>('', [Validators.required]),
  });

  /* -------------------------------------------------------------------------- */
  /*                                  Function                                  */
  /* -------------------------------------------------------------------------- */
  onSubmit() {
    this._http
      .post('http://localhost:3000/chat/sent-messages', {
        ...this.form.value,
      })
      .subscribe();
  }
}
