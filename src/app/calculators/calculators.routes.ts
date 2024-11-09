import { Routes } from '@angular/router';
import { CalculatorsComponent } from './calculators.component';
import { SipCalculatorComponent } from './sip-calculator/sip-calculator.component';

export const routes: Routes = [
  { path: '', component: CalculatorsComponent },
  { path: 'sip-calculator', component: SipCalculatorComponent },
];
