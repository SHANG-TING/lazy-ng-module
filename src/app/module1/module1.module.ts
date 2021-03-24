import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { M1comp1Component } from './m1comp1.component';
import { M1comp2Component } from './m1comp2.component';



@NgModule({
  declarations: [M1comp1Component, M1comp2Component],
  imports: [
    CommonModule
  ]
})
export class Module1Module { }
