import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRazaoComponent } from './form-razao.component';

describe('FormRazaoComponent', () => {
  let component: FormRazaoComponent;
  let fixture: ComponentFixture<FormRazaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRazaoComponent]
    });
    fixture = TestBed.createComponent(FormRazaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
