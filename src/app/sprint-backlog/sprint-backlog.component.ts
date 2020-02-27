import { Component, OnInit } from '@angular/core';
import { SprintService } from '../services/sprint.service';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.scss']
})
export class SprintBacklogComponent implements OnInit {
  idProject = 1;
  listaPruebas = [
  //  {
  //   id: 1,
  //   description: 'prueba 1',
  //   approval: true
  // }, {
  //   id: 2,
  //   description: 'prueba 2',
  //   approval: false
  // }
  ];
  listaCriterios = [
  //   {
  //   id: 1,
  //   description: 'criterio 1',
  //   approval: true
  // }, {
  //   id: 2,
  //   description: 'criterio 2',
  //   approval: false
  // }
  ];
  selected = false;

  sprintStories = [];
  sprintStoriesToAdd = [];
  storiesList: any;
  seeAll = true;
  back = false;
  storySelected: any;
  constructor(public storiesService: SprintService) {
    this.getSprint();
   }


  ngOnInit() {

  }

  getSprint() {
    //verificar si el sprin ya tiene historias
  }

  getStories() {
    this.storiesService.getProjectStories(this.idProject).subscribe((res) => {
      console.log(res);
      this.storiesList = res;
      this.storiesList.map(story => story['added'] = false);
    });
  }

  edit() {
    console.log('edit');
  }

  addCriteria() {

  }

  addEvidence() {

  }

  addToSprint(story) {
    console.log("Agregar a Sprint");
    story['added'] = true;
   // this.sprintStories.push(story);
    this.sprintStoriesToAdd.push(story);
    console.log(this.sprintStoriesToAdd);
  }

  deleteFromSprint(story) {
    console.log("Eliminar del sprint", story);
    story['added'] = false;
    this.sprintStoriesToAdd.splice(this.sprintStoriesToAdd.indexOf(story), 1);
    console.log(this.sprintStoriesToAdd);

  }

  save() {
    //enviar historias del sprint al api
    //reload lista de historias
    //this.getSprint();
    this.sprintStories = this.sprintStoriesToAdd;

  }

  seeDetails(story) {
    this.seeAll = false;
    this.back = true;
    this.storySelected = story;
  }

  seeAllstories() {
    this.seeAll = true;
  }
}
