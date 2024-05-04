import {computed, Injectable, signal} from '@angular/core';
import {ScheduleModel} from "../_models/schedule.model";
import {twoDatesEqual} from "../_untils/datesMatch";

export interface IScheduleState {
  scheduledEventsList: ScheduleModel[]
  selectedList: ScheduleModel[]
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  // state
  state = signal<IScheduleState>({
    scheduledEventsList: [],
    selectedList: []
  })

  // selectors
  scheduledEventsList = computed(() => this.state().scheduledEventsList)
  selectedList = computed(() => this.state().selectedList)

  constructor() { }


  // CRUD functions
  addNewEvent(scheduledEventsList: ScheduleModel) {

    const allSchedules = computed(() => this.state().scheduledEventsList)()
    const list = computed(() => this.state().scheduledEventsList)()
      .filter(x => twoDatesEqual(x.dateStart, scheduledEventsList.dateStart))
    list.push(scheduledEventsList)
    allSchedules.push(scheduledEventsList)

    this.state.update((state) => ({
      ...state,
      scheduledEventsList: allSchedules,
      selectedList: list,
    }))
  }

  updateEvent(scheduledEventsList: ScheduleModel) {

    const allSchedules = computed(() => this.state().scheduledEventsList)()
    const list = computed(() => this.state().scheduledEventsList)()
      .filter(x => twoDatesEqual(x.dateStart, scheduledEventsList.dateStart))
    const updatedListAll = allSchedules.filter(x => x.id !== scheduledEventsList.id)
    const updatedList = list.filter(x => x.id !== scheduledEventsList.id)
    updatedList.push(scheduledEventsList)
    updatedListAll.push(scheduledEventsList)
    this.state.update((state) => ({
      ...state,
      scheduledEventsList: updatedListAll,
      selectedList: updatedList
    }))
  }

  deleteEvent(id: number) {

    const list = computed(() => this.state().scheduledEventsList)()
    const updatedList = list.filter(x => x.id !== id)

    this.state.update((state) => ({
      ...state,
      scheduledEventsList: updatedList,
      selectedList: updatedList
    }))
  }

  getEventsListOnDate(date: Date) {
    const list = computed(() => this.state().scheduledEventsList)()
    const updatedList = list.filter(x => twoDatesEqual(x.dateStart, date))

    this.state.update((state) => ({
      ...state,
      selectedList: updatedList
    }))
  }
}
