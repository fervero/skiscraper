import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResortService } from '../resort.service';
import { CountryService } from '../country.service';
import { Resort, ResortsPaginatedResponse } from '../interfaces/resort';
import { QueryParam } from '../query-param-decorator/query-param.decorator';
import { DatasourceService } from '../datasource.service';
import { Select, Store } from '@ngxs/store';
import { HoverDatagrid } from '../state/resort.state.actions';
import { ResortState } from '../state/resort.state';

@Component({
  selector: 'app-resorts',
  templateUrl: './resorts.component.html',
  styleUrls: ['./resorts.component.scss'],
})
export class ResortsComponent implements OnInit {
  data: ResortsPaginatedResponse;
  error: string;
  countries$: Observable<string[]>;
  readonly DEFAULT_PAGE_SIZE = 10;
  @QueryParam() country: Observable<string>;
  @Select(ResortState.hoveredOnMap) hoveredOnMap$: Observable<Resort>;
  @Select(ResortState.selectedOnMap) selectedOnMap$: Observable<Resort>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private resortService: ResortService,
    private countryService: CountryService,
    private datasource: DatasourceService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.countries$ = this.countryService.getAll();

    this.activatedRoute.queryParamMap
      .pipe(
        debounceTime(1),
        switchMap((paramMap) => this.resortService.getFromParamMap(paramMap))
      )
      .subscribe(this.onLoad, this.onError);
  }

  refresh = (event: ClrDatagridStateInterface): void => {
    this.datasource.refresh(event);
  };

  onMouseEnter = (resort: Resort): void => {
    this.store.dispatch(new HoverDatagrid(resort));
  };

  onMouseLeave = (resort: Resort): void => {
    this.store.dispatch(new HoverDatagrid(null));
  };

  trackById = (index: number, { id }: Resort) => id;

  private onLoad = (res) => {
    this.data = res;
    this.error = null;
  };

  private onError = (err) => {
    this.error = err;
  };
}
