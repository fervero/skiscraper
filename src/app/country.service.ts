import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly url = 'countries';

  constructor(private httpClient: HttpClient) {}

  getAll = (): Observable<string[]> =>
    this.httpClient.get<string[]>(`${environment.apiUrl}/${this.url}`);
}
