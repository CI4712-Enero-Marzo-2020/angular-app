import { Component, OnInit } from '@angular/core';
import { Retrospective } from './retrospective';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sprintretrospective',
  templateUrl: './sprintretrospective.component.html',
  styleUrls: ['./sprintretrospective.component.scss'],
  providers: [DatePipe]
})
export class SprintretrospectiveComponent implements OnInit {

  retrospectives : Retrospective[] = 
  [
    {
      id : 0,
      date : new Date(Date.now()),
      method : "Preguntando",
      positive: "Todo salio de pinga",
      negative: "No trajeron cerveza",
      decision: "Pasemos al siguiente sprint"
    }
  ];


  constructor(public datepipe: DatePipe) { }

  ngOnInit() {
  }

}
