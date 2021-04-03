import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgSelectFilterComponent } from './dg-select-filter.component';

describe('DgSelectFilterComponent', () => {
  let component: DgSelectFilterComponent;
  let fixture: ComponentFixture<DgSelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DgSelectFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgSelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
