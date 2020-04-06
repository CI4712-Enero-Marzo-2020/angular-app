import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBurnUpComponent } from './sprint-burn-up.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SprintBurnUpComponent', () => {
  let component: SprintBurnUpComponent;
  let fixture: ComponentFixture<SprintBurnUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintBurnUpComponent ],
      imports: [FontAwesomeModule, MatTabsModule, FormsModule, ChartsModule, MatDatepickerModule,
        ReactiveFormsModule, RouterTestingModule, MatDialogModule, BrowserAnimationsModule,
        NgSelectModule, HttpClientTestingModule],
        providers: [
          { provide: MatDialogRef, useValue: {} },
          { provide: MAT_DIALOG_DATA, useValue: [] },
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBurnUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
