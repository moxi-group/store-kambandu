import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { TaxesService } from 'src/app/views/configurations/taxes/taxes.service';
import { ApplicationService } from 'src/app/api/application.service';
import { CategoriesService } from '../../category/categories.service';

@Component({
  selector: 'CreateOrEditProductModal',
  templateUrl: './create-or-edit-product.component.html',
  styleUrls: ['./create-or-edit-product.component.scss']
})

export class CreateOrEditProductComponent implements OnInit {
    @Input() modal: any = "CreateOrEditProductModal"
    @Input() title: string = "Registar Produto"
    @Input() product: any
    @Input() productForm: FormGroup

    submitted = false
    taxes: any = []
    categories: any = []
    composed_products: any = []
    association_products: any = []
    disabled_check: boolean = true
    

    constructor(
        private _categoryService: CategoriesService,
        public _productsService: ProductsService,
        private _taxesService: TaxesService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.productForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            name: [null, Validators.required],
            price: [null, Validators.required],
            code: [null, Validators.required],
            description: [null, Validators.required],
            tax_uuid: [null, Validators.required],
            category_uuid: [null, Validators.required],
            image: [null],
            is_stocked: [false, Validators.required],
            is_composed: [false, Validators.required],
            is_active: true,
            composed_products: [[]]
        })

        this.get_taxes()
        this.get_categories()
        this.get_products_map()
    }


    ngOnInit(): void {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
     
        if (this.product !== undefined) {
            this.title = "Registar Produto";
            this.productForm.patchValue(this.product);
        } else {
            this.title = "Atualizar Produto";
        }
    }

    get f() {
        return this.productForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.productForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.productForm.invalid) {
            return;
        }

        if ( this.productForm.getRawValue().is_composed && this.composed_products.length === 0) {            
            this._applicationService.SwalDangerConfirmation("Produtos compostos devem ter os seus associados!");
            return;
        }

        this.productForm.patchValue({
            composed_products: this.composed_products.map((product: any) => ({
                product_uuid: product.product_uuid,
                quantity: Number(product.quantity),
                stock_uuid: null
            }))
        })

        if ( Boolean(this.productForm.getRawValue().uuid) ) {
            this._update(this.productForm.getRawValue().uuid, this.productForm.value)
        } else {
            this._create(this.productForm.value)
        }
    }

    _check_use_stock(){
        if (this.productForm.getRawValue().is_composed) { //checked
            this.disabled_check = true
            //this.productForm.getRawValue().composed_products = []
        } else {
            this.disabled_check = false
        }
    }

    _set_associate_product(product: any){
        let exist = this.composed_products.find((item: any) => item.product_uuid === product.product_uuid)
        
        if( exist ){
            product.quantity = 1
            this.composed_products = this.composed_products
            .filter((line: any) => line.product_uuid !== product.product_uuid)
        } else {
            this.composed_products.push( product )
        }
    }

    _set_quantity(event: any, product: any){
        let quantity = event.target.value

        if (Boolean(quantity)) {
            product.quantity = quantity
            return
        }
        product.quantity = 1
    }

    _create(form: FormGroup) {
        this._productsService.create(form)
        .subscribe(response => {
            this.submitted = false;
            this.get_products()
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(uuid: string, form: FormGroup){
        this._productsService.update(uuid, form)
        .subscribe(res => {
            this.submitted = false;
            this.get_products()
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    get_taxes() {
        this._taxesService
        .get_taxes()
        .subscribe(response => {
            this.taxes = Object(response)
        })
    }

    get_categories() {
        this._categoryService
        .get_categories()
        .subscribe(response => {
            this.categories = Object(response)
        })
    }

    get_products() {
        this._productsService
        .get_products()
        .subscribe(response => {
            this._productsService.products = Object(response)
        })
    }

    get_products_map() {
        this._productsService
        .get_products()
        .subscribe(response => {
            let result = Object(response)
            
            this.association_products = result.items.map((product: any) => ({
                product_uuid: product.uuid,
                name: product.name,
                quantity: 1,
                cheked: false
            }))
        })
    }

}
