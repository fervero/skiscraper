import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResortsComponent } from './resorts/resorts.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { DgSelectFilterComponent } from './dg-select-filter/dg-select-filter.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';

import { ClarityIcons, mapIcon, copyToClipboardIcon } from '@cds/core/icon';

import '@cds/core/icon/register.js';
import { MapLinkPipe } from './map-link.pipe';
import { UrlEncodePipe } from './url-encode.pipe';
import { QueryParamDecoratorModule } from './query-param-decorator/query-param-decorator.module';
import { ResortsMapComponent } from './resorts-map/resorts-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LatitudeComponent } from './latitude/latitude.component';
import { NgxsModule } from '@ngxs/store';
import { ResortState } from './state/resort.state';
import { MarkerComponent } from './marker/marker.component';
import { LatAndLongPipe } from './lat-and-long.pipe';

ClarityIcons.addIcons(mapIcon);
ClarityIcons.addIcons(copyToClipboardIcon);

@NgModule({
  declarations: [
    AppComponent,
    ResortsComponent,
    DgSelectFilterComponent,
    MapLinkPipe,
    UrlEncodePipe,
    ResortsMapComponent,
    LatitudeComponent,
    MarkerComponent,
    LatAndLongPipe,
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    ClarityModule,
    LeafletModule,
    BrowserAnimationsModule,
    FormsModule,
    QueryParamDecoratorModule.forRoot(),
    ClipboardModule,
    NgxsModule.forRoot([ResortState]),
    TranslateModule.forRoot({
      defaultLanguage: 'pl',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
