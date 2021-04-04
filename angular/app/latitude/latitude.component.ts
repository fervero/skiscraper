import { Component, Input, OnInit } from '@angular/core';
import { Resort } from '../interfaces/resort';
import { GeocodingService } from '../geocoding.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-latitude',
  templateUrl: './latitude.component.html',
  styleUrls: ['./latitude.component.scss'],
})
export class LatitudeComponent implements OnInit {
  @Input() resort: Resort;
  isLoading = false;

  constructor(
    private geocoding: GeocodingService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {}

  getCoordinates = (nameOrId: string | number): void => {
    this.isLoading = true;

    this.geocoding
      .get(nameOrId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => {
        this.resort = data;
      });
  };
}
