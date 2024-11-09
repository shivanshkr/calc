import { Routes } from '@angular/router';
import { CalculatorsComponent } from './calculators/calculators.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'calculators',
    loadChildren: () =>
      import('./calculators/calculators.routes').then((m) => m.routes),
  },
//   { path: '', redirectTo: 'calculators', pathMatch: 'full' },    
    { path: '', component : HomeComponent}
];
