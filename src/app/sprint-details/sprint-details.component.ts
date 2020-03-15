import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprintService } from '../services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/users/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.scss']
})
export class SprintDetailsComponent implements OnInit {
  idProject: number;
  idSprint: number;

  sprint = {  id: 0, user: {id: 0}, project_id: 0};

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

  sprintStories = [];
  sprintTasks = [{ id: 1, description:"nueva tarea"}, { id: 2, description:"nueva tarea"}];
  sprintStoriesToAdd = [];
  storiesList = [];
  seeAll = true;
  back = false;
  storySelected: any;
  users = [{id: 1, name: 'nairelyshz'}, {id: 2, name: 'jguzman'}, {id: 3, name: 'jjjjj'}, {id: 4, name: 'kkkk'}];
  selectedUser = [];
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
    this.sprintService.getSprintDetails(this.idSprint).subscribe(res => {
      this.sprint = res[0];
      this.getSprintStories();
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
      if(res === []) {
        console.log("permiso denegado");
      } else {
        this.criteriaList.push(res);
      }
    });
  }

  addTest() {
    this.sprintService.addTest(this.testForm.value).subscribe(res => {
      this.testsList.push(res);
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
  }



}
