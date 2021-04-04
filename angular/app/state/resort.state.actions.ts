import { Resort } from '../interfaces/resort';

export class HoverMap {
  static readonly type = 'Hover on resort on map';
  constructor(public payload: Resort) {}
}

export class ClickMap {
  static readonly type = 'Click on resort on map';
  constructor(public payload: Resort) {}
}

export class HoverDatagrid {
  static readonly type = 'Hover on resort on datagrid';
  constructor(public payload: Resort) {}
}

export class ClickDatagrid {
  static readonly type = 'Click on resort on datagrid';
  constructor(public payload: Resort) {}
}

export class GetResorts {
  static readonly type = 'Get resorts';
}
