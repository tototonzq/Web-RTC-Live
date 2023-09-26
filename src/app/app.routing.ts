import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'message' },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module'),
  },
  {
    path: 'stream',
    loadChildren: () => import('./pages/stream/stream.module'),
  },
  {
    path: 'message-stream',
    loadChildren: () => import('./pages/message-stream/message-stream.module'),
  },
];
