import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly url = 'countries';
  constructor(private httpClient: HttpClient) {}

  getAll = () =>
    this.httpClient.get<string[]>(`${environment.apiUrl}/${this.url}`);
}
