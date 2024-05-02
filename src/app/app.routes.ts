import { Routes } from '@angular/router';

export const routes: Routes = [
  // Lazyloading calendar module
  { path: '',
    loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule), }
];
