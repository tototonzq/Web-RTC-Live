import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { RouterModule } from '@angular/router';
import { routes } from './root.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    RouterModule.forChild(routes),
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
  declarations: [RoomComponent],
})
export default class RoomModule {}
