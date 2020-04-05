import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UITest } from './uitest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sprint-ui-test',
  templateUrl: './sprint-ui-test.component.html',
  styleUrls: ['./sprint-ui-test.component.scss'],
  providers: [DatePipe]
})
export class SprintUiTestComponent implements OnInit {

  @Input() sprint_id: number;

  uiTests: UITest[] = [
    {
      id: 0,
      sprint_id: 1,
      date: new Date(Date.now()),
      functionality: 'No se...'
    },
    {
      id: 1,
      sprint_id: 1,
      date: new Date(Date.now() - 86400000),
      functionality: 'Nada...'
    },
    {
      id: 2,
      sprint_id: 1,
      date: new Date(Date.now() - 86400000 * 2),
      functionality: 'Auxilio...'
    },
  ];
  addEditForm: FormGroup;
  addMode = true;
  uiTest: UITest;
  searchword = '';

  fromDate: Date;
  toDate: Date;

  constructor(
      public datepipe: DatePipe,
      private formBuilder: FormBuilder,
      // private uiTestService: UITestService,
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
    // this.retrospectiveService.getAll(this.sprint_id).then((response) => {
    //   if (response && response.server !== 'NO_CONTENT' && response.server !== 'ERROR') {
    //     this.retrospectives = response;
    //   }
    //   console.log(response);
    // });
  }

  async createUITest() {
    const formData = new FormData();
    formData.append('sprint_id', this.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('functionality', this.addEditForm.get('functionality').value);
    // const newRetrospective: any = await this.retrospectiveService.create(formData);
    // console.log(newRetrospective);
    // if (newRetrospective && newRetrospective.server !== 'ERROR') {
    //   this.retrospectives.push(newRetrospective);
    // }
  }

  async editUITest() {
    const index = this.findIndexRet();
    const formData = new FormData();
    formData.append('id', this.uiTest.id.toString());
    formData.append('sprint_id', this.uiTest.sprint_id.toString());
    formData.append('date', new Date(this.addEditForm.get('date').value).toUTCString());
    formData.append('functionality', this.addEditForm.get('functionality').value);
    // this.retrospectiveService.edit(this.retrospective.id, formData).then((response: any) => {
    //   console.log(response);
    //   if (response && response.server !== 'ERROR') {
    //     this.retrospectives = [...this.retrospectives.slice(0, index), response,
    //       ...this.retrospectives.slice(index + 1, this.retrospectives.length)];
    //   }
    // });
  }

  async removeUITest() {
    // const i = this.findIndexRet();
    // await this.retrospectiveService.delete(this.retrospective.id);
    // this.retrospectives = [...this.retrospectives.slice(0, i), ...this.retrospectives.slice(i + 1, this.retrospectives.length)];

  }

  filterUITests(id: string, from: Date, to: Date) {
    return this.uiTests.filter((element, index, array) => {
      if (id.length && !element.id.toString().includes(id)) { return false; }
      if (from && element.date < from) { return false; }
      if (to && element.date > new Date(to.getTime() + 86400000)) { return false; }
      return true;
    });
  }

  findIndexRet() {
    // const getProjectIndex = (element) => element.id === this.retrospective.id;
    // const index = this.retrospectives.findIndex(getProjectIndex);
    // return index;
  }

}
