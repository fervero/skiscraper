import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert$: Subject<string> = new Subject();

  constructor() {}

  push = (text) => this.alert$.next(text);
}
