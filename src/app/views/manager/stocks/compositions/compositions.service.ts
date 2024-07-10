import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompostionsService {

    constructor(private _http_client: HttpClient) { }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')

    stocks: any = []
    
    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)

    create(data: any, product_uuid: string) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/products/add-composed-products/${product_uuid}`,
            data,{ headers: this.headers}
        )
    }

    get_compositions_product(stock_uuid: string) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/products/get-composed-products-by-stock/${stock_uuid}`, 
            { headers: this.headers }
        )
    }

    get_stock_of_store(product_uuid: string, store_uuid: string) {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/stocks/get-stock-by-product-and-store/${product_uuid}/${store_uuid}`, 
            { headers: this.headers }
        )
    }




}
