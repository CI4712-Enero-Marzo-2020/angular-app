import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger/logger.service';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {
  logger: any;
  constructor(public loggerService: LoggerService) { }

  ngOnInit() {
    this.getLogger();
  }

  getLogger() {
    console.log(new Date(Date.parse('Sun, 16 Feb 2020 04:32:13 GMT')).getDate());
    this.loggerService.getAll().subscribe((res) => {
      console.log('Registros en el Logger', res);
      this.logger = res;
      this.logger.forEach(element => {
        const dateObj = new Date(Date.parse(element.date));
        const date = dateObj.getDate() + '/' + dateObj.getMonth() + '/' + dateObj.getFullYear();
        const hour = dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
        element['date'] = date;
        element['hour'] = hour;
      });
    });
  }

  delete() {
    //
  }

}
