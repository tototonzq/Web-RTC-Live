import { Routes } from '@angular/router';
import { AnswerMessageStreamComponent } from './components/answer/answer.component';
import { OfferComponent } from './components/offer/offer.component';

export const messageStreamRoutes: Routes = [
  { path: '', redirectTo: 'offer', pathMatch: 'full' },
  { path: 'offer', component: OfferComponent },
  { path: 'answer', component: AnswerMessageStreamComponent },
];
