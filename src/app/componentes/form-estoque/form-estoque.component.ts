import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estoque } from 'src/app/models/Estoque';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form-estoque',
  templateUrl: './form-estoque.component.html',
  styleUrls: ['./form-estoque.component.css'],
})
export class FormEstoqueComponent implements OnInit, OnChanges {
  form!: FormGroup;
  @Input() formData!: Estoque;
  @Output() closeModal = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.form = this.criarForm();
  }

  private criarForm() {
    return this.formBuilder.group({
      id: [''],
      codigo: ['', Validators.required],
      nome: [''],
      quantidade: [0, Validators.required],
    });
  }

  ngOnChanges() {
    if (this.formData) {
      this.atualizarFormulario();
    } else {
      this.form = this.criarForm();
    }
  }

  atualizarFormulario() {
    this.form.patchValue({
      id: this.formData.id,
      codigo: this.formData.codigo,
      nome: this.formData.nome,
    });
  }

  onSubmit() {
    const formData = this.form.value;
    if (formData.id === null || formData.id === '') {
      this.dataService.addDocument('estoque', formData);
    } else {
      this.dataService.updateDocument('estoque', formData.id, formData);
    }
    this.form = this.criarForm();
    this.closeModal.emit();
  }

  onCancel() {
    this.form = this.formBuilder.group({
      id: [''],
      codigo: ['', Validators.required],
      nome: [''],
    });
    this.closeModal.emit();
  }
}
