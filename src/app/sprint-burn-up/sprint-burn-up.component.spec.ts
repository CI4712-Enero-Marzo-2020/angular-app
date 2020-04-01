import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBurnUpComponent } from './sprint-burn-up.component';

describe('SprintBurnUpComponent', () => {
  let component: SprintBurnUpComponent;
  let fixture: ComponentFixture<SprintBurnUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintBurnUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBurnUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
