import {Injectable} from '@angular/core';
import {ScheduleModel} from "../_models/schedule.model";
import {twoDatesEqual} from "../_untils/datesMatch";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private allSchedulesList: ScheduleModel[] = []
  private allSchedulesListSubject = new BehaviorSubject<ScheduleModel[]>(this.allSchedulesList)
  private selectedSchedulesList: ScheduleModel[] = []
  private selectedSchedulesListSubject = new BehaviorSubject<ScheduleModel[]>(this.selectedSchedulesList)

  public allSchedulesList$: Observable<ScheduleModel[]> = this.allSchedulesListSubject.asObservable()
  public selectedSchedulesList$: Observable<ScheduleModel[]> = this.selectedSchedulesListSubject.asObservable()

  constructor() { }


  // CRUD functions
  addNewEvent(scheduledEventsList: ScheduleModel) {

    this.allSchedulesList.push(scheduledEventsList)
    this.selectedSchedulesList = this.allSchedulesList
      .filter(x => twoDatesEqual(x.dateStart, scheduledEventsList.dateStart))

    this.allSchedulesListSubject.next(this.selectedSchedulesList)
    this.selectedSchedulesListSubject.next(this.selectedSchedulesList)
  }

  updateEvent(scheduledEventsList: ScheduleModel) {

    this.selectedSchedulesList = this.allSchedulesList
      .filter(x => twoDatesEqual(x.dateStart, scheduledEventsList.dateStart))

    this.allSchedulesList.splice(this.allSchedulesList.findIndex(x => x.id === scheduledEventsList.id), 1)
    this.selectedSchedulesList.splice(this.selectedSchedulesList.findIndex(x => x.id === scheduledEventsList.id, 1))
    this.allSchedulesList.push(scheduledEventsList)
    this.selectedSchedulesList.push(scheduledEventsList)

    this.allSchedulesListSubject.next(this.selectedSchedulesList)
    this.selectedSchedulesListSubject.next(this.selectedSchedulesList)
  }

  deleteEvent(id: number) {
    this.allSchedulesList.splice(this.allSchedulesList.findIndex(x => x.id === id), 1)
    this.selectedSchedulesList.splice(this.selectedSchedulesList.findIndex(x => x.id === id, 1))

    this.allSchedulesListSubject.next(this.selectedSchedulesList)
    this.selectedSchedulesListSubject.next(this.selectedSchedulesList)
  }

  getEventsListOnDate(date: Date): ScheduleModel[] {

    this.selectedSchedulesList = this.allSchedulesList.filter(x => twoDatesEqual(x.dateStart, date))
    this.selectedSchedulesListSubject.next(this.selectedSchedulesList)
    return this.selectedSchedulesList

  }
}
