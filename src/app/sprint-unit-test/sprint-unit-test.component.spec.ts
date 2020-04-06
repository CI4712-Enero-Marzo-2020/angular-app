import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintUnitTestComponent } from './sprint-unit-test.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SprintUnitTestComponent', () => {
  let component: SprintUnitTestComponent;
  let fixture: ComponentFixture<SprintUnitTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintUnitTestComponent ],
      imports: [FontAwesomeModule, MatTabsModule, FormsModule, MatDatepickerModule, MatNativeDateModule,
        ReactiveFormsModule, RouterTestingModule, MatInputModule, MatFormFieldModule, BrowserAnimationsModule,
         HttpClientTestingModule],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintUnitTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
