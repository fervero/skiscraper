import { Injectable } from '@angular/core';
import { isEqual } from 'lodash-es';

import {
  ClrDatagridComparatorInterface,
  ClrDatagridStateInterface,
} from '@clr/angular';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

interface SortInterface<T = any> {
  by: string | ClrDatagridComparatorInterface<T>;
  reverse: boolean;
}

interface Params {
  [key: string]: string | number;
}

@Injectable({
  providedIn: 'root',
})
export class DatasourceService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  refresh = (event: ClrDatagridStateInterface): void => {
    const newQueryParams = this.extractQueryParamsFromEvent(event);
    const queryParams = this.cleanQueryParams(newQueryParams);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  };

  private getFilterQueryParams = (filters: any[]) =>
    filters?.length
      ? filters.map(({ property, value }) => ({
          [property]: value,
        }))
      : [];

  private getSortQueryParams = (sort: SortInterface) =>
    sort
      ? {
          sort: sort.by + (sort.reverse ? ',DESC' : ',ASC'),
        }
      : null;

  private extractQueryParamsFromEvent = (
    event: ClrDatagridStateInterface
  ): Params => {
    const { from, size, current } = event.page;
    const { filters, sort } = event;
    const sortQueryParams = this.getSortQueryParams(sort);
    const paginationQueryParams = { from, size, page: current };
    const filterQueryParams = this.getFilterQueryParams(filters);

    return Object.assign(
      {},
      paginationQueryParams,
      sortQueryParams,
      ...filterQueryParams
    );
  };

  private cleanQueryParams = (params: Params): Params => {
    const snapshot = this.activatedRoute.snapshot.queryParamMap;
    const countryParams = this.resetOtherProp(
      params,
      snapshot,
      'country',
      'region'
    );
    const regionParams = this.resetOtherProp(
      params,
      snapshot,
      'region',
      'country'
    );
    const keysToBeNullified = [...countryParams, ...regionParams];

    const nullifiedParams = Object.fromEntries(
      keysToBeNullified.map((key) => [key, null])
    );

    return {
      ...params,
      ...nullifiedParams,
    };
  };

  private resetOtherProp = (
    newParams: Params,
    oldParamMap: ParamMap,
    propertyA: string,
    propertyB: string
  ): string[] =>
    !isEqual(newParams[propertyA] || [], oldParamMap.getAll(propertyA))
      ? [propertyB]
      : [];
}
