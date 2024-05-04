import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ScheduleModel} from "../../../../_models/schedule.model";
import {ScheduleService} from "../../../../_services/schedule.service";
import {
  ManageScheduleDialogueComponent
} from "../../dialogues/manage-schedule-dialogue/manage-schedule-dialogue.component";
import {MatDialog} from "@angular/material/dialog";
import {getRange} from "../../../../_untils/array-builder";


@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent implements OnInit {
  protected readonly getRange = getRange;

  // Can open manage schedule event dialogue or not
  // It is relied on whether we want to move the card or not
  canOpenManageDialogue = true

  date: Date = new Date
  dragDisabled: boolean = false

  hideMouseTooltip = true
  mousePosition = {x: 0, y: 0}

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
    if (this.canOpenManageDialogue) {
      const d = this.dialog.open(ManageScheduleDialogueComponent, {
        data: {
          date: this.date,
          scheduleForEdit: schedule
        },
      })
    }
  }

  onDragDropped(scheduleModel: ScheduleModel) {
    const item = document.getElementById( scheduleModel.id.toString())
    scheduleModel.updateTimeBasedOnCoordinates(item!.getBoundingClientRect().top - 95)
    this.scheduleService.updateEvent(scheduleModel)
    setTimeout(() => {
      this.canOpenManageDialogue = true
    }, 1000)
  }

  mouseUp(mouseEvent: MouseEvent) {
    this.dragDisabled = false
  }

  showTooltip(mouseEvent: MouseEvent) {
    this.mousePosition.x = mouseEvent.pageX + 10
    this.mousePosition.y = mouseEvent.pageY + 10
  }

  // Create a preset event on double-click on the parent
  doubleClickCreateDefaultEvent(event: MouseEvent) {
    let endDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours() + 1, this.date.getMinutes(), 0)
    const newSchedule: ScheduleModel = new ScheduleModel('new Event', this.date, endDate)
    newSchedule.updateTimeBasedOnCoordinates(event.offsetY)
    this.scheduleService.addNewEvent(newSchedule)
  }

}
