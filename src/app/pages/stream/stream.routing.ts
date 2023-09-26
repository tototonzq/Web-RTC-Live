import { Routes } from '@angular/router';
import { StreamAnswerComponent } from './components/answer/answer.component';
import { StreamOfferComponent } from './components/offer/offer.component';

export const streamRoutes: Routes = [
  { path: '', redirectTo: 'offer', pathMatch: 'full' },
  { path: 'offer', component: StreamOfferComponent },
  { path: 'answer', component: StreamAnswerComponent },
];
