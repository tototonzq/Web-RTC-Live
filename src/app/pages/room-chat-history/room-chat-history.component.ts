import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { SocketService } from 'src/app/shared/socket.service';

interface message {
  user_id: string;
  send_message: string;
  receive_user: number;
  room_chat: string | null;
}

@Component({
  selector: 'app-room-chat-history',
  templateUrl: './room-chat-history.component.html',
})
export class RoomChatHistoryComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private _socket: Socket,
    private _socketService: SocketService
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                     Var                                    */
  /* -------------------------------------------------------------------------- */
  msg: message[] = [];

  form: FormGroup = new FormGroup({
    user_id: new FormControl<number>(1, [Validators.required]),
    send_message: new FormControl<string>('ทำการทดสอบ', [Validators.required]),
    receive_user: new FormControl<number>(7, [Validators.required]),
    room_chat: new FormControl<string | null>('A0001', [Validators.required]),
  });

  /* -------------------------------------------------------------------------- */
  /*                                    OnIn                                    */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this._socketService.onEvent('7').subscribe((data: any) => {
      this.msg.push(data.content);
    });

    this._http
      .get<message[]>(
        'http://localhost:3000/chat/find-by-room-chat?room_chat=' +
          this.form.value.room_chat
      )
      .subscribe((res) => {
        this.msg.push(...res);
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    OnDes                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                     Fun                                    */
  /* -------------------------------------------------------------------------- */
  onSubmit() {
    this._http
      .post('http://localhost:3000/chat/sent-messages', {
        ...this.form.value,
      })
      .subscribe();
  }

  onJoinRoom() {
    this._http
      .get<message[]>(
        'http://localhost:3000/chat/find-by-room-chat?room_chat=' +
          this.form.value.room_chat
      )
      .subscribe((res) => {
        if (res) {
          this.msg = [];
          this.msg.push(...res);
        }
      });
  }
}
