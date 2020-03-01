import { Component, OnInit } from '@angular/core';
import { SprintService } from '../services/sprint/sprint.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

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
  sprintForm: FormGroup;
  testForm: FormGroup;
  criteriaForm: FormGroup;
  editTestForm: FormGroup;
  editCriteriaForm: FormGroup;

  testsList = [];
  criteriaList = [];
  selected = false;

  sprintStories = [];
  sprintStoriesToAdd = [];
  storiesList: any;
  seeAll = true;
  back = false;
  storySelected: any;
  constructor(public sprintService: SprintService,
              public route: ActivatedRoute,
              public router: Router) {

    this.idProject = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getSprint();
    this.route.queryParams.subscribe(res => {
      this.idUser = parseInt(res.user_id, 10);
    });
    this.formSprint();
    this.formCriteria();
    this.formTest();
    this.formCriteriaEdit();
    this.formTestEdit();
  }


  ngOnInit() {

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

  onSubmit() {
    this.sprintService.createSprint(this.sprintForm.value).subscribe((res: any) => {
      console.log(res.id);
      this.idSprint = res.id;
    });
  }

  createSprint() {
    console.log();
  }

  getSprint() {
    //verificar si el sprin ya tiene historias
    this.sprintService.getSprintByProject(this.idProject).subscribe(res => {
      console.log(res);

    });
  }

  getStories() {
    this.sprintService.getProjectStories(this.idProject).subscribe((res) => {
      console.log(res);
      this.storiesList = res;
      this.storiesList.map(story => story['added'] = false);
    });
  }

  editTest(test) {
    this.editTestForm.controls['approved'].setValue(test.approved);
    this.editTestForm.controls['description'].setValue(test.description);
    this.idTest = test.id;
  }

  editCriteria(criteria) {
    this.editCriteriaForm.controls['approved'].setValue(criteria.approved);
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

  }

  seeAllstories() {

    this.seeAll = true;
  }

  delete(type) {
    if(type === 1) {
      /** e liminar criterio */

    } else if (type === 2) {
      /** eliminar prueba */

    }
  }


}
