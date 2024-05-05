import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import {CalendarLandingComponent} from "./calendar-landing.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {MonthPageComponent} from "./pages/month-page/month-page.component";
import {DayPageComponent} from "./pages/day-page/day-page.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatCard} from "@angular/material/card";
import {MatRipple} from "@angular/material/core";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {ManageScheduleDialogueComponent} from "./dialogues/manage-schedule-dialogue/manage-schedule-dialogue.component";
import {MatTooltip} from "@angular/material/tooltip";
import {MonthNamePipe} from "../../_pipes/month-name.pipe";


@NgModule({
  declarations: [
    CalendarLandingComponent,

    // Pages
    MonthPageComponent,
    DayPageComponent,

    // Dialogue
    ManageScheduleDialogueComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MatIcon,
    MatButton,
    MatIconButton,
    HeaderComponent,
    MatLabel,
    MatCard,
    MatRipple,
    CdkDrag,
    CdkDropList,
    FormsModule,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatTooltip,
    MonthNamePipe,
  ]
})
export class CalendarModule { }
