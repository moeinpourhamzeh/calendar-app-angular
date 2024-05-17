import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ScheduleModel} from "../../../../_models/schedule.model";
import {ScheduleService} from "../../../../_services/schedule.service";

@Component({
  selector: 'app-manage-schedule-dialogue',
  templateUrl: './manage-schedule-dialogue.component.html',
  styleUrl: './manage-schedule-dialogue.component.scss'
})
export class ManageScheduleDialogueComponent {

  scheduleService = inject(ScheduleService)
  scheduleForEdit!: ScheduleModel
  date: Date

  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    dateStart: ['00:00', [Validators.required]],
    dateEnd: ['01:00', [Validators.required]],
  });


  constructor(private dialogueRef: MatDialogRef<ManageScheduleDialogueComponent>,
              private formBuilder: UntypedFormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { date: Date, scheduleForEdit: ScheduleModel }) {
    this.date = new Date(data.date)
    this.scheduleForEdit = data.scheduleForEdit

    // Populate the form if data contains schedule data
    if (this.scheduleForEdit) {
      let timeStart = ((this.scheduleForEdit.dateStart.getHours()).toString().length < 2 ? '0' + this.scheduleForEdit.dateStart.getHours() : this.scheduleForEdit.dateStart.getHours()) + ':' +
        ((this.scheduleForEdit.dateStart.getMinutes()).toString().length < 2 ? '0' + this.scheduleForEdit.dateStart.getMinutes() : this.scheduleForEdit.dateStart.getMinutes())
      let timeEnd = ((this.scheduleForEdit.dateEnd.getHours()).toString().length < 2 ? '0' + this.scheduleForEdit.dateEnd.getHours() : this.scheduleForEdit.dateEnd.getHours()) + ':' +
        ((this.scheduleForEdit.dateEnd.getMinutes()).toString().length < 2 ? '0' + this.scheduleForEdit.dateEnd.getMinutes() : this.scheduleForEdit.dateEnd.getMinutes())

      this.form.patchValue({
        title: this.scheduleForEdit.title,
        dateStart: timeStart,
        dateEnd: timeEnd,
      })
    }
  }

  close() {
    this.dialogueRef.close()
  }

  deleteSchedule() {
    this.scheduleService.deleteEvent(this.scheduleForEdit.id)
    this.dialogueRef.close()
  }

  submit() {
    console.log(this.form.value.dateStart)
    let [startHour, startMinute] = this.form.value.dateStart.split(':')
    let [endHour, endMinute] = this.form.value.dateEnd.split(':')
    let dateStart = new Date(this.date)
    dateStart.setHours(startHour)
    dateStart.setMinutes(startMinute)
    let dateEnd = new Date(this.date)
    dateEnd.setHours(endHour)
    dateEnd.setMinutes(endMinute)
    let schedule = new ScheduleModel(this.form.value.title, dateStart, dateEnd)
    console.log(schedule)
    if (this.scheduleForEdit === undefined || this.scheduleForEdit === null) {
      this.scheduleService.addNewEvent(schedule)
    } else {
      schedule.setId(this.scheduleForEdit.id)
      this.scheduleService.updateEvent(schedule)
    }
    this.dialogueRef.close()
  }
}
