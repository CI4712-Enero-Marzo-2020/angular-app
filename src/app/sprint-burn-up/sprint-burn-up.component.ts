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
  message = '';

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [];

  days = [];
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
      this.sprint = response.filter((elem) => elem.id === this.idSprint)[0];
      console.log(this.sprint);
      this.sprint['duration'] = this.calculateDuration(this.sprint.init_date, this.sprint.end_date);
      this.getDays();
    });
  }
  getDays() {
    this.days = [];
    this.sprintService.getDaysBurnUp(this.sprint.id).subscribe((res: any) => {
      if (res.length > 0) {
        this.days = res;

        this.getDaysBySprint();
      }
    });
  }
  addDay() {
    if (this.days.length < this.sprint.duration){
      const modalDialog = this.matDialog.open(AddDayComponent, {
        width: '65%',
        data: {
                title: 'Agregar Dia',
                operation: 1,
                type: 'up',
                idSprint: this.sprint.id,
                dia: this.days.length + 1
                // idUser: this.idUser
              }
      });
      modalDialog.afterClosed().subscribe(result => {
        this.getDays();
      });
    } else {
      alert ("Ha alcanzado el limite de dias");
    }

  }

  editDay(day) {
    const modalDialog = this.matDialog.open(AddDayComponent, {
      width: '65%',
      data: {
              title: 'Editar Dia',
              operation: 2,
              type: 'up',
              idSprint: this.sprint.id,
              dayData: day
              // idUser: this.idUser
            }
    });
    modalDialog.afterClosed().subscribe(result => {
      this.getDays();
    });
  }

  getDaysBySprint() {
    console.log(this.days);
    let count = 1;
    let valuesDone = [];
    let valuesEstimated = [];
    let valuesNeeded = [];
    this.barChartLabels =[];
    this.barChartData = [];
    this.days.forEach(element => {
      this.barChartLabels.push((count++).toString());
      valuesDone.push(element.realizados);
      valuesEstimated.push(element.estimados);
      valuesNeeded.push(element.necesarios);

    });

    this.barChartData.push(
                          { data: valuesNeeded, type: 'line', fill: false, label: 'Necesitadas', backgroundColor: '#e53935'},
                          { data: valuesEstimated, type: 'line', fill: false, label: 'Estimadas', backgroundColor: 'rgba(0,188,212,.4)'},
                          { data: valuesDone, label: 'Realizadas', backgroundColor: '#9c27b0' });
  }

  deleteDay(day) {
    if(this.isLast(day.id)){
      this.sprintService.deleteDayBurnUp(day.id).subscribe((res) => {
        this.message ="Dia eliminado";
        this.getDays();
      });
    } else {

      alert("Debe eliminar los dias mas recientes primero");
    }
  }

  isLast(id) {
    const index = this.days.length - 1;
    const lastElement = this.days[index];
    if (id === lastElement.id) {
      return true;
    }
    return false;
  }

  calculateDuration(init, end) {
    const fechaInicio = new Date(init).getTime();
    const fechaFin    = new Date(end).getTime();

    const diff = fechaFin - fechaInicio;
    return parseInt((diff / (1000 * 60 * 60 * 24)).toString(), 10) + 1;
  }
}
