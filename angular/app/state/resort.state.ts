import { Resort } from '../interfaces/resort';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ClickMap, HoverDatagrid, HoverMap } from './resort.state.actions';

export interface ResortStateModel {
  selectedOnDatagrid: Resort;
  selectedOnMap: Resort;
  hoveredOnMap: Resort;
}

@State<ResortStateModel>({
  name: 'resort',
})
@Injectable()
export class ResortState {
  @Action(HoverDatagrid)
  selectResortOnDatagrid(
    ctx: StateContext<ResortStateModel>,
    { payload }: HoverDatagrid
  ): void {
    ctx.patchState({ selectedOnDatagrid: payload });
  }

  @Action(HoverMap)
  hoverResortOnMap(
    ctx: StateContext<ResortStateModel>,
    { payload }: HoverMap
  ): void {
    ctx.patchState({ hoveredOnMap: payload });
  }

  @Action(ClickMap)
  clickedResortOnMap(
    ctx: StateContext<ResortStateModel>,
    { payload }: HoverMap
  ): void {
    console.log(payload);
    ctx.patchState({ selectedOnMap: payload });
  }

  @Selector()
  static selectedOnDatagrid(state: ResortStateModel): Resort {
    return state.selectedOnDatagrid;
  }

  @Selector()
  static hoveredOnMap(state: ResortStateModel): Resort {
    return state.hoveredOnMap;
  }

  @Selector()
  static selectedOnMap(state: ResortStateModel): Resort {
    return state.selectedOnMap;
  }
}
