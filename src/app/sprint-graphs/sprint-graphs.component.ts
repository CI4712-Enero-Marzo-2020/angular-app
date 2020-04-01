import { Component, OnInit } from '@angular/core';
import { SprintService } from '../services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sprint-graphs',
  templateUrl: './sprint-graphs.component.html',
  styleUrls: ['./sprint-graphs.component.scss']
})
export class SprintGraphsComponent implements OnInit {
  sprints: any;

  idSprint: number;
  constructor(private sprintService: SprintService,
              public route: ActivatedRoute,
              public router: Router) {
    this.idSprint = parseInt(this.route.snapshot.paramMap.get('id'), 10);

   }

  ngOnInit() {
    this.getSprints();
  }

  getSprints() {
    this.sprintService.getSprintByProject(this.idSprint).subscribe(res => {
      console.log(res);
      this.sprints = res;
    });
  }

  burnUp(id) {
    this.router.navigate(['sprint/graphs/' + this.idSprint + '/burnUp', id] );

  }

  burnDown(id) {
    this.router.navigate(['sprint/graphs/' + this.idSprint + '/burnDown', id]);
  }

}
