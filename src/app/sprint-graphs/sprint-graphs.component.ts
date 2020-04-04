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
  sprints: any = [];

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
    this.sprintService.getSprintByProject(this.idProject).subscribe((res: any) => {
      res.forEach(sp => {
        sp['developers'] = [];
        sp['object'] = 0;
        sp['storiesAccount'] = 0;
        this.sprints.push(sp);

      });
      this.getStoriesAccount();
    });
  }

  getStoriesAccount() {
    this.sprints.forEach(sp => {
      this.sprintService.getSprintStories(sp.id).subscribe((res: any) => {
        sp['storiesAccount'] = 0;
        if(res.length > 0) {
          sp['storiesAccount'] = res.length;
        }
        sp['duration'] = this.calculateDuration(sp.init_date, sp.end_date);
        if (res.length > 0) {
          let total = 0;
          res.forEach(e => {
            total += e.estimation;
          });
          sp['object'] = total;
        } else {
          sp['object'] = 0;
        }
      });
    });
    this.getTasksEstimation();
  }

  getTasksEstimation() {
    this.sprints.forEach(s => {
      this.sprintService.getAllTasks(s.id).subscribe((res: any) => {
        s['developers'] = [];
        if (res.length > 0) {
          res.forEach(task => {
            task.users.forEach(user => {
              if ( !s.developers.includes(user)) {
                s.developers.push(user);
              }
            });
          });
        }
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
