import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprintService } from '../services/sprint/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../services/users/users.service';
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
  users = [];
  allUsers = [];
  selectedUser = [];
  taskForm: FormGroup;


  constructor(private sprintService: SprintService,
              private userService: UsersService,
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
    if (this.data.operation === 1) {
      this.taskForm.controls['task_type'].setValue('develop');
      this.taskForm.controls['task_class'].setValue('easy');
      this.taskForm.controls['task_status'].setValue('init');
      this.taskForm.controls['task_functions'].setValue(1);
    } else if (this.data.operation === 2) {
      this.taskForm.controls['id'].setValue(this.data.task.task.id);
      this.taskForm.controls['description'].setValue(this.data.task.task.description);
      this.setType();
      this.setClass();
      this.setStatus();
      this.taskForm.controls['task_functions'].setValue(this.data.task.task.task_functions);
      this.taskForm.controls['users'].setValue(this.data.task.task.users);
      this.taskForm.controls['bestCase'].setValue(this.data.task.task.bestCase);
      this.taskForm.controls['worstCase'].setValue(this.data.task.task.worstCase);
      this.taskForm.controls['mostLikely'].setValue(this.data.task.task.mostLikely);
      this.taskForm.controls['est_time'].setValue(this.data.task.task.est_time);
      this.taskForm.controls['users'].setValue(this.data.task.task.users);

    }
    this.getUsers();
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
      task_functions: new FormControl(),
        worstCase: new FormControl(),
        mostLikely: new FormControl(),
        bestCase: new FormControl(),
      est_time: new FormControl()
    });
  }

  onSubmit() {
    this.calculateEstimation();
    if (this.data.operation === 1) {
      this.sprintService.createTask(this.taskForm.value).subscribe(res => {
        this.onNoClick();

      });
    } else {
      this.sprintService.editTask(this.taskForm.value.id, this.taskForm.value).subscribe(res => {
        this.onNoClick();

      });
    }
  }

  selectClass() {
    if (this.taskForm.value.task_class === 'Sencilla') {
      this.taskForm.controls['task_functions'].setValue(1);

    } else if (this.taskForm.value.task_class === 'Media') {
      this.taskForm.controls['task_functions'].setValue(3);

    } else if (this.taskForm.value.task_class === 'Compleja') {
      this.taskForm.controls['task_functions'].setValue(5);

    }
  }

  setType() {
    if (this.data.task.task.task_type === 'Desarrollo') {
      this.taskForm.controls['task_type'].setValue('develop');
    } else if (this.data.task.task.task_type === 'Diseño') {
      this.taskForm.controls['task_type'].setValue('design');
    } else if (this.data.task.task.task_type === 'Reparar') {
      this.taskForm.controls['task_type'].setValue('fix');
    } else if (this.data.task.task.task_type === 'Refactor') {
      this.taskForm.controls['task_type'].setValue('refact');
    }

  }

  setStatus() {
    if (this.data.task.task.task_status === 'Nueva') {
      this.taskForm.controls['task_status'].setValue('new');
    } else if (this.data.task.task.task_status === 'Iniciada') {
      this.taskForm.controls['task_status'].setValue('init');
    } else if (this.data.task.task.task_status === 'Lista para Pruebas') {
      this.taskForm.controls['task_status'].setValue('to_test');
    } else if (this.data.task.task.task_status === 'Culminada') {
      this.taskForm.controls['task_status'].setValue('ended');
    }
  }

  setClass() {
    if (this.data.task.task.task_class === 'Sencilla') {
      this.taskForm.controls['task_class'].setValue('easy');
    } else if (this.data.task.task.task_class === 'Media') {
      this.taskForm.controls['task_class'].setValue('middle');
    } else if (this.data.task.task.task_class === 'Compleja') {
      this.taskForm.controls['task_class'].setValue('hard');
    }
  }

  calculateEstimation() {
    let e = this.taskForm.value.worstCase + (4 * this.taskForm.value.mostLikely) + this.taskForm.value.bestCase;
    e = e / 6;
    let sd = this.taskForm.value.worstCase - this.taskForm.value.bestCase;
    sd = Math.round(e + sd);
    this.taskForm.controls['est_time'].setValue(sd);
  }

  getUsers() {
    this.userService.getAll().subscribe((res: any) => {
      this.allUsers = res;
    });
  }


}
