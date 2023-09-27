import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomChatHistoryComponent } from './room-chat-history.component';
import { RouterModule } from '@angular/router';
import { roomChatHistoryRoutes } from './room-chat-history.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { StepsModule } from 'primeng/steps';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roomChatHistoryRoutes),
    StepsModule,
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    MessageModule,
    FormsModule,
    InputTextModule,
    PanelModule,
    DropdownModule,
  ],
  declarations: [RoomChatHistoryComponent],
})
export default class RoomChatHistoryModule {}
