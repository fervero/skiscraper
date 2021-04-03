import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { mockCountries } from './mock-data/countries';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly url = 'countries';
  constructor(private httpClient: HttpClient) {}

  getAll = (): Observable<string[]> =>
    environment.production
      ? of(mockCountries)
      : this.httpClient.get<string[]>(`${environment.apiUrl}/${this.url}`);
}
