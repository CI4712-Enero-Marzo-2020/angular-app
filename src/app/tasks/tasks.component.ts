import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprintService } from '../services/sprint/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogTaskData {
  title: string;
  operation: number;
  idProject: number;
  idUser: number;
  task: any;
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  idSprint = 0;
  idUser = 0;
  storySelected: any;
  users = [{id: 1, name: 'nairelyshz'}, {id: 2, name: 'jguzman'}, {id: 3, name: 'jjjjj'}, {id: 4, name: 'kkkk'}];
  selectedUser = [];
  taskForm: FormGroup;

  constructor(private sprintService: SprintService,
              public dialogRef: MatDialogRef<TasksComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogTaskData) {
                this.idSprint = data.idProject;
                this.idUser = data.idUser;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.formTask();
    if (this.data.operation === 2) {
      this.taskForm.controls['id'].setValue(this.data.task.task.id);
      this.taskForm.controls['description'].setValue(this.data.task.task.description);
      this.taskForm.controls['task_type'].setValue(this.data.task.task.task_type);
      this.taskForm.controls['task_class'].setValue(this.data.task.task.task_class);
      this.taskForm.controls['task_status'].setValue(this.data.task.task.task_status);
      this.taskForm.controls['task_functions'].setValue(this.data.task.task.task_functions);
      this.taskForm.controls['users'].setValue(this.data.task.task.users);
    }
  }

  formTask() {
    this.taskForm = new FormGroup({
      id: new FormControl(''),
      description : new FormControl(''),
      sprint_id: new FormControl(this.idSprint),
      task_type: new FormControl(''),
      task_class: new FormControl(''),
      task_status: new FormControl(''),
      user_id: new FormControl(this.idUser),
      users: new FormControl([], Validators.required),
      task_functions: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.taskForm.value, this.selectedUser);
    if (this.data.operation === 1) {
      this.sprintService.createTask(this.taskForm.value).subscribe(res => {
        console.log("TASK crear", res);
      });
    } else {
      this.sprintService.editTask(this.taskForm.value.id, this.taskForm.value).subscribe(res => {
        console.log("TASK editar", res);
      });
    }
    this.onNoClick();
  }

}
