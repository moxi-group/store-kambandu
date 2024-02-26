import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvidersService } from '../../../purchases/providers/providers.service';
import { ProductsService } from '../../products/products.service';
import { ApplicationService } from 'src/app/api/application.service';
import { StoresService } from '../../stores/stores.service';
import { StocksService } from '../stocks.service';
import { Router } from '@angular/router';

/*
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { StocksService } from '../stocks.service';
import { ApplicationService } from 'src/app/api/application.service';
import { ProductsService } from '../../products/products.service';
import { ProvidersService } from '../../providers/providers.service';
import { StoresService } from '../../stores/stores.service';
*/

@Component({
  selector: 'CreateMovimentStockModal',
  templateUrl: './create-moviment-stock.component.html',
  styleUrls: ['./create-moviment-stock.component.scss'],
})
export class CreateMovimentStockComponent implements OnInit {
  movimentStockForm: any = FormGroup;
  result: any;

  @Input() modal: any = 'CreateMovimentStockModal';
  @Input() title: string = 'Movimentar Stock';
  @Input() moviment_stock: any;

  submitted = false;
  products: any = [];
  providers: any = [];
  stores: any = [];
  kind_moviments: any = [
    {
      name: 'Entrada',
      value: 'entrada',
    },
    {
      name: 'Saida',
      value: 'saida',
    },
    {
      name: 'Transferência',
      value: 'transferencia',
    },
  ];
  public defaultBindingsList: any = [];

  public selectedCity: any;

  constructor(
    public _formBuild: FormBuilder,
    private _storeService: StoresService,
    private _stockService: StocksService,
    private _applicationService: ApplicationService,
    private _productService: ProductsService,
    private _providerService: ProvidersService,
    private router: Router
  ) {
    this.loading();
  }

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm() {
    this.movimentStockForm = this._formBuild.group({
      contacts: this._formBuild.array([this.contactFrom()]),
    });
  }

  contactFrom() {
    return this._formBuild.group({
      uuid: [{ value: null, disabled: true }],
      quantity: [1, Validators.required],
      kind_moviment: ['entrada', Validators.required],
      provider_uuid: [null, Validators.required],
      product_uuid: [null, Validators.required],
      store_uuid: [null, Validators.required],
      purchase_price: [0],
    });
  }

  addNewContacts() {
    this.contacts.push(this.contactFrom());
  }

  removeContact(i: Required<number>) {
    this.contacts.removeAt(i);
  }

  get contacts() {
    return this.movimentStockForm.get('contacts') as FormArray;
  }

  onSave() {
    this.submitted = true;
    let moviments = this.movimentStockForm.value.contacts;
    this._create(moviments);
  }

  _create(moviments: any) {
    this._stockService
      .create_stock_moviment(moviments)
      .subscribe((response) => {
        this.submitted = false;
        this.loading();
        this._applicationService.SwalSuccess('Stock atualizado com sucesso!');
        this.router.navigate(['/managers/listing-stocks']);
      });
  }

  loading() {
    this.get_providers();
    this.get_products();
    this.get_stores();
  }

  get_providers() {
    this._providerService.get_providers().subscribe((response) => {
      this.providers = Object(response);
    });
  }

  get_stores() {
    this._storeService.get_stores().subscribe((response) => {
      this.stores = Object(response);
    });
  }

  get_products() {
    this._productService.get_products().subscribe((response) => {
      this.products = Object(response).items;
    });
  }

  /*



    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.moviment_stock !== undefined) {
            this.title = "Movimentar Stock";
            this.movimentStockForm.patchValue(this.moviment_stock);
        } else {
            this.title = "Movimentar Stock";
        }
    }

    get f() {
        return this.movimentStockForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.movimentStockForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.movimentStockForm.invalid) {
            return;
        }

        this._create(this.movimentStockForm.value)
    }



    */
}
