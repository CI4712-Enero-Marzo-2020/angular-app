import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintUiTestComponent } from './sprint-ui-test.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SprintUiTestComponent', () => {
  let component: SprintUiTestComponent;
  let fixture: ComponentFixture<SprintUiTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintUiTestComponent ],
      imports: [FontAwesomeModule, FormsModule, MatDatepickerModule, MatNativeDateModule,
        ReactiveFormsModule, RouterTestingModule, MatInputModule, MatFormFieldModule, BrowserAnimationsModule,
        HttpClientTestingModule],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintUiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
