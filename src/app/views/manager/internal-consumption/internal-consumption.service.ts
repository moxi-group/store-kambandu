import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
//import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

interface InvoiceObject {
  BD_ID: string;
  collaborator_uuid: String;
  description: String;
  lines: any;
}

@Injectable({
  providedIn: 'root',
})
export class InternalConsumptionService{
  intern_consumption: any = [];
  intern_consumption_lines: any;
  customer: any;
  serie: any;

  total_without_tax: number = 0;
  total_received: number = 0;
  total_change = 0;
  total_tax: number = 0;
  total: number = 0;

  invoiceObject: any = {
    BD_ID: null,
    collaborator_uuid: null,
    description: null,
    lines: [],
  };

  constructor(
    private _http_client: HttpClient,
  ) {
  }

  public _token = sessionStorage.getItem('sessionToken');
  public _companyToken = sessionStorage.getItem('CURRENT_COMPANY');
  private currentUser = sessionStorage.getItem('currentUser');

  public current_customer_uuid = JSON.parse(String(this.currentUser)).uuid;

  public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this._token}`)
    .set('header-company-uuid', `${this._companyToken}`);

  get_intern_consumption(filter: any = {}) {
    return this._http_client.get<any>(
      `${environment.fullBaseUrl}/intern_consumption`,
      {
        params: filter,
        headers: this.headers,
      }
    );
  }

  get_intern_consumption_lines(data: any) {
    console.log(data);

    this.intern_consumption_lines = data;
  }

  update(uuid: string, data: any) {
    return this._http_client.post<any>(
      `${environment.fullBaseUrl}/customers/${uuid}`,
      data,
      { headers: this.headers }
    );
  }
  add_or_update_lines(product: any) {
    let productIndex = this.invoiceObject.lines.findIndex(
      (element: any) => element.uuid === product.uuid
    );
    if (productIndex === -1 || this.invoiceObject.lines.length == 0) {
      this.invoiceObject.lines.push(product);
    }
  }

  async full_calculation() {
    let lines = this.invoiceObject.lines;
    this.total_without_tax = lines.reduce(
      (partialSum: any, line: any) => partialSum + line.total_without_tax,
      0
    );
    this.total_tax = Number(
      lines
        .reduce((partialSum: any, line: any) => partialSum + line.total_tax, 0)
        .toFixed(2)
    );
    this.total = lines.reduce(
      (partialSum: any, line: any) => partialSum + line.total,
      0
    );
    this.total_received = this.invoiceObject.payment_lines.reduce(
      (partialSum: any, line: any) => partialSum + line.amount_received,
      0
    );
  }

  reset() {
    this.customer = {};
    this.serie = {};

    this.total_without_tax = 0;
    this.total_received = 0;
    this.total_tax = 0;
    this.total_change = 0;
    this.total = 0;

    this.invoiceObject = {
      uuid: null,
      customer_uuid: null,
      serie_uuid: null,
      lines: [],
      payment_lines: [],
    };
  }
}
