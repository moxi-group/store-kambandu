import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InternalConsumptionService } from './internal-consumption.service';
import { ProductsService } from '../products/products.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { CategoriesService } from '../category/categories.service';
import { ApplicationService } from 'src/app/api/application.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
    selector: 'app-internal-consumption',
    templateUrl: './internal-consumption.component.html',
    styleUrls: ['./internal-consumption.component.scss'],
})
export class InternalConsumptionComponent implements OnInit {
    products: any = {};
    ItensMenu: any = {};
    loading: any
    total_without_tax: number = 0;
    total_received: number = 0;
    total_change = 0;
    total_tax: number = 0;
    total: number = 0;

    filter: any = {
        pagination: {
            page: 1,
            limit: 10,
            order_by: '-created_at',
            filter_column: null,
            filter_value: null,
            start_date: this._filterService.startOfMonth(),
            end_date: this._filterService.currentOfMonth()
        }
    }

    constructor(
        public _filterService: FilterService,
        public _internConsumptionService: InternalConsumptionService,
        public translate: TranslateService,
        public _dashboardService: DashboardService,
        public _categoryService: CategoriesService,
        public _applicationService: ApplicationService,
        private productsService: ProductsService
    ) {}

    ngOnInit(): void {
        this.loading_data();
    }

    loading_data() {
        this._onTableDataChange(this.filter.pagination)
    }

    _onTableDataChange(event: any): void{
        this.filter.pagination.page = Number.isInteger(event) ? event : 1
        this.get_intern_consumption()
    }

    _search(){
        this.get_intern_consumption()
    }

    get_intern_consumption() {
        this.loading = true
        this._internConsumptionService
        .get_intern_consumption(this.filter.pagination)
        .subscribe((response) => {
            this._internConsumptionService.intern_consumption = Object(response)
            this.loading = false
        });
    }


}
