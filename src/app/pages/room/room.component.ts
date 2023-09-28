import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { SocketService } from 'src/app/shared/socket.service';
import { BehaviorSubject } from 'rxjs';

interface message {
  user_id: number;
  send_message: string;
  receive_message: string;
  receive_user: number;
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private _socket: Socket,
    private _socketService: SocketService
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                     Var                                    */
  /* -------------------------------------------------------------------------- */
  msg: any[] = [];

  form: FormGroup = new FormGroup({
    user_id: new FormControl<number>(1, [Validators.required]),
    send_message: new FormControl<string>('ทำการทดสอบ', [Validators.required]),
    receive_user: new FormControl<number>(7, [Validators.required]),
    room_chat: new FormControl<string | null>('', [Validators.required]),
  });

  /* -------------------------------------------------------------------------- */
  /*                                    OnIn                                    */
  /* -------------------------------------------------------------------------- */
  ngOnInit() {
    this._socketService.onEvent('7').subscribe((data: any) => {
      this.msg.push(data.content);
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
      .post('http://192.168.1.185:3000/chat/sent-messages', {
        user_id: this.form.value.user_id,
        send_message: this.form.value.send_message,
        receive_user: this.form.value.receive_user,
        room_chat: this.form.value.room_chat ?? null,
      })
      .subscribe();
  }

  onJoinRoom() {}
}
