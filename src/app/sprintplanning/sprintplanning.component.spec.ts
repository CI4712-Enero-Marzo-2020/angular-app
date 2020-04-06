import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintplanningComponent } from './sprintplanning.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('SprintplanningComponent', () => {
  let component: SprintplanningComponent;
  let fixture: ComponentFixture<SprintplanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintplanningComponent ],
      imports: [FontAwesomeModule, FormsModule,
        ReactiveFormsModule, RouterTestingModule, MatDatepickerModule, MatFormFieldModule,
        HttpClientTestingModule],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintplanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
