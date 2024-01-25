import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CategoriesService } from './categories.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    category: any = {}
    loading: boolean = false

    constructor(
        public _categoryService: CategoriesService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()

    }

    loading_data() {
        this.get_categories();
    }

    get_categories() {
        this.loading =  true
        this._categoryService
        .get_categories()
        .subscribe(response => {
            this._categoryService.categories = Object(response)
            this.loading = false
        })
    }

    pachValue(item: any) {
        this.category = item
    }
}
