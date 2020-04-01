import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SprintService } from '../services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-sprint-burn-down',
  templateUrl: './sprint-burn-down.component.html',
  styleUrls: ['./sprint-burn-down.component.scss']
})
export class SprintBurnDownComponent implements OnInit {
  idProject: number;
  idSprint: number;
  sprint: any;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];
  constructor(private sprintService: SprintService,
              public route: ActivatedRoute,
              public router: Router) {
    this.idProject = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.idSprint = parseInt(this.route.snapshot.paramMap.get('idSprint'), 10);
    this.getSprint();


   }

  ngOnInit() {
  }

  getSprint() {
    this.sprintService.getSprintByProject(this.idProject).subscribe((response: any) => {
      this.sprint = response.filter((elem) => elem.id === this.idSprint);
      console.log(this.sprint);
    });
  }

}
