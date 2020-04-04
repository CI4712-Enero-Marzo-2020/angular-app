import { Component, OnInit } from '@angular/core';
import { SprintService } from '../services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddDayComponent } from '../add-day/add-day.component';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-sprint-burn-up',
  templateUrl: './sprint-burn-up.component.html',
  styleUrls: ['./sprint-burn-up.component.scss']
})
export class SprintBurnUpComponent implements OnInit {
  idProject: number;
  idSprint: number;
  sprint: any;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [];

  days = [{id:1,day:1,done:1,estimated:3,needed:4},
    {id:2,day:2,done:5,estimated:7,needed:9},
    {id:2,day:3,done:7,estimated:10,needed:13}]
  constructor(public sprintService: SprintService,
              public route: ActivatedRoute,
              public router: Router, private matDialog: MatDialog) {
    this.idProject = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.idSprint = parseInt(this.route.snapshot.paramMap.get('idSprint'), 10);
    this.getSprint();
    this.getDaysBySprint();

  }

  ngOnInit() {
  }

  getSprint() {
    this.sprintService.getSprintByProject(this.idProject).subscribe((response: any) => {
      this.sprint = response.filter((elem) => elem.id === this.idSprint);
      console.log(this.sprint);
    });
  }

  addDay() {
    const modalDialog = this.matDialog.open(AddDayComponent, {
      width: '65%',
      data: {
              title: 'Agregar Dia',
              operation: 1,
              type: 'up',
              idSprint: this.sprint.id,
              // idUser: this.idUser
            }
    });
    modalDialog.afterClosed().subscribe(result => {
      this.getDaysBySprint();
    });
  }

  editDay() {
    const modalDialog = this.matDialog.open(AddDayComponent, {
      width: '65%',
      data: {
              title: 'Editar Dia',
              operation: 2,
              type: 'up',
              idSprint: this.sprint.id,
              // idUser: this.idUser
            }
    });
    modalDialog.afterClosed().subscribe(result => {
      this.getDaysBySprint();
    });
  }

  getDaysBySprint() {
    let count = 1;
    let valuesDone = [];
    let valuesEstimated = [];
    let valuesNeeded = [];
    this.barChartLabels =[];
    this.barChartData = [];
    this.days.forEach(element => {
      this.barChartLabels.push((count++).toString());
      valuesDone.push(element.done);
      valuesEstimated.push(element.estimated);
      valuesNeeded.push(element.needed);

    });

    this.barChartData.push({data:valuesNeeded, type:'line', label:'Necesitadas'},
                          {data:valuesEstimated, type:'line', label:'Estimadas'},
                          { data: valuesDone, label: 'Burn Up' });
  }

  deleteDay() {

  }
}
