import { Routes } from '@angular/router';
import { OfferComponent } from './components/offer/message-offer.component';
import { AnswerComponent } from './components/answer/message-answer.component';

export const messageRoutes: Routes = [
  { path: '', redirectTo: 'offer', pathMatch: 'full' },
  { path: 'offer', component: OfferComponent },
  { path: 'answer', component: AnswerComponent },
];
