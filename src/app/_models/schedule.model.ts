import {Time} from "@angular/common";


export class ScheduleModel {
  id: number
  title: string
  dateStart: Date
  dateEnd: Date
  height: number
  dragPosition = {x: 0, y: 0};
  constructor(title: string = '',
              dateStart: Date,
              dateEnd: Date) {
    this.id = Math.random()
    this.title = title
    this.dateStart = new Date(dateStart)
    this.dateEnd = new Date(dateEnd)
    // Height is calculated using the difference between the beginning and ending of the event
    this.height = ((this.getDateDiff(dateStart, dateEnd).hour) * 40) + (this.getDateDiff(dateStart, dateEnd).minute * 40 / 60)
    // Drag poisition is the distance from the top which is used to place the card
    this.dragPosition.y = Math.floor((dateStart.getHours()) * 40) + Math.floor(dateStart.getMinutes() * 40 / 60)
  }

  //  set the id when assigning
  setId(id: number) {
    this.id = id
  }

  // Get the differences between two dates
  getDateDiff(startDate: Date, endDate: Date) {
    let start = new Date(startDate)
    let end = new Date(endDate)
    let diff = end.getTime() - start.getTime();
    let days = Math.floor(diff / (60 * 60 * 24 * 1000));
    let hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    let minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    return { day: days, hour: hours, minute: minutes };
  }

  // update hours based on the changes on coordinates
  // Used when drag and dropping each card
  // Y is the distance of top of the card with the top of screen
  updateTimeBasedOnCoordinates(y: number) {
    // Start
    this.dragPosition.y = y
    let hourStart = Math.floor(y / 40)

    let minuteStart = Math.floor(y - (hourStart * 40)) * 60 / 40

    this.dateStart.setHours(hourStart, minuteStart)

    // End Date
    let hourEnd = Math.floor(hourStart + (this.height / 40))

    let minuteEnd = Math.abs(Math.floor((y + this.height) - (hourEnd * 40)) * 60 / 40)

    this.dateEnd.setHours(hourEnd, minuteEnd)

  }
}

