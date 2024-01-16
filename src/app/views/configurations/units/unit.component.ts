import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UnitsService } from './unit.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-units',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitsComponent implements OnInit {
  unit: any = {};

  filter_options: any = [
    {
      value: 'name',
      description: 'Nome',
    },
    {
      value: 'description',
      description: 'Descrição',
    },
    {
      value: 'created_at',
      description: 'Data',
    },
  ];

  constructor(
    public _filterService: FilterService,
    public __unitsService: UnitsService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loading_data();
  }

  loading_data() {
    this._onTableDataChange(this._filterService.pagination);
  }

  _onTableDataChange(filterEmit: any): void {
    this._filterService.pagination = filterEmit;
    this.__unitsService
      .get_units(this._filterService.pagination)
      .subscribe((response) => {
        this.__unitsService.units = Object(response);
      });
  }

  pachValue(item: any) {
    this.unit = item;
  }
}
