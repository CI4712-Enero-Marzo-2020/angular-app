import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbacklogComponent } from './productbacklog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductbacklogComponent', () => {
  let component: ProductbacklogComponent;
  let fixture: ComponentFixture<ProductbacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductbacklogComponent ],
      imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],

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
