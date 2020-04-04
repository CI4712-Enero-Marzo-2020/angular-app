import { Component, OnInit } from '@angular/core';
import { SprintService } from '../services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-sprint-graphs',
  templateUrl: './sprint-graphs.component.html',
  styleUrls: ['./sprint-graphs.component.scss']
})
export class SprintGraphsComponent implements OnInit {
  sprints: any;

  idProject: number;
  constructor(private sprintService: SprintService,
              public route: ActivatedRoute,
              public router: Router) {
    this.idProject = parseInt(this.route.snapshot.paramMap.get('id'), 10);

   }

  ngOnInit() {
    this.getSprints();
  }

  getSprints() {
    this.sprintService.getSprintByProject(this.idProject).subscribe(res => {
      console.log(res);
      this.sprints = res;
      this.getStoriesAccount();
    });
  }

  getStoriesAccount() {
    this.sprints.forEach(element => {
      this.sprintService.getSprintStories(element.id).subscribe((res: any) => {
        element['storiesAccount'] = res.length;
        element['duration'] = this.calculateDuration(element.init_date, element.end_date);
      });
    });
    this.getTasksEstimation();
  }

  getTasksEstimation() {
    this.sprints.forEach(element => {
      this.sprintService.getAllTasks(element.id).subscribe((res: any) => {
        let total = 0;
        res.forEach(task => {
          total += task.est_time;
        });
        element['object'] = total;
      });
    });
  }

  calculateDuration(init, end) {
    const fechaInicio = new Date(init).getTime();
    const fechaFin    = new Date(end).getTime();

    const diff = fechaFin - fechaInicio;
    return parseInt((diff / (1000 * 60 * 60 * 24)).toString(), 10) + 1;
  }

  burnUp(id) {
    this.router.navigate(['sprint/graphs/' + this.idProject + '/burnUp', id] );

  }

  burnDown(id) {
    this.router.navigate(['sprint/graphs/' + this.idProject + '/burnDown', id]);
  }

}
