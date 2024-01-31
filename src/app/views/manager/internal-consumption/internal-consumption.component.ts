import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InternalConsumptionService } from './internal-consumption.service';
import { ProductsService } from '../products/products.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { CategoriesService } from '../category/categories.service';
import { ApplicationService } from 'src/app/api/application.service';

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

  constructor(
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
    this.get_intern_consumption();
    //this.get_products_with_category()
  }

  get_intern_consumption() {
    this.loading = true
    this._internConsumptionService
      .get_intern_consumption()
      .subscribe((response) => {
        this._internConsumptionService.intern_consumption = Object(response).items;
        this.loading = false
      });
  }

/*   get_products_with_category() {
    this._categoryService.get_products_with_category().subscribe((response) => {
      this.ItensMenu = Object(response);

      if (response.length) {
        let first_category = response[0];
        if (first_category.products.length) {
          this._dashboardService.products = first_category.products.filter(
            (product: any) => product.price > 0
          );
        }
      }
    });
  } */

/*   pachValue(item: any) {
    this.products = item;
  }

  _add_line(product: any) {
    //product.price = Number(product.price).toFixed(2);

    let quantity = product.quantity ? product.quantity + 1 : 1;
    let total_without_tax = product.price * quantity;
    //let total_tax = (total_without_tax * (product.tax.percentage / 100))
    let total_tax = Number(
      (total_without_tax * (product.tax.percentage / 100)).toFixed(2)
    );
    let total = total_without_tax + total_tax;
    console.log('#', quantity);
    product.quantity = quantity;
    product.total_without_tax = total_without_tax;
    product.total_tax = total_tax;
    product.total = total;

    this._internConsumptionService.add_or_update_lines(product);
  } */
/*
  _submitte_invoice() {
    if (Boolean(this._internConsumptionService.current_customer_uuid)) {
      console.log("GOOD");

      this._internConsumptionService.produto.collaborator_uuid = this._internConsumptionService.current_customer_uuid;
    }
    this._create();
  } */



/*   _create() {
    this.loading = true
    this._internConsumptionService.create(this._internConsumptionService.produto)
    .subscribe(response => {
        this._applicationService.SwalSuccess("Faturação feito com sucesso!")
        this.loading = false
    }, (error) => {
        this._applicationService.SwalDangerConfirmation(error.error.detail)
        this.loading = false
    })
} */
}
