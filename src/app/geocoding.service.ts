import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Resort } from './interfaces/resort';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private readonly url = `coordinates`;

  constructor(private httpClient: HttpClient, private alert: AlertService) {}

  get = (nameOrId: string | number): Observable<Resort> =>
    this.httpClient
      .get<Resort>(
        `${environment.apiUrl}/${this.url}`,
        this.getParams(nameOrId)
      )
      .pipe(
        catchError((e) => {
          console.error(e?.error?.name);
          this.alert.push(e?.error?.name);
          return throwError(e);
        })
      );

  private getParams = (nameOrId: string | number) =>
    typeof nameOrId === 'string'
      ? {
          params: { name: nameOrId },
        }
      : {
          params: { id: '' + nameOrId },
        };
}
