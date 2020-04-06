import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinttechnicalComponent } from './sprinttechnical.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDatepicker, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SprinttechnicalComponent', () => {
  let component: SprinttechnicalComponent;
  let fixture: ComponentFixture<SprinttechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprinttechnicalComponent ],
      imports: [FontAwesomeModule, FormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        ReactiveFormsModule, RouterTestingModule, MatDatepickerModule, MatNativeDateModule,
        HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprinttechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
