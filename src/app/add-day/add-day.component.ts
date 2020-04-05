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
  dayData: any;
  dia: number;
}
@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.component.html',
  styleUrls: ['./add-day.component.scss']
})
export class AddDayComponent implements OnInit {
  dayForm: FormGroup;
  idSprint: number;
  day: any;
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
      sprint_id: new FormControl(this.idSprint),
      dia: new FormControl(this.data.dia),
      realizados: new FormControl(0),
      estimados: new FormControl(0),
      necesarios: new FormControl(0),
      trabajo: new FormControl(0),
      disponible: new FormControl(0)
    });
    if (this.data.operation === 2) {

      this.fillForm();
    }
  }

  fillForm() {
    if (this.data.type === 'up') {
      this.dayForm.controls['id'].setValue(this.data.dayData.id);
      this.dayForm.controls['dia'].setValue(this.data.dayData.dia);
      this.dayForm.controls['realizados'].setValue(this.data.dayData.realizados);
      this.dayForm.controls['estimados'].setValue(this.data.dayData.estimados);
      this.dayForm.controls['necesarios'].setValue(this.data.dayData.necesarios);
    } else {

      this.dayForm.controls['id'].setValue(this.data.dayData.id);
      this.dayForm.controls['dia'].setValue(this.data.dayData.dia);
      this.dayForm.controls['trabajo'].setValue(this.data.dayData.trabajo);
      this.dayForm.controls['disponible'].setValue(this.data.dayData.disponible);
    }
  }

  onSubmit() {

    if (this.data.operation === 1) {
      if (this.data.type === 'up'){

          this.sprintService.addDayToBurnUp(this.dayForm.value).subscribe(() => {
            this.onNoClick();
          });

      } else {
        this.sprintService.addDayToBurnDown(this.dayForm.value).subscribe(() => {
          this.onNoClick();
        });
      }
    } else if (this.data.operation === 2) {
      if (this.data.type === 'up') {
        this.sprintService.editDayToBurnUp(this.dayForm.value.id, this.dayForm.value).subscribe(() => {
          this.onNoClick();
        });

      } else {
        this.sprintService.editDayToBurnDown(this.dayForm.value.id, this.dayForm.value).subscribe(() => {
          this.onNoClick();
        });
      }
    }
  }



}
