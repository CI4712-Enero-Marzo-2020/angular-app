import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintGraphsComponent } from './sprint-graphs.component';

describe('SprintGraphsComponent', () => {
  let component: SprintGraphsComponent;
  let fixture: ComponentFixture<SprintGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
