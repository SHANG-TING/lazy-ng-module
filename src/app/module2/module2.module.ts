import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { M2comp1Component } from './m2comp1.component';
import { M2comp2Component } from './m2comp2.component';
import { M2comp3Component } from './m2comp3.component';



@NgModule({
  declarations: [M2comp1Component, M2comp2Component, M2comp3Component],
  imports: [
    CommonModule
  ]
})
export class Module2Module { }
