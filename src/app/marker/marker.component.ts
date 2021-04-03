import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Resort } from '../interfaces/resort';
import { Select, Store } from '@ngxs/store';
import { ResortState } from '../state/resort.state';
import { Observable } from 'rxjs';
import { marker, icon, Marker } from 'leaflet';
import { distinctUntilChanged, map } from 'rxjs/operators';

interface MarkerParams {
  latitude: number;
  longitude: number;
  opacity: number;
}

const compareMarkers = (first: MarkerParams, second: MarkerParams): boolean => {
  return (
    first.latitude === second.latitude &&
    first.longitude === second.longitude &&
    first.opacity === second.opacity
  );
};

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerComponent implements OnInit {
  @Input() resort: Resort;
  @Input() defaultOpacity = 0.5;
  @Input() accentOpacity = 1;
  @Output() markerClick: EventEmitter<MouseEvent> = new EventEmitter();
  @Output()
  markerMouseEnter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output()
  markerMouseLeave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Select(ResortState.selectedOnDatagrid) selectedResort$: Observable<Resort>;

  markerObject$: Observable<marker>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.markerObject$ = this.selectedResort$.pipe(
      map(this.computeMarkerParams),
      distinctUntilChanged(compareMarkers),
      map((resort) => this.createMarker(resort))
    );
  }

  private onClick = (event: MouseEvent): void => {
    this.markerClick.emit(event);
  };

  private onMouseEnter = (event: MouseEvent): void => {
    this.markerMouseEnter.emit(event);
  };

  private onMouseLeave = (event: MouseEvent): void => {
    this.markerMouseLeave.emit(event);
  };

  private computeMarkerParams = (selectedResort: Resort): MarkerParams => {
    return {
      latitude: +this.resort.latitude,
      longitude: +this.resort.longitude,
      opacity:
        selectedResort?.id && selectedResort?.id === this.resort?.id
          ? this.accentOpacity
          : this.defaultOpacity,
    };
  };

  private createMarker = ({
    latitude,
    longitude,
    opacity,
  }: MarkerParams): Marker => {
    return new marker([+latitude, +longitude], {
      opacity,
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    })
      .on('click', this.onClick)
      .on('mouseover', this.onMouseEnter)
      .on('mouseout', this.onMouseLeave);
  };
}
