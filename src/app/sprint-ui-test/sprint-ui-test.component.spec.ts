import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintUiTestComponent } from './sprint-ui-test.component';

describe('SprintUiTestComponent', () => {
  let component: SprintUiTestComponent;
  let fixture: ComponentFixture<SprintUiTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintUiTestComponent ]
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
