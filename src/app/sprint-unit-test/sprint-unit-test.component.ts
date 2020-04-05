import { Component, OnInit, Input } from '@angular/core';
import { UnitTest } from './unittest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UnitTestsService } from '../services/tests/UnitTests/tests.service';


@Component({
  selector: 'app-sprint-unit-test',
  templateUrl: './sprint-unit-test.component.html',
  styleUrls: ['./sprint-unit-test.component.scss'],
  providers: [DatePipe]
})
export class SprintUnitTestComponent implements OnInit {

  @Input() sprint_id: number;

  unitTests: any[] = [];
  addEditForm: FormGroup;
  addMode = true;
  unitTest: any;
  searchword = '';

  fromDate: Date;
  toDate: Date;

  constructor(
      public datepipe: DatePipe,
      private formBuilder: FormBuilder,
      private unitTestService: UnitTestsService,
      private route: ActivatedRoute) {
        this.sprint_id = this.route.snapshot.params.id;
      }

  ngOnInit() {
    this.initializeAddForm();
    this.searchword = '';
    this.getAll();
  }

  initializeAddForm() {
    this.addMode = true;
    this.addEditForm = this.formBuilder.group({
      date: [{ value: new Date(Date.now()), disabled: true }, Validators.required],
      module: ['', Validators.required],
      component: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  initializeEditForm(unitTest: any) {
    this.addMode = false;
    this.unitTest = unitTest;
    this.addEditForm = this.formBuilder.group({
      date: [this.datepipe.transform(unitTest.date_created, 'dd/MM/yyyy'), Validators.required],
      module: [unitTest.module, Validators.required],
      component: [unitTest.component, Validators.required],
      description: [unitTest.description, Validators.required],
      amount: [unitTest.amount, Validators.required]
    });
  }

  initializeDeleteForm(unitTest: UnitTest) {
    this.unitTest = unitTest;
  }

  async getAll() {
    this.unitTestService.getAll(this.sprint_id).then((response) => {
      if (response && response.server !== 'NO_CONTENT' && response.server !== 'ERROR') {
        this.unitTests = response;
      }
      console.log(response);
    });
  }

  async createUnitTest() {
    const formData = new FormData();
    formData.append('sprint_id', this.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('module', this.addEditForm.get('module').value);
    formData.append('component', this.addEditForm.get('component').value);
    formData.append('description', this.addEditForm.get('description').value);
    formData.append('amount', this.addEditForm.get('amount').value.toString());
    const newTest: any = await this.unitTestService.create(formData);
    console.log(newTest);
    if (newTest && newTest.server !== 'ERROR') {
      this.unitTests.push(newTest);
    }
  }

  async editUnitTest() {
    const index = this.findIndex();
    const formData = new FormData();
    formData.append('id', this.unitTest.id.toString());
    formData.append('sprint_id', this.unitTest.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('module', this.addEditForm.get('module').value);
    formData.append('component', this.addEditForm.get('component').value);
    formData.append('description', this.addEditForm.get('description').value);
    formData.append('amount', this.addEditForm.get('amount').value.toString());
    this.unitTestService.edit(this.unitTest.id, formData).then((response: any) => {
      console.log(response);
      if (response && response.server !== 'ERROR') {
        this.unitTests = [...this.unitTests.slice(0, index), response,
          ...this.unitTests.slice(index + 1, this.unitTests.length)];
      }
    });
  }

  async removeUnitTest() {
    const i = this.findIndex();
    const response: any = await this.unitTestService.delete(this.unitTest.id);
    if (response.server !== 'ERROR') {
      this.unitTests = [...this.unitTests.slice(0, i), ...this.unitTests.slice(i + 1, this.unitTests.length)];
    }
  }

  filterUnitTests(id: string, from: Date, to: Date) {
    return this.unitTests.filter((element, index, array) => {
      if (id.length && !element.id.toString().includes(id)) { return false; }
      if (from && element.date < from) { return false; }
      if (to && element.date > new Date(to.getTime() + 86400000)) { return false; }
      return true;
    });
  }

  findIndex() {
    const getIndex = (element) => element.id === this.unitTest.id;
    const index = this.unitTests.findIndex(getIndex);
    return index;
  }

}
