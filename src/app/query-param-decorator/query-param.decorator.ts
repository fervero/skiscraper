import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { getActivatedRoute } from './static-injector';

export function QueryParam(paramName?: string): PropertyDecorator {
  // tslint:disable-next-line
  return function (target: any, propertyKey: string): any {
    // tslint:disable-next-line
    const oldNgOnInit = target.ngOnInit || function () {};

    // tslint:disable-next-line
    target.ngOnInit = function () {
      const activatedRoute: ActivatedRoute = getActivatedRoute();

      this[propertyKey] = activatedRoute.queryParamMap.pipe(
        map((paramMap) => paramMap.get(paramName || propertyKey)),
        distinctUntilChanged()
      );

      oldNgOnInit.call(this);
    };
  };
}
