import {computed, Injectable, signal} from '@angular/core';
import {ScheduleModel} from "../_models/schedule.model";

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
  selectedList = computed(() => this.state().selectedList)

  constructor() { }

  addNewEvent(scheduledEventsList: ScheduleModel) {

    const list = computed(() => this.state().scheduledEventsList)()
    list.push(scheduledEventsList)

    this.state.update((state) => ({
      ...state,
      scheduledEventsList: list,
      selectedList: list,
    }))
  }

  updateEvent(scheduledEventsList: ScheduleModel) {

    const list = computed(() => this.state().scheduledEventsList)()
    const updatedList = list.filter(x => x.id !== scheduledEventsList.id)
    updatedList.push(scheduledEventsList)
    this.state.update((state) => ({
      ...state,
      scheduledEventsList: updatedList,
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
    const updatedList = list.filter(x => x.dateStart.getFullYear() === date.getFullYear()
      && x.dateStart.getMonth() === date.getMonth()
      && x.dateStart.getDate() === date.getDate())

    this.state.update((state) => ({
      ...state,
      selectedList: updatedList
    }))
  }
}
