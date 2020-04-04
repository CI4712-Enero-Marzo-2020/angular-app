import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBurnDownComponent } from './sprint-burn-down.component';

describe('SprintBurnDownComponent', () => {
  let component: SprintBurnDownComponent;
  let fixture: ComponentFixture<SprintBurnDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintBurnDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBurnDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
