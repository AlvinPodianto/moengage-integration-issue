import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseAppService } from "src/app/sevices/base/base.app.service";
import { ProductPageQuery } from "../models/product.model";

@Injectable()
export class ProductService extends BaseAppService {

	constructor(protected http: HttpClient) {
		super(http);
		this.serviceUri = `${environment.coreServiceApiUrlV2}/Products`;
	}
    
	getProductList(query: ProductPageQuery) {
		let url = `${this.serviceUri}?${this.fetchJSONtoUrl(query)}`;
		return this.http.get(url, { headers: this.getHttpRequestHeader() });
	}
}
