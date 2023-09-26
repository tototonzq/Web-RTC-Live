import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { StepsModule } from 'primeng/steps';
import { messageStreamRoutes } from './message-stream.routing';
import { DropdownModule } from 'primeng/dropdown';
import { OfferComponent } from './components/offer/offer.component';
import { ChatStreamComponent } from './components/chat-stream/chat-stream.component';
import { AnswerMessageStreamComponent } from './components/answer/answer.component';

@NgModule({
  declarations: [
    AnswerMessageStreamComponent,
    ChatStreamComponent,
    OfferComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(messageStreamRoutes),
    StepsModule,
    CardModule,
    ButtonModule,
    InputTextareaModule,
    MessageModule,
    FormsModule,
    InputTextModule,
    PanelModule,
    DropdownModule,
  ],
})
export default class SimpleMStreamModule {}
