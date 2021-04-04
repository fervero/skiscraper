import { Injector, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

let injector: Injector | null = null;

function assertDefined<T>(actual: T | null | undefined): never | void {
  if (actual == null) {
    throw new Error('QueryParamDecoratorModule not imported');
  }
}

export function setInjector(parentInjector: Injector): void {
  injector = parentInjector;
}

export function getActivatedRoute(): never | ActivatedRoute {
  assertDefined(injector);
  // tslint:disable-next-line:no-non-null-assertion
  return injector!.get<ActivatedRoute>(ActivatedRoute);
}

export function getNgZone(): never | NgZone {
  assertDefined(injector);
  // tslint:disable-next-line:no-non-null-assertion
  return injector!.get<NgZone>(NgZone);
}
