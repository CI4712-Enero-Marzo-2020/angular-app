import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinttechnicalComponent } from './sprinttechnical.component';

describe('SprinttechnicalComponent', () => {
  let component: SprinttechnicalComponent;
  let fixture: ComponentFixture<SprinttechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprinttechnicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprinttechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
