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
  date: Date

  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    dateStart: [new Date(), [Validators.required]],
    dateEnd: [new Date, [Validators.required]],
  });


  constructor(private dialogueRef: MatDialogRef<ManageScheduleDialogueComponent>,
              private formBuilder: UntypedFormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { date: Date, scheduleForEdit: ScheduleModel }) {
    this.date = new Date(data.date)

    // Populate the form if data contains schedule data
    if (data.scheduleForEdit) {
      let timeStart = ((data.scheduleForEdit.dateStart.getHours()).toString().length < 2 ? '0' + data.scheduleForEdit.dateStart.getHours() : data.scheduleForEdit.dateStart.getHours()) + ':' +
        ((data.scheduleForEdit.dateStart.getMinutes()).toString().length < 2 ? '0' + data.scheduleForEdit.dateStart.getMinutes() : data.scheduleForEdit.dateStart.getMinutes())
      let timeEnd = ((data.scheduleForEdit.dateEnd.getHours()).toString().length < 2 ? '0' + data.scheduleForEdit.dateEnd.getHours() : data.scheduleForEdit.dateEnd.getHours()) + ':' +
        ((data.scheduleForEdit.dateEnd.getMinutes()).toString().length < 2 ? '0' + data.scheduleForEdit.dateEnd.getMinutes() : data.scheduleForEdit.dateEnd.getMinutes())

      this.form.patchValue({
        title: data.scheduleForEdit.title,
        dateStart: timeStart,
        dateEnd: timeEnd,
      })
    }
  }

  close() {
    this.dialogueRef.close()
  }

  submit() {
    let [startHour, startMinute] = this.form.value.dateStart.split(':')
    let [endHour, endMinute] = this.form.value.dateEnd.split(':')
    let dateStart = new Date(this.date)
    dateStart.setHours(startHour)
    dateStart.setMinutes(startMinute)
    let dateEnd = new Date(this.date)
    dateEnd.setHours(endHour)
    dateEnd.setMinutes(endMinute)
    let schedule = new ScheduleModel(this.form.value.title, dateStart, dateEnd)
    if (this.data.scheduleForEdit === undefined) {
      this.scheduleService.addNewEvent(schedule)
    } else {
      schedule.setId(this.data.scheduleForEdit.id)
      this.scheduleService.updateEvent(schedule)
    }
  }
}
