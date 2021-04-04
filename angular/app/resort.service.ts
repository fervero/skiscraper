import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  APIFilterParams,
  APIPaginationParams,
  APISortParams,
  Breadcrumb,
} from './interfaces/models';

import { ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  APIResort,
  APIResorts,
  Resort,
  ResortsPaginatedResponse,
} from './interfaces/resort';

import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResortService {
  readonly DEFAULT_PAGE_SIZE = 10;
  readonly DEFAULT_PAGE = 1;
  private readonly url = 'resorts';

  constructor(private httpClient: HttpClient) {}

  getFromParams = (
    { size, page }: APIPaginationParams,
    filterParams: APIFilterParams = {},
    sortOptions: APISortParams = null
  ): Observable<ResortsPaginatedResponse> => {
    const paginationOptions = { size: '' + size, page: '' + page };

    const filterOptions = Object.fromEntries(
      Object.entries(filterParams).filter(([key, value]) => !!value)
    );

    return this.httpClient
      .get<APIResorts>(`${environment.apiUrl}/${this.url}`, {
        params: new HttpParams({
          fromObject: {
            ...paginationOptions,
            ...filterOptions,
            ...sortOptions,
          },
        }),
      })

      .pipe(
        map((res) => ({ ...res, resorts: res.resorts.map(this.parseResort) }))
      );
  };

  getFromParamMap = (
    paramMap: ParamMap
  ): Observable<ResortsPaginatedResponse> => {
    const size = +paramMap.get('size') || this.DEFAULT_PAGE_SIZE;
    const page = +paramMap.get('page') || this.DEFAULT_PAGE;
    const country = paramMap.getAll('country');
    const region = paramMap.get('region');
    const sort = paramMap.get('sort');

    return this.getFromParams(
      { page, size },
      { country: country.join(','), region },
      sort ? { sort } : null
    );
  };

  private parseResort = (resort: APIResort): Resort => ({
    ...resort,
    breadcrumbs1: this.parseBreadcrumb(resort.breadcrumbs1),
    breadcrumbs2: null,
    breadcrumbs3: null,
  });

  private parseBreadcrumb = (breadcrumbJSON: string): Breadcrumb[] =>
    (JSON.parse(breadcrumbJSON) as Breadcrumb[]).slice(0, 3);
}
