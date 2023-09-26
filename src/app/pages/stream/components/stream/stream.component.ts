import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
})
export class StreamComponent {
  @Input('localStream') localStream?: MediaStream;
  @Input('remoteStream') remoteStream?: MediaStream;
}
