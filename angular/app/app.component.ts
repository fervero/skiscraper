import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { pl } from './i18n/pl';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'skiscraper-front';
  alert$: Observable<string>;

  constructor(
    private httpClient: HttpClient,
    private translate: TranslateService,
    private router: Router,
    private alert: AlertService
  ) {
    translate.setTranslation('pl', pl);
    translate.use('pl');
    this.alert$ = this.alert.alert$;
  }
}
