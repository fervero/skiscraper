import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapLink',
})
export class MapLinkPipe implements PipeTransform {
  private readonly simpleSearchURL =
    'https://www.google.com/maps/search/?api=1&query=';

  private readonly directionsSearchURL =
    'https://www.google.com/maps/dir/?api=1&destination=';

  private readonly origin = encodeURIComponent('Warsaw, Poland');

  transform(placeName: string): string {
    return this.directionsQuery(placeName);
  }

  private simpleQuery = (place: string): string =>
    this.simpleSearchURL + encodeURIComponent(place);

  private directionsQuery = (destination: string) =>
    this.directionsSearchURL + encodeURIComponent(destination);
}
