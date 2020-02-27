import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbacklogComponent } from './productbacklog.component';

describe('ProductbacklogComponent', () => {
  let component: ProductbacklogComponent;
  let fixture: ComponentFixture<ProductbacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductbacklogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductbacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
