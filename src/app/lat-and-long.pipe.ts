import { Pipe, PipeTransform } from '@angular/core';
import { Resort } from './interfaces/resort';
import { marker, Marker } from 'leaflet';

@Pipe({
  name: 'latAndLong',
})
export class LatAndLongPipe implements PipeTransform {
  transform(value: Resort, selected: boolean = false): Marker {
    return marker([+value.latitude, +value.longitude], {
      opacity: selected ? 1 : 0.5,
    });
  }
}
