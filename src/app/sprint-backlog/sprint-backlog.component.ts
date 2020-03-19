import { Component, OnInit } from '@angular/core';
import { SprintService } from '../services/sprint/sprint.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { element } from 'protractor';
import { MatDialog } from '@angular/material';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.scss']
})
export class SprintBacklogComponent implements OnInit {
  idProject: number;
  idUser: number;
  idSprint = 0;
  idStory = 0;
  idTest = 0;
  idCriteria = 0;
  estimatedTime = 0;
  durationTime = 0;
  initDate = '';
  endDate = '';
  currentDate = '';
  currentHour = '';
  dateFormat = '';
  sprintForm: FormGroup;
  testForm: FormGroup;
  criteriaForm: FormGroup;
  editTestForm: FormGroup;
  editCriteriaForm: FormGroup;

  testsList = [];
  criteriaList = [];
  sprintStories = [];
  sprintStoriesToAdd = [];
  storiesList = [];

  selected = false;
  seeAll = true;
  back = false;
  storySelected: any;
  sprintTasks = [
    { id: 1,
      description:"nueva tarea",
      task_class: "Sencilla",
      task_functions: 1
    },
    { id: 2,
      description:"nueva tarea",
      task_class: "Media",
      task_functions: 3
    },
    { id: 3,
      description:"nueva tarea",
      task_class: "Compleja",
      task_functions: 5
    },
    { id: 4,
      description:"nueva tarea",
      task_class: "Media",
      task_functions: 3}];

  constructor(public sprintService: SprintService,
              public route: ActivatedRoute,
              public router: Router,
              private matDialog: MatDialog) {

    this.idProject = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.route.queryParams.subscribe(res => {
      this.idUser = parseInt(res.user_id, 10);
    });
    this.formSprint();
    this.formCriteria();
    this.formTest();
    this.formCriteriaEdit();
    this.formTestEdit();
    this.getTasks();

  }


  ngOnInit() {

  }



  formSprint() {
    this.getCurrentDate();
    this.sprintForm = new FormGroup({
      project_id : new FormControl(this.idProject),
      description: new FormControl(''),
      init_date: new FormControl(this.dateFormat),
      end_date: new FormControl(''),
      user_id: new FormControl(this.idUser)
    });
  }

  getCurrentDate() {
    const dateObj = new Date();
    let today = dateObj.getDate().toString() ;
    let mounth = (dateObj.getMonth() + 1).toString() ;
    let hour = '';
    let minutes = '';
    let miliseg = '';

    if (dateObj.getDate() <= 9) {
      today = '0' + today.toString();
    }
    if ((dateObj.getMonth() + 1) <= 9) {
      mounth = '0' + mounth.toString();
    }
    if (dateObj.getHours() <= 9) {
      hour = '0' + dateObj.getHours().toString();
    } else {
      hour = dateObj.getHours().toString();
    }
    if (dateObj.getMinutes() <= 9) {
      minutes = '0' + dateObj.getMinutes().toString();
    } else {
      minutes = dateObj.getMinutes().toString();
    }
    if (dateObj.getSeconds() <= 9) {
      miliseg = '0' + dateObj.getSeconds().toString();
    } else {
      miliseg = dateObj.getSeconds().toString();
    }
    this.dateFormat = today + '/' + mounth + '/' + dateObj.getFullYear();
    this.currentDate = dateObj.getFullYear() + '-' + mounth + '-' + today;
    this.currentHour = hour + ':' + minutes + ':' + miliseg;
    return this.dateFormat + ' ' + this.currentHour;
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

  onSubmit() {
    const jsonSprint = this.sprintForm.value;
    jsonSprint.init_date = this.getCurrentDate();
    const endDateFormat = jsonSprint.end_date.split("-");
    jsonSprint.end_date = '';
    jsonSprint.end_date = endDateFormat[2] + "/" + endDateFormat[1] + "/" + endDateFormat[0];
    console.log( jsonSprint);

    this.sprintService.createSprint(jsonSprint).subscribe((res: any) => {
      this.idSprint = res.id;
    });
  }


  getStories() {
    this.storiesList = [];
    this.sprintService.getProjectStories(this.idProject).subscribe((res: any) => {

      res.map((story: any) => {
        const find = this.sprintStories.findIndex(i => i.id === story.id);
        console.log(find, '*---',story);
        if (find === -1) {
          story['added'] = false;
          this.storiesList.push(story);
        }
      });

    });
  }

  getTasks() {
    this.calculateTime();
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
      if (res === []) {
        console.log("permiso denegado");
      } else {
        this.criteriaList.push(res);
      }
    });
  }

  addTest() {
    console.log(this.testForm.value);
    this.sprintService.addTest(this.testForm.value).subscribe(res => {
      console.log(res);
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
    this.testForm.controls['user_id'].setValue(this.idUser);
    this.testForm.controls['story_id'].setValue(this.storySelected.id);
    this.criteriaForm.controls['user_id'].setValue(this.idUser);
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
    if(type === 1) {
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

  createTask() {
    const modalDialog = this.matDialog.open(TasksComponent, {
      width: '65%',
      data: {
              title: 'Crear Tarea',
              operation: 1,
              id: 1,
            }
    });
    modalDialog.afterClosed().subscribe(result => {
      this.calculateTime();
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

  calculateDuration() {
    console.log(this.initDate, this.endDate);
    const fechaInicio = new Date(this.initDate).getTime();
    const fechaFin    = new Date(this.endDate).getTime();

    const diff = fechaFin - fechaInicio;
    this.durationTime = diff/ (1000 * 60 * 60 * 24);
    console.log("dias", this.durationTime );
  }



}
