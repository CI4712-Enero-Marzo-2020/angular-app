import { Component, OnInit, Input } from '@angular/core';
import { UnitTest } from './unittest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sprint-unit-test',
  templateUrl: './sprint-unit-test.component.html',
  styleUrls: ['./sprint-unit-test.component.scss'],
  providers: [DatePipe]
})
export class SprintUnitTestComponent implements OnInit {

  @Input() sprint_id: number;

  unitTests : UnitTest[] = [];
  addEditForm: FormGroup;
  addMode = true;
  unitTest: UnitTest;
  searchword = '';

  fromDate : Date;
  toDate : Date;

  constructor(
      public datepipe: DatePipe,
      private formBuilder: FormBuilder,
      //private unitTestService: UnitTestService,
      private route: ActivatedRoute) {
        this.sprint_id = this.route.snapshot.params.id;
      }

  ngOnInit() {
    this.initializeAddForm();
    this.searchword = '';
    //this.unitTests = [];
    this.getAll();
  }

  initializeAddForm() {
    this.addMode = true;
    this.addEditForm = this.formBuilder.group({
      date: [{ value: new Date(Date.now()), disabled: true }, Validators.required],
      module: ['', Validators.required],
      component: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  initializeEditForm(unitTest: UnitTest) {
    this.addMode = false;
    this.unitTest = unitTest;
    this.addEditForm = this.formBuilder.group({
      date: [{ value: unitTest.date, disabled: true }, Validators.required],
      module: [unitTest.module, Validators.required],
      component: [unitTest.component, Validators.required],
      name: [unitTest.name, Validators.required],
      amount: [unitTest.amount, Validators.required]
    });
  }

  initializeDeleteForm(unitTest: UnitTest) {
    this.unitTest = unitTest;
  }

  async getAll() {
    // this.retrospectiveService.getAll(this.sprint_id).then((response) => {
    //   if (response && response.server !== 'NO_CONTENT' && response.server !== 'ERROR') {
    //     this.retrospectives = response;
    //   }
    //   console.log(response);
    // });
  }

  async createUnitTest() {
    const formData = new FormData();
    formData.append('sprint_id', this.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('module', this.addEditForm.get('module').value);
    formData.append('component', this.addEditForm.get('component').value);
    formData.append('name', this.addEditForm.get('name').value);
    formData.append('amount', this.addEditForm.get('amount').value.toString());
    // const newRetrospective: any = await this.retrospectiveService.create(formData);
    // console.log(newRetrospective);
    // if (newRetrospective && newRetrospective.server !== 'ERROR') {
    //   this.retrospectives.push(newRetrospective);
    // }
  }

  async editUnitTest() {
    const index = this.findIndexRet();
    const formData = new FormData();
    formData.append('id', this.unitTest.id.toString());
    formData.append('sprint_id', this.unitTest.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('module', this.addEditForm.get('module').value);
    formData.append('component', this.addEditForm.get('component').value);
    formData.append('name', this.addEditForm.get('name').value);
    formData.append('amount', this.addEditForm.get('amount').value.toString());
    // this.retrospectiveService.edit(this.retrospective.id, formData).then((response: any) => {
    //   console.log(response);
    //   if (response && response.server !== 'ERROR') {
    //     this.retrospectives = [...this.retrospectives.slice(0, index), response,
    //       ...this.retrospectives.slice(index + 1, this.retrospectives.length)];
    //   }
    // });
  }

  async removeUnitTest() {
    // const i = this.findIndexRet();
    // await this.retrospectiveService.delete(this.retrospective.id);
    // this.retrospectives = [...this.retrospectives.slice(0, i), ...this.retrospectives.slice(i + 1, this.retrospectives.length)];

  }

  filterUnitTests(id: string, from : Date, to : Date) {
    return this.unitTests.filter((element, index, array) => {
      if (id.length && !element.id.toString().includes(id)) return false;
      if (from && element.date < from) return false;
      if (to && element.date > new Date(to.getTime() + 86400000)) return false;
      return true;
    });
  }

  findIndexRet() {
    // const getProjectIndex = (element) => element.id === this.retrospective.id;
    // const index = this.retrospectives.findIndex(getProjectIndex);
    // return index;
  }

}
