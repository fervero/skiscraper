import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  ClrDatagridColumn,
  ClrDatagridFilter,
  ClrDatagridFilterInterface,
} from '@clr/angular';

@Component({
  selector: 'app-dg-select-filter',
  templateUrl: './dg-select-filter.component.html',
  styleUrls: ['./dg-select-filter.component.css'],
})
export class DgSelectFilterComponent
  implements OnInit, ClrDatagridFilterInterface<any> {
  @Input() values: string[] = [];
  @Input() param: Observable<string | string[]>;
  valuesDictionary: { [key: string]: string } = {};
  propertyName: string;

  changes = new Subject<any>();
  selectValue: string[] = null;

  constructor(
    private filterContainer: ClrDatagridFilter,
    private column: ClrDatagridColumn
  ) {
    filterContainer.setFilter(this);
  }

  ngOnInit(): void {
    this.propertyName = this.column.field;
    this.selectValue = (this.column.filter as any).value;
    this.param.subscribe(this.onValueChange);
  }

  onCheckboxChange = () => {
    const values = this.getCheckedCheckboxes();

    if (values?.length) {
      this.onValueChange(values.sort());
    } else {
      this.onValueChange(null);
    }
  };

  getCheckedCheckboxes = (): string[] =>
    Object.entries(this.valuesDictionary)
      .filter(([key, value]) => value)
      .map(([key, value]) => key);

  get state(): any {
    return {
      property: this.column.field,
      value: this.selectValue,
    };
  }

  isActive(): boolean {
    return !!this.selectValue;
  }
  accepts(user: any): boolean {
    return true;
  }

  reset = () => {
    this.valuesDictionary = {};
    this.onValueChange(null);
  };

  private onValueChange = (value: string[]): void => {
    this.selectValue = value;
    this.changes.next(value);
    // this.filterContainer.open = false;
  };
}
