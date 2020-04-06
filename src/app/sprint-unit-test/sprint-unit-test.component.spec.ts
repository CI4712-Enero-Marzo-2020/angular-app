import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintUnitTestComponent } from './sprint-unit-test.component';

describe('SprintUnitTestComponent', () => {
  let component: SprintUnitTestComponent;
  let fixture: ComponentFixture<SprintUnitTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintUnitTestComponent ]
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
