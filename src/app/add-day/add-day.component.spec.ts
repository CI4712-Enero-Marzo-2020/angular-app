import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDayComponent } from './add-day.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddDayComponent', () => {
  let component: AddDayComponent;
  let fixture: ComponentFixture<AddDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDayComponent ],
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
    fixture = TestBed.createComponent(AddDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
