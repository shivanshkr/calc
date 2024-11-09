import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-calculator-layout',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './calculator-layout.component.html',
  styleUrl: './calculator-layout.component.scss',
})
export class CalculatorLayoutComponent implements OnChanges {
  @Input() header!: string;
  breadcrumbItems: MenuItem[] = [
    { label: 'Calculators', routerLink: '/calculators' },
  ];
  breadcrumbHome = {
    label: '',
    routerLink: '/',
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.breadcrumbItems.push({
      label: this.header,
    });
  }
}
