import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css'],
})
export class SaldoComponent {
  @Input() titulo!: string;
  @Input() soma!: number;
  @Input() icone!: string;
  @Input() color!: string;
}
