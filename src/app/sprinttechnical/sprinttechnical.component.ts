import { Component, OnInit } from '@angular/core';
import { Technical } from './technical';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sprinttechnical',
  templateUrl: './sprinttechnical.component.html',
  styleUrls: ['./sprinttechnical.component.scss'],
  providers: [DatePipe]
})
export class SprinttechnicalComponent implements OnInit {

  technicals: Technical[] =
    [{
      id: 0,
      date: new Date(Date.now()),
      important_reports: ["1a", "2b", "3c"]
    }, {
      id: 0,
      date: new Date(Date.now()),
      important_reports: ["1a", "2b", "3c"]
    }
    ];

  constructor(public datepipe: DatePipe) {}

  ngOnInit() {
  }

}
