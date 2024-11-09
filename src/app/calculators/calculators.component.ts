import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

  calculators: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // TODO : create a service to fetch data
    this.http
      .get<any[]>(
        'https://672f10db229a881691f1ba80.mockapi.io/api/v1/calculators'
      )
      .subscribe({
        next: (data: any[]) => {
          this.calculators = data;
        },
      });
  }

  navigateTo(url: string) {
    this.router.navigate([`calculators/${url}`]);
  }
}
