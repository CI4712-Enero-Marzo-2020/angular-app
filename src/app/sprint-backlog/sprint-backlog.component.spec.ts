import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBacklogComponent } from './sprint-backlog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTabsModule, MatDialogModule,
        MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SprintBacklogComponent', () => {
  let component: SprintBacklogComponent;
  let fixture: ComponentFixture<SprintBacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintBacklogComponent ],
      imports: [FontAwesomeModule, MatTabsModule, FormsModule, MatDatepickerModule, MatNativeDateModule,
                MatDialogModule, ReactiveFormsModule, RouterTestingModule, MatFormFieldModule, MatInputModule,
                HttpClientTestingModule, BrowserAnimationsModule],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
