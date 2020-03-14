import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintretrospectiveComponent } from './sprintretrospective.component';

describe('SprintretrospectiveComponent', () => {
  let component: SprintretrospectiveComponent;
  let fixture: ComponentFixture<SprintretrospectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintretrospectiveComponent ]
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
