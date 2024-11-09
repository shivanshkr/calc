import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorLayoutComponent } from './calculator-layout.component';

describe('CalculatorLayoutComponent', () => {
  let component: CalculatorLayoutComponent;
  let fixture: ComponentFixture<CalculatorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
