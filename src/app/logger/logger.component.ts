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
  selectValue = '';
  searchValue = '';
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

  idFilter() {
    console.log(this.searchValue);
    this.logger = this.logger.filter(log => log.id === parseInt(this.searchValue, 10));
  }

  userFilter() {
    this.logger = this.logger.filter(log => log.user === this.searchValue);
  }

  eventFilter() {
    this.logger = this.logger.filter(log => log.event === this.searchValue);
  }

  moduleFilter() {
    this.logger = this.logger.filter(log => log.loged_module === this.searchValue);
  }

  dateFilter() {
    this.logger = this.logger.filter(log => log.date.includes(this.searchValue));
  }

  hourFilter() {
    this.logger = this.logger.filter(log => log.hour.includes(this.searchValue));
  }

  search() {
    this.logger = this.loggerCopy;
    console.log(this.selectValue, this.searchValue);
    if (this.selectValue === 'id') {
      this.idFilter();
    } else if (this.selectValue === 'user') {
      this.userFilter();
    } else if (this.selectValue === 'event') {
      this.eventFilter();
    } else if (this.selectValue === 'loged_module') {
      this.moduleFilter();
    } else if (this.selectValue === 'date') {
      this.dateFilter();
    }
  }
  clean() {
    this.logger = this.loggerCopy;
    this.searchValue = '';
    this.selectValue = '';
  }
}
