import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SprintService } from '../services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDayComponent } from '../add-day/add-day.component';
import { MatDialog } from '@angular/material';
import { duration } from 'moment';
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
  message = '';

  barChartData: ChartDataSets[] = [];
  days = [];
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
    this.sprintService.getSprintByProject(this.idProject).subscribe(async (response: any) => {
      this.sprint = await response.filter((elem) => elem.id === this.idSprint)[0];
      this.sprint['duration'] = this.calculateDuration(this.sprint.init_date, this.sprint.end_date);
      this.getDays();
    });
  }

  getDays() {
    this.days = [];
    this.sprintService.getDaysBurnDown(this.sprint.id).subscribe((res: any) => {
      if (res.length > 0) {
        this.days = res;
      }
      this.getDaysBySprint();
    });
  }
  addDay() {
    console.log(this.days.length);
    if(this.days.length < this.sprint.duration){
      const modalDialog = this.matDialog.open(AddDayComponent, {
        width: '65%',
        data: {
                title: 'Añadir Día',
                operation: 1,
                type: 'down',
                idSprint: this.sprint.id,
                dia: this.days.length + 1
                // idUser: this.idUser
              }
      });
      modalDialog.afterClosed().subscribe(result => {
        this.getDays();
      });
    } else {
      alert("Ha alcanzado el limite de dias");
    }

  }

  editDay(day) {
    const modalDialog = this.matDialog.open(AddDayComponent, {
      width: '65%',
      data: {
              title: 'Editar Dia',
              operation: 2,
              type: 'down',
              idSprint: this.sprint.id,
              dayData: day
              // idUser: this.idUser
            }
    });
    modalDialog.afterClosed().subscribe(result => {
      this.getDays();
    });
  }

  deleteDay(day) {
    if (this.isLast(day.id)) {
      this.sprintService.deleteDayBurnDown(day.id).subscribe((res)=>{
        this.message = 'Dia eliminado';
        this.getDays();
      });
    } else {
      alert("Debe eliminar los dias mas recientes primero");
    }
  }

  isLast(id) {
    console.log("qlq");
    const index = this.days.length - 1;
    const lastElement = this.days[index];
    if (id === lastElement.id) {
      return true;
    }
    return false;
  }

  getDaysBySprint() {
    let count = 1;
    this.barChartData = [];
    this.barChartLabels = [];
    const valuesWork = [];
    const valuesAvailable = [];
    this.days.forEach(element => {
      this.barChartLabels.push((count++).toString());
      valuesWork.push(element.trabajo);
      valuesAvailable.push(element.disponible);

    });
    this.barChartData.push({ data: valuesAvailable, fill: false, backgroundColor: '#e53935',
                             label: 'Horas disponibles', type: 'line' },
                             { data: valuesWork, label: 'Horas trabajadas', backgroundColor: '#9c27b0' });
  }

  calculateDuration(init, end) {
    const fechaInicio = new Date(init).getTime();
    const fechaFin    = new Date(end).getTime();

    const diff = fechaFin - fechaInicio;
    return parseInt((diff / (1000 * 60 * 60 * 24)).toString(), 10) + 1;
  }

}
