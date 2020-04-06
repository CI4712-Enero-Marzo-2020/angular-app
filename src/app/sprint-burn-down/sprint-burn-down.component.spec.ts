import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBurnDownComponent } from './sprint-burn-down.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SprintBurnDownComponent', () => {
  let component: SprintBurnDownComponent;
  let fixture: ComponentFixture<SprintBurnDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintBurnDownComponent ],
      imports: [FontAwesomeModule, MatTabsModule, FormsModule, ChartsModule, BrowserAnimationsModule,
        ReactiveFormsModule, RouterTestingModule, MatDialogModule, MatDatepickerModule,
        NgSelectModule, HttpClientTestingModule, ],
        providers: [
          { provide: MatDialogRef, useValue: {} },
          { provide: MAT_DIALOG_DATA, useValue: [] },
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBurnDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
