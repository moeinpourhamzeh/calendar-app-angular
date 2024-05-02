import { Component } from '@angular/core';
import {DAY_MS} from "../../../../shared/const/days-ms.const";

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss'
})
export class CalendarPageComponent {
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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

    return this.getRange(1, 42).map(x => new Date(startingDate! + (x * DAY_MS)))
  }

  // Get the first day of the calendar which is the Monday
  getStartDay(date: Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()]
    const firstDayOfMonth = new Date(year, month, 1).getTime()

    return this.getRange(1, 7)
      .map(x => new Date(firstDayOfMonth - (x * DAY_MS)))
      .find(x => x.getDay() === 0)
  }

  // Create an array with a range of numbers
  getRange(start = 0, end = 0, length = end - start) {
    return Array.from({length}, (_, i) => i + start)
  }
}
