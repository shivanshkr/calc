import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-calculators',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, CardModule],
  templateUrl: './calculators.component.html',
  styleUrl: './calculators.component.scss',
})
export class CalculatorsComponent {
  breadcrumbItems = [{ label: 'Calculators' }];
  breadcrumbHome = {
    label: '',
    routerLink: '/',
  };

  calculators = [
    {
      name: 'SIP',
      description: 'Calculate the sip',
      redirectUrl: 'sip-calculator',
    },
    // {
    //   name: 'SIP 2',
    //   description: 'Calculate the sip 2',
    //   redirectUrl: 'sip-calculator',
    // },
    // {
    //   name: 'SIP 3',
    //   description: 'Calculate the sip 3',
    //   redirectUrl: 'sip-calculator',
    // },
  ];

  constructor(private router: Router) {}

  navigateTo(url: string) {
    this.router.navigate([`calculators/${url}`]);
  }
}
