import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { streamRoutes } from './stream.routing';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { StreamComponent } from './components/stream/stream.component';
import { RouterModule } from '@angular/router';
import { StreamOfferComponent } from './components/offer/offer.component';
import { StreamAnswerComponent } from './components/answer/answer.component';

@NgModule({
  declarations: [StreamAnswerComponent, StreamComponent, StreamOfferComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(streamRoutes),
    CardModule,
    StepsModule,
    MessageModule,
    FormsModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
  ],
})
export default class SimpleStreamModule {}
