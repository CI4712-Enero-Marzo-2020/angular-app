import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprintService } from '../services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/users/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TasksComponent } from '../tasks/tasks.component';
import { DialogComponent } from '../logger/dialog/dialog.component';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.scss']
})
export class SprintDetailsComponent implements OnInit {
  idProject: number;
  idSprint: number;

  sprint = {  id: 0, user: {id: 0}, project_id: 0, end_date: '', init_date: ''};

  idUser = 0;
  idStory = 0;
  idTest = 0;
  idCriteria = 0;
  sprintForm: FormGroup;
  testForm: FormGroup;
  criteriaForm: FormGroup;
  editTestForm: FormGroup;
  editCriteriaForm: FormGroup;
  taskForm: FormGroup;

  testsList = [];
  criteriaList = [];
  selected = false;
  estimatedTime = 0;
  durationTime = 0;
  sprintStories = [];
  sprintTasks = [];
  sprintStoriesToAdd = [];
  storiesList = [];
  seeAll = true;
  back = false;
  storySelected: any;
  users = [{id: 1, name: 'jguzman'}, {id: 2, name: 'nairelyshz'}, {id: 3, name: 'jjjjj'}, {id: 4, name: 'kkkk'}];
  selectedUser = [];
  initDate = '';
  endDate = '';
  criteriaError = false;
  testError = false;
  constructor(public sprintService: SprintService,
              public route: ActivatedRoute,
              public router: Router,
              public authService: AuthService, private matDialog: MatDialog) {

    this.idSprint = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getSprint();
    if (authService.getCurrentUser()) {
      this.idUser = authService.getCurrentUser().userId;
    }
    this.formSprint();
    this.formCriteria();
    this.formTest();
    this.formCriteriaEdit();
    this.formTestEdit();
    this.formTask();
  }

  ngOnInit() {}
  /** informacion basica del sprint */
  getSprint() {
    this.sprintService.getSprintDetails(this.idSprint).subscribe((res: any) => {
      this.sprint = res[0];
      let dateObj = new Date(this.sprint.init_date);
      this.initDate = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
      dateObj = new Date(this.sprint.end_date);
      this.endDate = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
      this.getSprintStories();
      this.getTasks();
      this.calculateDuration();

    });
  }

  /** historias ligadas al sprint */
  getSprintStories() {
    this.sprintService.getSprintStories(this.sprint.id).subscribe((res: any) => {
      if (res.server) {
        this.sprintStories = [];
      } else {
        this.sprintStories = res;
      }
    });
  }

  formSprint() {
    this.sprintForm = new FormGroup({
    project_id : new FormControl(this.idProject),
    description: new FormControl(''),
    user_id: new FormControl(this.idUser)
    });
  }

  formTest() {
    this.testForm = new FormGroup({
    story_id : new FormControl(''),
    description: new FormControl(''),
    user_id: new FormControl(this.idUser)
    });
  }

  formTestEdit() {
    this.editTestForm = new FormGroup({
    story_id : new FormControl(''),
    description: new FormControl(''),
    user_id: new FormControl(this.idUser),
    approved: new FormControl()
    });
  }


  formCriteria() {
    this.criteriaForm = new FormGroup({
    story_id : new FormControl(''),
    description: new FormControl(''),
    user_id: new FormControl(this.idUser)
    });
  }

  formCriteriaEdit() {
    this.editCriteriaForm = new FormGroup({
    story_id : new FormControl(''),
    description: new FormControl(''),
    user_id: new FormControl(this.idUser),
    approved: new FormControl()

    });
  }

  formTask() {
    this.taskForm = new FormGroup({
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

  getStories() {
    this.storiesList = [];
    this.sprintService.getProjectStories(this.sprint.project_id).subscribe((res: any) => {
      res.map((story: any) => {
        const find = this.sprintStories.findIndex(i => i.id === story.id);
        if (find === -1) {
          story['added'] = false;
          this.storiesList.push(story);
        }
      });
    });
  }

  getTasks() {
    this.sprintService.getAllTasks(this.idSprint).subscribe((res: any) => {
      if (res.server) {
        this.sprintTasks = [];
      } else {
        this.sprintTasks = res;
        this.calculateTime();
        this.calculateFunctions();
      }

    });

  }

  calculateFunctions() {
    this.sprintTasks.map(task => {
      if (task.task_class === 'Sencilla') {
       task.task_functions = 1;
      } else if (task.task_class === 'Media') {
        task.task_functions = 3;
      } else if (task.task_class === 'Compleja') {
        task.task_functions = 5;
      }
    });
  }
  calculateTime() {
    let simples = 0;
    let medias = 0;
    let complex = 0;
    this.sprintTasks.map(task => {
      if (task.task_class === 'Sencilla') {
        simples += 1;
      } else if (task.task_class === 'Media') {
        medias += 1;
      } else if (task.task_class === 'Compleja') {
        complex += 1;
      }
    });

    this.estimatedTime = simples + (medias * 3) + (complex * 5);
  }

  editTest(test) {
    this.editTestForm.controls['approved'].setValue(test.approved);
    this.editTestForm.controls['description'].setValue(test.description);
    this.idTest = test.id;
  }

  editCriteria(criteria) {
    this.editCriteriaForm.controls['approved'].setValue(criteria.approved);
    this.editCriteriaForm.controls['description'].setValue(criteria.description);
    this.idCriteria = criteria.id;
  }


  sendEditedTest() {
    this.sprintService.editTestapi(this.idTest, this.editTestForm.value).subscribe((res: any) => {
      const index = this.testsList.findIndex(i => i.id === res.id);
      this.testsList[index] = res;
    });
  }

  sendEditedCriteria() {
    this.sprintService.editCriteria(this.idCriteria, this.editCriteriaForm.value).subscribe((res: any) => {
    const index = this.criteriaList.findIndex(i => i.id === res.id);
    this.criteriaList[index] = res;
    });
  }

  addCriteria() {
    this.sprintService.addCriteria(this.criteriaForm.value).subscribe(res => {

      this.criteriaList.push(res);

    },
    (error) => {
      if (error.status === 405) {
        this.criteriaError = true;
      }
    });
  }

  addTest() {
    this.sprintService.addTest(this.testForm.value).subscribe(res => {
      this.testsList.push(res);
    },
    (error) => {
      if (error.status === 405) {
        this.testError = true;
      }
    });
  }

  addToSprint(story) {
    story['added'] = true;
    this.sprintStoriesToAdd.push(story);
  }

  deleteFromSprint(story) {
    story['added'] = false;
    this.sprintStoriesToAdd.splice(this.sprintStoriesToAdd.indexOf(story), 1);
  }

  save() {
    this.sprintStories = this.sprintStoriesToAdd;
    this.sprintStories.map(story => {
      this.sprintService.addStory(this.idSprint, story.id).subscribe(res => {
        console.log(res);
      });
    });
  }

  seeDetails(story) {
    this.seeAll = false;
    this.back = true;
    this.storySelected = story;
    this.testForm.controls['user_id'].setValue(this.sprint.user.id);
    this.testForm.controls['story_id'].setValue(this.storySelected.id);
    this.criteriaForm.controls['user_id'].setValue(this.sprint.user.id);
    this.criteriaForm.controls['story_id'].setValue(this.storySelected.id);
    this.getCriterias();
    this.getTest();
  }

  getCriterias() {
    this.criteriaList = [];
    this.sprintService.getCriteriaByStory(this.storySelected.id).subscribe((res: any) => {
      if (res.length > 0) {
        this.criteriaList = res;
      }
    });
  }

  getTest() {
    this.testsList = [];
    this.sprintService.getTestByStory(this.storySelected.id).subscribe((res: any) => {
      if (res.length > 0) {
        this.testsList = res;
      }
    });
  }

  seeAllstories() {
    this.seeAll = true;
    this.back = false;
  }

  delete(type, id) {
    if (type === 1) {
      /** e liminar criterio */
      this.sprintService.deleteCriteria(id).subscribe((res: any) => {
        const find = this.criteriaList.findIndex(i => i.id === res.id);
        this.criteriaList.splice(find, 1);
      });
    } else if (type === 2) {
      /** eliminar prueba */
      this.sprintService.deleteTest(id).subscribe((res: any) => {
        const find = this.testsList.findIndex(i => i.id === res.id);
        this.testsList.splice(find, 1);
      });
    }
  }

  close() {
    this.sprintService.editSprint(this.sprint.id, {closed: true}).subscribe((res)=> {
      this.router.navigate(['projects']);
    });
  }

  createTask() {

    const modalDialog = this.matDialog.open(TasksComponent, {
      width: '65%',
      data: {
              title: 'Crear Tarea',
              operation: 1,
              idProject: this.idSprint,
              idUser: this.idUser
            }
    });
    modalDialog.afterClosed().subscribe(result => {
      console.log("!QLQ");
      this.getTasks();
    });
  }

  editTask(task) {
    const modalDialog = this.matDialog.open(TasksComponent, {
      width: '65%',
      data: {
              title: 'Editar Tarea',
              operation: 2,
              idProject: this.idSprint,
              idUser: this.idUser,
              task: {task}
            }
    });
    modalDialog.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }

  calculateDuration() {
    const fechaInicio = new Date(this.sprint.init_date).getTime();
    const fechaFin    = new Date(this.sprint.end_date).getTime();
    const diff = fechaFin - fechaInicio;
    this.durationTime = parseInt((diff / (1000 * 60 * 60 * 24)).toString(), 10) + 1;
  }

  openDialog(idtask) {

    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '60%',
      height: '30%',
      data: {operation: 'delete',
              type: 3,
              title: 'Eliminar',
              message: 'Estás seguro que desear eliminar esta tarea?',
              id: idtask,
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(idtask);
        this.getTasks();
      }
    });
  }

  public deleteTask(id) {
    this.sprintService.deleteTask(id).subscribe((res) => {
      this.getTasks();
    });
  }

}
