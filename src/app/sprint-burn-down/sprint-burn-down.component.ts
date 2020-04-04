import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SprintService } from '../services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDayComponent } from '../add-day/add-day.component';
import { MatDialog } from '@angular/material';
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
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [];
  days = [{id:1,day:1,worked:276,available:3},
    {id:2,day:2,worked:250,available:7},
    {id:2,day:3,worked:220,available:10},
    {id:2,day:3,worked:220,available:10},
    {id:2,day:3,worked:220,available:10},
    {id:2,day:3,worked:220,available:10},
    {id:2,day:3,worked:220,available:10},
    {id:2,day:3,worked:220,available:10},
    {id:2,day:3,worked:220,available:10},]
  constructor(private sprintService: SprintService,
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
              title: 'Crear Tarea',
              operation: 1,
              idProject: this.sprint.id,
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
              idProject: this.sprint.id,
              // idUser: this.idUser
            }
    });
    modalDialog.afterClosed().subscribe(result => {
      this.getDaysBySprint();
    });
  }

  getDaysBySprint() {
    let count = 1;
    let values = [];
    this.days.forEach(element => {
      this.barChartLabels.push((count++).toString());
      values.push(element.worked);

    });
    this.barChartData.push({ data: values, label: 'Burn Down' });
  }

}
