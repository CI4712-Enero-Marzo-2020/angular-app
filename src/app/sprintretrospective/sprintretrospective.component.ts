import { Component, OnInit } from '@angular/core';
import { Retrospective } from './retrospective';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sprintretrospective',
  templateUrl: './sprintretrospective.component.html',
  styleUrls: ['./sprintretrospective.component.scss'],
  providers: [DatePipe]
})
export class SprintretrospectiveComponent implements OnInit {

  retrospectives: Retrospective[] =
    [
      {
        id: 0,
        date: new Date(Date.now()),
        method: "Preguntando",
        positive: "Todo salio de pinga",
        negative: "No trajeron cerveza",
        decision: "Pasemos al siguiente sprint",
        sprint_id: 0
      },
      {
        id: 1,
        date: new Date(Date.now()),
        method: "Preguntando",
        positive: "Todo salio de pinga",
        negative: "No trajeron cerveza",
        decision: "Pasemos al siguiente sprint",
        sprint_id: 0
      },
      {
        id: 2,
        date: new Date(Date.now()),
        method: "Preguntando",
        positive: "Todo salio de pinga",
        negative: "No trajeron cerveza",
        decision: "Pasemos al siguiente sprint",
        sprint_id: 0
      }
    ];

  addEditForm: FormGroup;
  addMode: boolean = true;
  retrospective: Retrospective;
  searchword: string = "";
  sprint_id: number = 0;

  constructor(public datepipe: DatePipe, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeAddForm();
    this.searchword = "";
  }

  initializeAddForm() {
    this.addMode = true;
    this.addEditForm = this.formBuilder.group({
      date: [{ value: new Date(Date.now()), disabled: true }, Validators.required],
      method: ["", Validators.required],
      positive: ["", Validators.required],
      negative: ["", Validators.required],
      decision: ["", Validators.required]
    });
  }

  initializeEditForm(retrospective: Retrospective) {
    this.addMode = false;
    this.retrospective = retrospective;
    this.addEditForm = this.formBuilder.group({
      date: [{ value: retrospective.date, disabled: true }, Validators.required],
      method: [retrospective.method, Validators.required],
      positive: [retrospective.positive, Validators.required],
      negative: [retrospective.negative, Validators.required],
      decision: [retrospective.decision, Validators.required]
    });
  }

  initializeDeleteForm(retrospective: Retrospective) {
    this.retrospective = retrospective;
  }

  async createRetrospective() {
    const formData = new FormData();
    formData.append('sprint_id', this.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('method', this.addEditForm.get('method').value);
    formData.append('positive', this.addEditForm.get('positive').value);
    formData.append('negative', this.addEditForm.get('negative').value);
    formData.append('decision', this.addEditForm.get('decision').value);
    console.log(formData.get('sprint_id'));
    console.log(formData.get('date'));
    console.log(formData.get('method'));
    console.log(formData.get('positive'));
    console.log(formData.get('negative'));
    console.log(formData.get('decision'));
  }

  async editRetrospective() {
    const formData = new FormData();
    formData.append('id', this.retrospective.id.toString());
    formData.append('sprint_id', this.retrospective.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('method', this.addEditForm.get('method').value);
    formData.append('positive', this.addEditForm.get('positive').value);
    formData.append('negative', this.addEditForm.get('negative').value);
    formData.append('decision', this.addEditForm.get('decision').value);
    console.log(formData.get('id'));
    console.log(formData.get('sprint_id'));
    console.log(formData.get('date'));
    console.log(formData.get('method'));
    console.log(formData.get('positive'));
    console.log(formData.get('negative'));
    console.log(formData.get('decision'));
  }

  async removeRetrospective() {
  }

  filterRetrospectives(id: string) {
    if (id == "") return this.retrospectives;
    var retrospectives = [];
    this.retrospectives.forEach(retrospective => {
      if (retrospective.id.toString().includes(id)) {
        retrospectives.push(retrospective);
      }
    });
    return retrospectives;
  }

}
