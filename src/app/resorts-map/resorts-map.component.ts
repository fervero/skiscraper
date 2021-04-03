import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { Resort } from '../interfaces/resort';
import { ResortState } from '../state/resort.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ClickMap, HoverMap } from '../state/resort.state.actions';

@Component({
  selector: 'app-resorts-map',
  templateUrl: './resorts-map.component.html',
  styleUrls: ['./resorts-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResortsMapComponent implements OnInit, OnChanges {
  @Input() selectedResort: Resort;
  @Input() resorts: Resort[] = [];
  @ViewChild('mapRef') mapRef: LeafletDirective;
  @Select(ResortState.selectedOnDatagrid) selectedResort$: Observable<Resort>;
  options = null;
  center = null;

  constructor(private ref: ChangeDetectorRef, private store: Store) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.resorts) {
      const lat = this.resorts[0].latitude;
      const lng = this.resorts[0].longitude;

      this.center = latLng(lat, lng);

      this.options = {
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        ],
        zoom: 6,
        center: latLng(lat, lng),
      };

      this.ref.detectChanges();
    }
  }

  trackById = (index: number, { id }: Resort) => id;

  hover = (resort: Resort): void => {
    this.store.dispatch(new HoverMap(resort));
  };

  selectResort = (resort: Resort): void => {
    this.store.dispatch(new ClickMap(resort));
  };
}
