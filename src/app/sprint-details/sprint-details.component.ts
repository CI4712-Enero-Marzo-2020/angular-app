import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SprintService } from '../services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  testsList = [];
  criteriaList = [];
  selected = false;

  sprintStories = [];
  sprintTasks = [];
  sprintStoriesToAdd = [];
  storiesList = [];
  seeAll = true;
  back = false;
  storySelected: any;
  constructor(public sprintService: SprintService,
              public route: ActivatedRoute,
              public router: Router) {

    this.idSprint = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getSprint();
    this.formSprint();
    this.formCriteria();
    this.formTest();
    this.formCriteriaEdit();
    this.formTestEdit();
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


}
