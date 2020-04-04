import { Component, OnInit, Inject } from '@angular/core';
import { SprintService } from '../services/sprint/sprint.service';
import { UsersService } from '../services/users/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogTaskData } from '../tasks/tasks.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export interface DialogDayData {
  title: string;
  operation: number;
  idSprint: number;
  duration: number;
  daysAccount: number;
  type: string;
}
@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.component.html',
  styleUrls: ['./add-day.component.scss']
})
export class AddDayComponent implements OnInit {
  dayForm: FormGroup;
  idSprint: number;
  constructor(private sprintService: SprintService,
              private userService: UsersService,
              public dialogRef: MatDialogRef<AddDayComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogDayData) {
                this.idSprint = data.idSprint;
                this.formDay();
              }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formDay() {
    this.dayForm = new FormGroup({
      id: new FormControl(''),
      description : new FormControl(''),
      sprint_id: new FormControl(this.idSprint),
      task_type: new FormControl(''),
      task_class: new FormControl(''),
      task_status: new FormControl(''),
      users: new FormControl([], Validators.required),
      task_functions: new FormControl(),
        worstCase: new FormControl(),
        mostLikely: new FormControl(),
        bestCase: new FormControl(),
      est_time: new FormControl()
    });
  }

  onSubmit() {
    if (this.data.operation === 1) {

    } else if (this.data.operation === 2) {

    }
  }



}
