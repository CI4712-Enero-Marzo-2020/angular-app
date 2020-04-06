import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintretrospectiveComponent } from './sprintretrospective.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepicker, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SprintretrospectiveComponent', () => {
  let component: SprintretrospectiveComponent;
  let fixture: ComponentFixture<SprintretrospectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintretrospectiveComponent ],
      imports: [FontAwesomeModule, FormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        ReactiveFormsModule, RouterTestingModule, MatDatepickerModule, MatNativeDateModule,
        HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintretrospectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
