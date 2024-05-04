import {Component, inject} from '@angular/core';
import {DAY_MS} from "../../../../_const/days-ms.const";
import {getRange} from "../../../../_untils/array-builder";
import {ScheduleService} from "../../../../_services/schedule.service";
import {twoDatesEqual} from "../../../../_untils/datesMatch";

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss'
})
export class CalendarPageComponent {

  scheduleService = inject(ScheduleService)
  scheduledEventsList = this.scheduleService.scheduledEventsList

  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  dates: Array<Date> = []
  currentDate: Date
  chosenDate: Date

  constructor() {
    this.currentDate = new Date()
    this.chosenDate = new Date()
    this.dates = this.getDates(this.chosenDate)
  }

  changeMonth(inc: number) {
    const [year, month] = [this.chosenDate.getFullYear(), this.chosenDate.getMonth()]
    this.chosenDate = new Date(year, month + inc, 1)
    this.dates = this.getDates(this.chosenDate)
  }

  // Create 42 days of a page
  getDates(date: Date) {
    const startingDate = this.getStartDay(date)?.getTime()
    return getRange(0, 41).map(x => new Date(startingDate! + (x * DAY_MS)))
  }

  // Get the first day of the calendar which is the Monday
  getStartDay(date: Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()]
    const firstDayOfMonth = new Date(year, month, 1).getTime()
    console.log(date)
    console.log(year)
    console.log(month)
    console.log(new Date(year, month, 1))

    return getRange(0, 7)
      .map(x => new Date(firstDayOfMonth - (x * DAY_MS)))
      .find(x => x.getDay() === 0)
  }

  // find schedules in list by date
  getSchedulesByDate(date: Date) {
    return this.scheduledEventsList().filter(x => twoDatesEqual(x.dateStart, date))
  }
}
