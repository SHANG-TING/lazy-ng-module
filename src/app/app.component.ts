import { Compiler, Component, ComponentFactory, Injector, Type, ViewChild, ViewContainerRef } from '@angular/core';

import { M1comp1Component } from './module1/m1comp1.component';
import { M1comp2Component } from './module1/m1comp2.component';
import { Module1Module } from './module1/module1.module';
import { M2comp1Component } from './module2/m2comp1.component';
import { M2comp2Component } from './module2/m2comp2.component';
import { M2comp3Component } from './module2/m2comp3.component';
import { Module2Module } from './module2/module2.module';

@Component({
  selector: 'app-root',
  template: `
    <div class="buttons">
      <button (click)="loadModule1()">lazy module1</button>
      <button (click)="loadModule2()">lazy module2</button>
    </div>

    <div class="contents">
      <ul>
        <li
          *ngFor="let factory of componentFactories"
          (click)="createComponent(factory)"
        >
          {{ factory.componentType.name }}
        </li>
      </ul>
      <div class="anchor">
        <ng-container #anchor></ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('anchor', { read: ViewContainerRef })
  anchor!: ViewContainerRef;

  componentFactories: ComponentFactory<any>[] = [];

  constructor(private compiler: Compiler, private injector: Injector) {}

  async loadModule1() {
    this.loadModule((await import('./module1/module1.module')).Module1Module);
  }

  async loadModule2() {
    this.loadModule((await import('./module2/module2.module')).Module2Module);
  }

  createComponent(factory: ComponentFactory<any>) {
    this.anchor.clear();
    this.anchor.createComponent(factory);
  }

  private loadModule(moduleType: Type<any>) {
    this.anchor.clear();

    // const moduleFactory = this.compiler.compileModuleSync(moduleType);
    // const { componentFactoryResolver } = moduleFactory.create(this.injector);

    // if (moduleType.name === 'Module1Module') {
    //   this.componentFactories = [
    //     componentFactoryResolver.resolveComponentFactory(M1comp1Component),
    //     componentFactoryResolver.resolveComponentFactory(M1comp2Component)
    //   ];
    // } else if (moduleType.name === 'Module2Module') {
    //   this.componentFactories = [
    //     componentFactoryResolver.resolveComponentFactory(M2comp1Component),
    //     componentFactoryResolver.resolveComponentFactory(M2comp2Component),
    //     componentFactoryResolver.resolveComponentFactory(M2comp3Component)
    //   ];
    // }

    const moduleFactories = this.compiler.compileModuleAndAllComponentsSync(
      moduleType
    );
    this.componentFactories = moduleFactories.componentFactories;
  }
}
