import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ScheduleModel} from "../../../../_models/schedule.model";
import {ScheduleService} from "../../../../_services/schedule.service";
import {
  ManageScheduleDialogueComponent
} from "../../dialogues/manage-schedule-dialogue/manage-schedule-dialogue.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent implements OnInit {
  date: Date = new Date
  dragDisabled: boolean = false

  scheduleService = inject(ScheduleService)
  selectedList = this.scheduleService.selectedList

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      const year = params['id'].split('-')[0]
      const month = params['id'].split('-')[1]
      const day = params['id'].split('-')[2]
      this.date = new Date(year, month, day)
    });
  }

  ngOnInit() {
    this.scheduleService.getEventsListOnDate(this.date)
  }

  manageSchedule(schedule?: ScheduleModel) {
    const d = this.dialog.open(ManageScheduleDialogueComponent, {
      data: {
        date: this.date,
        scheduleForEdit: schedule
      },
    })
  }

  deleteSchedule(scheduleId: number) {
    this.scheduleService.deleteEvent(scheduleId)
  }

  onDragDropped(scheduleModel: ScheduleModel) {
    const item = document.getElementById( scheduleModel.id.toString())
    scheduleModel.updateTimeBasedOnCoordinates(item!.getBoundingClientRect().top - 84)
    this.scheduleService.updateEvent(scheduleModel)
  }

  mouseUp(mouseEvent: MouseEvent) {
    this.dragDisabled = false
  }

  // create an array
  getRange(start = 0, end = 0, length = end - start) {
    return Array.from({length}, (_, i) => i + start)
  }
}
