import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger/logger.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {
  logger: any;
  loggerCopy: any;
  id: any;
  constructor(public loggerService: LoggerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getLogger();
  }

  getLogger() {
    this.loggerService.getAll().subscribe((res) => {
      this.logger = res;
      this.logger.forEach(element => {
        const dateObj = new Date(Date.parse(element.date));
        const date = dateObj.getDate() + '/' + dateObj.getMonth() + '/' + dateObj.getFullYear();
        const hour = dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
        element['date'] = date;
        element['hour'] = hour;
      });
      this.loggerCopy = this.logger;
    });
  }

  openDialog(idlog) {
    this.id = idlog;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '60%',
      height: '30%',
      data: {operation: 'delete',
              title: 'Eliminar',
              message: 'Estás seguro que desear eliminar este registro?',
              id: idlog,
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      const animal = result;
      if (result) {
        this.delete();
      }
    });
  }

  delete() {
    this.loggerService.deleteLog(this.id).subscribe(res => {
      this.logger.forEach(element => {
        if (element.id === this.id) {
          this.logger.splice(this.logger.indexOf(element), 1);
        }
      });
    });
  }

  idFilter(idlog) {
    console.log(idlog.value, this.logger);
    if(idlog != '') {
      this.logger = this.logger.filter(log => log.id === idlog.value);
    }else {
      this.logger = this.loggerCopy;
    }
  }

  userFilter(user) {
    this.logger = this.logger.filter(log => log.user === user);
  }

  eventFilter(event) {
    this.logger = this.logger.filter(log => log.event === event);

  }

  moduleFilter(moduleLog) {
    this.logger = this.logger.filter(log => log.loged_module === moduleLog);

  }

  dateFilter(date) {
    this.logger = this.logger.filter(log => log.date === date);
  }

  hourFilter(hour) {
    this.logger = this.logger.filter(log => log.hour === hour);
  }
}
