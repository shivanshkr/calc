import { Component } from '@angular/core';
import { CalculatorLayoutComponent } from '../calculator-layout/calculator-layout.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { combineLatest, debounceTime, forkJoin, Subject } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { OnlyNaturalNumbersDirective } from '../../utils/directives/natural-numbers/only-natural-numbers.directive';

@Component({
  selector: 'app-sip-calculator',
  standalone: true,
  imports: [
    CalculatorLayoutComponent,
    ReactiveFormsModule,
    SliderModule,
    DividerModule,
    ChartModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    CommonModule,
    FormsModule,
    OnlyNaturalNumbersDirective,
    TableModule,
  ],
  providers: [CurrencyPipe],
  templateUrl: './sip-calculator.component.html',
  styleUrl: './sip-calculator.component.scss',
})
export class SipCalculatorComponent {
  header = 'SIP Calculator';

  monthlyInvestment = 15000;
  returnRate = 12;
  time = 15;
  doughnutData: any;
  barData: any;
  barOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (value: any) {
            return (
              '₹' +
              new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short',
              }).format(value)
            );
          },
        },
      },
    },
  };

  investedAmount = 0;
  estReturn = 0;
  totalValue = 0;
  monthlyInvestmentSubject = new Subject<number>();
  returnRateSubject = new Subject<number>();
  timeSubject = new Subject<number>();

  yearlyData: any[] = [];

  constructor(private currencyPipe: CurrencyPipe) {}

  ngOnInit() {
    combineLatest([
      this.monthlyInvestmentSubject,
      this.returnRateSubject,
      this.timeSubject,
    ])
      .pipe(debounceTime(100))
      .subscribe(([mi, rr, t]) => {
        this.calculateSIP(mi, rr, t);
      });
    this.monthlyInvestmentSubject.next(this.monthlyInvestment);
    this.returnRateSubject.next(this.returnRate);
    this.timeSubject.next(this.time);
  }

  onMonthlyInvestmentChange(event: number) {
    this.monthlyInvestmentSubject.next(event);
  }

  onReturnRateChange(event: number) {
    this.returnRateSubject.next(event);
  }

  onTimeChange(event: number) {
    this.timeSubject.next(event);
  }

  calculateSIP(
    monthlyInvestment: number,
    returnRate: number,
    timeInYears: number
  ) {
    if (
      monthlyInvestment != null &&
      returnRate != null &&
      timeInYears != null
    ) {
      const monthlyRate = returnRate / 12 / 100; // convert annual rate to monthly decimal
      const months = timeInYears * 12;
      const futureValue =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);

      this.totalValue = Math.round(futureValue);
      this.investedAmount = monthlyInvestment * timeInYears * 12;
      this.estReturn = this.totalValue - this.investedAmount;

      this.doughnutData = {
        labels: [
          `Invested Amount: ${this.currencyPipe.transform(
            this.investedAmount,
            'INR',
            'symbol',
            '1.0-0',
            'en-IN'
          )}`,
          `Est. Return: ${this.currencyPipe.transform(
            this.estReturn,
            'INR',
            'symbol',
            '1.0-0',
            'en-IN'
          )}`,
        ],
        datasets: [
          {
            data: [this.investedAmount, this.estReturn],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 4,
          },
        ],
      };

      this.calculatorBarChartData(monthlyInvestment, returnRate, timeInYears);
    }
  }

  calculatorBarChartData(
    monthlyInvestment: number,
    returnRate: number,
    timeInYears: number
  ) {
    const yearWiseData = this.calculateYearlySIPReturns(
      monthlyInvestment,
      returnRate,
      timeInYears
    );
    this.barData = {
      labels: yearWiseData.year,
      datasets: [
        {
          type: 'bar',
          label: 'Invested Amount',
          backgroundColor: 'rgb(255, 99, 132)',
          data: yearWiseData.investedValue,
        },
        {
          type: 'bar',
          label: 'Est. Return',
          backgroundColor: 'rgb(54, 162, 235)',
          data: yearWiseData.estimatedReturn,
        },
      ],
    };
  }

  calculateYearlySIPReturns(
    monthlyInvestment: number,
    returnRate: number,
    totalYears: number
  ) {
    const monthlyRate = returnRate / 12 / 100;
    const yearlyData = [];

    let investedValue = 0;
    let futureValue = 0;

    for (let year = 1; year <= totalYears; year++) {
      const months = year * 12;

      // Future value for the current year
      futureValue =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);

      investedValue += monthlyInvestment * 12; // Total amount invested up to this year
      const estimatedReturn = futureValue - investedValue; // Estimated return is total FV minus invested capital

      // Push the data for this year
      yearlyData.push({
        year: year,
        investedValue: Math.round(investedValue),
        estimatedReturn: Math.round(estimatedReturn),
        futureValue: Math.round(futureValue),
      });
    }
    this.yearlyData = yearlyData;
    const yearWiseData = {
      year: yearlyData.map((d) => d.year),
      investedValue: yearlyData.map((d) => d.investedValue),
      estimatedReturn: yearlyData.map((d) => d.estimatedReturn),
      futureValue: yearlyData.map((d) => d.futureValue),
    };

    return yearWiseData;
  }
}
