import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintplanningComponent } from './sprintplanning.component';

describe('SprintplanningComponent', () => {
  let component: SprintplanningComponent;
  let fixture: ComponentFixture<SprintplanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintplanningComponent ]
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
