import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintGraphsComponent } from './sprint-graphs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('SprintGraphsComponent', () => {
  let component: SprintGraphsComponent;
  let fixture: ComponentFixture<SprintGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintGraphsComponent ],
      imports: [FontAwesomeModule, MatTabsModule, FormsModule,
        ReactiveFormsModule, RouterTestingModule, MatDialogModule,
        NgSelectModule, HttpClientTestingModule],
        providers: [
          { provide: MatDialogRef, useValue: {} },
          { provide: MAT_DIALOG_DATA, useValue: [] },
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
