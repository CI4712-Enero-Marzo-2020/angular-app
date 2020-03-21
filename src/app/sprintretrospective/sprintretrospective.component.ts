import { Component, OnInit } from '@angular/core';
import { Retrospective } from './retrospective';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SprintRetrospectiveService } from '../services/meetings/sprintRetrospective/sprint-retrospective.service';

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
        method: 'Preguntando',
        positive: 'Todo salio de pinga',
        negative: 'No trajeron cerveza',
        decision: 'Pasemos al siguiente sprint',
        sprint_id: 0
      },
      {
        id: 1,
        date: new Date(Date.now()),
        method: 'Preguntando',
        positive: 'Todo salio de pinga',
        negative: 'No trajeron cerveza',
        decision: 'Pasemos al siguiente sprint',
        sprint_id: 0
      },
      {
        id: 2,
        date: new Date(Date.now()),
        method: 'Preguntando',
        positive: 'Todo salio de pinga',
        negative: 'No trajeron cerveza',
        decision: 'Pasemos al siguiente sprint',
        sprint_id: 0
      }
    ];

  addEditForm: FormGroup;
  addMode = true;
  retrospective: Retrospective;
  searchword = '';
  sprint_id = 1;

  constructor(
      public datepipe: DatePipe,
      private formBuilder: FormBuilder,
      private retrospectiveService: SprintRetrospectiveService) { }

  ngOnInit() {
    this.initializeAddForm();
    this.searchword = '';
    this.getAll();
  }

  initializeAddForm() {
    this.addMode = true;
    this.addEditForm = this.formBuilder.group({
      date: [{ value: new Date(Date.now()), disabled: true }, Validators.required],
      method: ['', Validators.required],
      positive: ['', Validators.required],
      negative: ['', Validators.required],
      decision: ['', Validators.required]
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

  async getAll() {
    this.retrospectiveService.getAll(this.sprint_id).then((response) => {
      if (response && response.server !== 'NO_CONTENT' && response.server !== 'ERROR') {
        this.retrospectives = response;
      }
      console.log(response);
    });
  }
  async createRetrospective() {
    const formData = new FormData();
    formData.append('sprint_id', this.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('method', this.addEditForm.get('method').value);
    formData.append('positive', this.addEditForm.get('positive').value);
    formData.append('negative', this.addEditForm.get('negative').value);
    formData.append('decision', this.addEditForm.get('decision').value);
    const newRetrospective: any = await this.retrospectiveService.create(formData);
    console.log(newRetrospective);
    if (newRetrospective && newRetrospective.server !== 'ERROR') {
      this.retrospectives.push(newRetrospective);
    }
  }

  async editRetrospective() {
    const index = this.findIndexRet();
    const formData = new FormData();
    formData.append('id', this.retrospective.id.toString());
    formData.append('sprint_id', this.retrospective.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('method', this.addEditForm.get('method').value);
    formData.append('positive', this.addEditForm.get('positive').value);
    formData.append('negative', this.addEditForm.get('negative').value);
    formData.append('decision', this.addEditForm.get('decision').value);
    this.retrospectiveService.edit(this.retrospective.id, formData).then((response: any) => {
      console.log(response);
      if (response && response.server !== 'ERROR') {
        this.retrospectives = [...this.retrospectives.slice(0, index), response,
          ...this.retrospectives.slice(index + 1, this.retrospectives.length)];
      }
    });
  }

  async removeRetrospective() {
    const i = this.findIndexRet();
    await this.retrospectiveService.delete(this.retrospective.id);
    this.retrospectives = [...this.retrospectives.slice(0, i), ...this.retrospectives.slice(i + 1, this.retrospectives.length)];

  }

  filterRetrospectives(id: string) {
    if (id === '') { return this.retrospectives; }
    const retrospectives = [];
    this.retrospectives.forEach(retrospective => {
      if (retrospective.id.toString().includes(id)) {
        retrospectives.push(retrospective);
      }
    });
    return retrospectives;
  }

  findIndexRet() {
    const getProjectIndex = (element) => element.id === this.retrospective.id;
    const index = this.retrospectives.findIndex(getProjectIndex);
    return index;
  }


}
