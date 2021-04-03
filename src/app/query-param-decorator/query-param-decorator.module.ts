import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setInjector } from './static-injector';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class QueryParamDecoratorModule {
  constructor(injector: Injector) {
    setInjector(injector);
  }

  static forRoot(): ModuleWithProviders<QueryParamDecoratorModule> {
    return {
      ngModule: QueryParamDecoratorModule,
    };
  }
}
