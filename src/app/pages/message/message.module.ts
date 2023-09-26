import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { messageRoutes } from './message.routing';
import { OfferComponent } from './components/offer/message-offer.component';
import { AnswerComponent } from './components/answer/message-answer.component';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/message-chat.component';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OfferComponent, AnswerComponent, ChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(messageRoutes),
    StepsModule,
    CardModule,
    ButtonModule,
    InputTextareaModule,
    MessageModule,
    FormsModule,
    InputTextModule,
    PanelModule,
  ],
})
export default class SimpleMessageModule {}
