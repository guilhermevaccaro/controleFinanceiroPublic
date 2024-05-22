import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fornecedor } from 'src/app/models/Fornecedor';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form-razao',
  templateUrl: './form-razao.component.html',
  styleUrls: ['./form-razao.component.css'],
})
export class FormRazaoComponent implements OnInit {
  form!: FormGroup;
  @Input() formData!: Fornecedor;
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
      nome: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.form.value;
    if (formData.id === null || formData.id === '') {
      this.dataService.addDocument('fornecedor', formData);
    } else {
      this.dataService.updateDocument('fornecedor', formData.id, formData);
    }
    this.form = this.criarForm();
    this.closeModal.emit();
  }

  onCancel() {
    this.form = this.formBuilder.group({
      id: [''],
      nome: [''],
    });
    this.closeModal.emit();
  }
}
