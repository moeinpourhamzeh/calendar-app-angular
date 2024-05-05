import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarLandingComponent} from "./calendar-landing.component";
import {CalendarPageComponent} from "./pages/calendar-page/calendar-page.component";
import {SchedulePageComponent} from "./pages/schedule-page/schedule-page.component";

const routes: Routes = [
  {
    path: '', component: CalendarLandingComponent, children:
      [
        {path: '', redirectTo: 'calendar', pathMatch: 'full'},
        {path: 'calendar', component: CalendarPageComponent},
        {path: 'calendar/:id', component: SchedulePageComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
