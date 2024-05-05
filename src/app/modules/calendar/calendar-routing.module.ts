import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarLandingComponent} from "./calendar-landing.component";
import {MonthPageComponent} from "./pages/month-page/month-page.component";
import {DayPageComponent} from "./pages/day-page/day-page.component";

const routes: Routes = [
  {
    path: '', component: CalendarLandingComponent, children:
      [
        {path: '', redirectTo: 'calendar', pathMatch: 'full'},
        {path: 'calendar', component: MonthPageComponent},
        {path: 'calendar/:id', component: DayPageComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
