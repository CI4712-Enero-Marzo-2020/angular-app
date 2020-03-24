import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintDetailsComponent } from './sprint-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTabsModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SprintDetailsComponent', () => {
  let component: SprintDetailsComponent;
  let fixture: ComponentFixture<SprintDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintDetailsComponent ],
      imports: [FontAwesomeModule, MatTabsModule, MatDialogModule,
                FormsModule, ReactiveFormsModule, RouterTestingModule,
                BrowserAnimationsModule, HttpClientTestingModule],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
