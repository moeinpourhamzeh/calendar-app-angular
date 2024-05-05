import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ScheduleModel} from "../../../../_models/schedule.model";
import {ScheduleService} from "../../../../_services/schedule.service";
import {
  ManageScheduleDialogueComponent
} from "../../dialogues/manage-schedule-dialogue/manage-schedule-dialogue.component";
import {MatDialog} from "@angular/material/dialog";
import {getRange} from "../../../../_untils/array-builder";
import {twoDatesEqual} from "../../../../_untils/datesMatch";


@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent implements OnInit {
  protected readonly getRange = getRange;

  scrollFromTop = 0

  // Current hour
  currentHourDate: Date = new Date()

  // Can open manage schedule event dialogue or not
  // It is relied on whether we want to move the card or not
  canOpenManageDialogue = true

  date: Date = new Date
  dragDisabled: boolean = false

  hideMouseTooltip = true
  mousePosition = {x: 0, y: 0}


  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    this.scrollFromTop  = document.documentElement.scrollTop
  }

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              public scheduleService: ScheduleService) {
    this.route.params.subscribe(params => {
      const year = params['id'].split('-')[0]
      const month = params['id'].split('-')[1]
      const day = params['id'].split('-')[2]
      this.date = new Date(year, month, day)
    });

    setInterval(() => {
      this.currentHourDate = new Date();
    }, 1000);
  }

  ngOnInit() {
    this.scheduleService.getEventsListOnDate(this.date)
  }

  // Open dialogue for editing Schedule
  // We can EDIT and DELETE the schedule in this dialogue
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

  // Dropping the itome and saving it in new coordination
  onDragDropped(scheduleModel: ScheduleModel) {
    const item = document.getElementById( scheduleModel.id.toString())
    scheduleModel.updateTimeBasedOnCoordinates(item!.getBoundingClientRect().top + this.scrollFromTop - 95)
    this.scheduleService.updateEvent(scheduleModel)

    // Give it some delay so that the dialogue does not appear on dragging and dropping the item
    setTimeout(() => {
      this.canOpenManageDialogue = true
    }, 1000)
  }

  // Set the tooltip for mouse movement while it hovers over our container
  showTooltip(mouseEvent: MouseEvent) {
    this.mousePosition.x = mouseEvent.x + 10
    this.mousePosition.y = mouseEvent.y + 10
  }

  // Create a preset event on double-click on the parent
  doubleClickCreateDefaultEvent(event: MouseEvent) {
    let endDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours() + 1, this.date.getMinutes(), 0)
    const newSchedule: ScheduleModel = new ScheduleModel('new Event', this.date, endDate)
    newSchedule.updateTimeBasedOnCoordinates(event.offsetY)
    this.scheduleService.addNewEvent(newSchedule)
  }

  updateHourLocation(date: Date) {
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (hour * 39) + ((minute / 60) * 40) + (((second / 60) / 60) * 40)
  }

  protected readonly twoDatesEqual = twoDatesEqual;
}
