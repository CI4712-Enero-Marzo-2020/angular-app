import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UITest } from './uitest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UITestsService } from '../services/tests/UITests/uitests.service';

@Component({
  selector: 'app-sprint-ui-test',
  templateUrl: './sprint-ui-test.component.html',
  styleUrls: ['./sprint-ui-test.component.scss'],
  providers: [DatePipe]
})
export class SprintUiTestComponent implements OnInit {

  @Input() sprint_id: number;

  uiTests: UITest[] = [];
  addEditForm: FormGroup;
  addMode = true;
  uiTest: UITest;
  searchword = '';

  fromDate: Date;
  toDate: Date;

  constructor(
      public datepipe: DatePipe,
      private formBuilder: FormBuilder,
      private uiTestService: UITestsService,
      private route: ActivatedRoute) {
        this.sprint_id = this.route.snapshot.params.id;
      }

  ngOnInit() {
    this.initializeAddForm();
    this.searchword = '';
    // this.uiTests = [];
    this.getAll();
  }

  initializeAddForm() {
    this.addMode = true;
    this.addEditForm = this.formBuilder.group({
      date: [{ value: new Date(Date.now()), disabled: true }, Validators.required],
      functionality: ['', Validators.required]
    });
  }

  initializeEditForm(uiTest: UITest) {
    this.addMode = false;
    this.uiTest = uiTest;
    this.addEditForm = this.formBuilder.group({
      date: [{ value: uiTest.date, disabled: true }, Validators.required],
      functionality: [uiTest.functionality, Validators.required]
    });
  }

  initializeDeleteForm(uiTest: UITest) {
    this.uiTest = uiTest;
  }

  async getAll() {
    this.uiTestService.getAll(this.sprint_id).then((response) => {
      if (response && response.server !== 'NO_CONTENT' && response.server !== 'ERROR') {
        this.uiTests = response;
      }
      console.log(response);
    });
  }

  async createUITest() {
    const formData = new FormData();
    formData.append('sprint_id', this.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('functionality', this.addEditForm.get('functionality').value);
    const newTest: any = await this.uiTestService.create(formData);
    console.log(newTest);
    if (newTest && newTest.server !== 'ERROR') {
      this.uiTests.push(newTest);
    }
  }

  async editUITest() {
    const index = this.findIndex();
    const formData = new FormData();
    formData.append('id', this.uiTest.id.toString());
    formData.append('sprint_id', this.uiTest.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('functionality', this.addEditForm.get('functionality').value);
    this.uiTestService.edit(this.uiTest.id, formData).then((response: any) => {
      console.log(response);
      if (response && response.server !== 'ERROR') {
        this.uiTests = [...this.uiTests.slice(0, index), response,
          ...this.uiTests.slice(index + 1, this.uiTests.length)];
      }
    });
  }

  async removeUITest() {
    const i = this.findIndex();
    const response: any = await this.uiTestService.delete(this.uiTest.id);
    if (response.server !== 'ERROR') {
      this.uiTests = [...this.uiTests.slice(0, i), ...this.uiTests.slice(i + 1, this.uiTests.length)];
    }
  }

  filterUITests(id: string, from: Date, to: Date) {
    return this.uiTests.filter((element, index, array) => {
      if (id.length && !element.id.toString().includes(id)) { return false; }
      if (from && element.date < from) { return false; }
      if (to && element.date > new Date(to.getTime() + 86400000)) { return false; }
      return true;
    });
  }

  findIndex() {
    const getIndex = (element) => element.id === this.uiTest.id;
    const index = this.uiTests.findIndex(getIndex);
    return index;
  }

}
