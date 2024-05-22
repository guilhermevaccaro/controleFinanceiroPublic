import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdicionarRemoverEstoqueComponent } from './form-adicionar-remover-estoque.component';

describe('FormAdicionarRemoverEstoqueComponent', () => {
  let component: FormAdicionarRemoverEstoqueComponent;
  let fixture: ComponentFixture<FormAdicionarRemoverEstoqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAdicionarRemoverEstoqueComponent]
    });
    fixture = TestBed.createComponent(FormAdicionarRemoverEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
