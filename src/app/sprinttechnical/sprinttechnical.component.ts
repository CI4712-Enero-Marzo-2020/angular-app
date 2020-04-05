import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Technical } from './technical';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SprintDailyService } from '../services/meetings/sprintDaily/sprint-daily.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sprinttechnical',
  templateUrl: './sprinttechnical.component.html',
  styleUrls: ['./sprinttechnical.component.scss'],
  providers: [DatePipe]
})
export class SprinttechnicalComponent implements OnInit {


  addEditForm: FormGroup;
  addMode: boolean = true;
  technical: Technical;
  technicals: Technical[];
  searchword: string = '';
  sprint_id: number;

  constructor(public datepipe: DatePipe,
              private formBuilder: FormBuilder,
              private technicalService: SprintDailyService,
              private route: ActivatedRoute) {
    this.sprint_id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.initializeAddForm();
    this.searchword = '';
    this.technicals = [];
    this.getAll();
  }

  initializeAddForm() {
    this.addMode = true;
    this.addEditForm = this.formBuilder.group({
      date: [{ value: new Date(Date.now()), disabled: true }, Validators.required],
      report: ['', Validators.required]
    });
  }

  initializeEditForm(technical: Technical) {
    this.addMode = false;
    this.technical = technical;
    this.addEditForm = this.formBuilder.group({
      date: [{ value: technical.date, disabled: true }, Validators.required],
      report: [technical.report, Validators.required]
    });
  }

  initializeDeleteForm(technical: Technical) {
    this.technical = technical;
  }

  async getAll() {
    this.technicalService.getAll(this.sprint_id).then((response) => {
      if (response && response.server !== 'NO_CONTENT' && response.server !== 'ERROR') {
        this.technicals = response;
      }
      console.log(response);
    });
  }

  async createTechnical() {
    const formData = new FormData();
    formData.append('sprint_id', this.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('report', this.addEditForm.get('report').value);
    console.log(formData.get('sprint_id'));
    console.log(formData.get('date'));
    console.log(formData.get('report'));
    const newTechnical: any = await this.technicalService.create(formData);
    if (newTechnical && newTechnical.server !== 'ERROR') {
      this.technicals.push(newTechnical);
    }
  }

  async editTechnical() {
    const index = this.findIndexTech();
    const formData = new FormData();
    formData.append('id', this.technical.id.toString());
    formData.append('sprint_id', this.technical.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('report', this.addEditForm.get('report').value);
    console.log(formData.get('id'));
    console.log(formData.get('sprint_id'));
    console.log(formData.get('date'));
    console.log(formData.get('report'));
    this.technicalService.edit(this.technical.id, formData).then((response: any) => {
      console.log(response);
      if (response && response.server !== 'ERROR') {
        this.technicals = [...this.technicals.slice(0, index), response, ...this.technicals.slice(index + 1, this.technicals.length)];
      }
    });
  }

  async removeTechnical() {
    const i = this.findIndexTech();
    await this.technicalService.delete(this.technical.id);
    this.technicals = [...this.technicals.slice(0, i), ...this.technicals.slice(i + 1, this.technicals.length)];

  }

  filterTechnicals(id: string) {
    if (id === '') { return this.technicals; }
    const technicals = [];
    this.technicals.forEach(technical => {
      if (technical.id.toString().includes(id)) {
        technicals.push(technical);
      }
    });
    return technicals;
  }

  findIndexTech() {
    const getProjectIndex = (element) => element.id === this.technical.id;
    const index = this.technicals.findIndex(getProjectIndex);
    return index;
  }

}
