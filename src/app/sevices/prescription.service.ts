import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAppService } from "src/app/sevices/base/base.app.service";
import { environment } from "src/environments/environment";
import { PrescriptionPageQuery } from "../models/prescription.model";

@Injectable()

export class PrescriptionService extends BaseAppService {
	constructor(protected http: HttpClient) {
        super(http);
    }
    
	postPrescription(data, url:string="/Prescription/Upload") {
		let formData = new FormData();
		formData.append("file", data);
	
		return this.http.post(`${environment.coreServiceApiUrlV2}${url}`, formData, { headers: this.getMultiPartAuthHttpRequestHeader(),reportProgress:true,observe:'events' });
	}
    
	putPrescription(data, url:string) { 
		return this.http.put(`${environment.coreServiceApiUrlV2}${url}`, data, { headers: this.getMultiPartAuthHttpRequestHeader() });
	}

	getPrescriptionList(query:PrescriptionPageQuery)
	{
		const url = `${environment.coreServiceApiUrlV2}/Prescription/Upload?${this.fetchJSONtoUrl(query)}`;
		return this.http.get(url, {headers:this.getHttpRequestHeader()});
	}

	getPrescriptionById(prescriptionUploadId:number, prescriptionId:number)
	{
		const url = `${environment.coreServiceApiUrlV2}/Prescription/Upload/${prescriptionUploadId}?prescriptionId=${prescriptionId}`;
		return this.http.get(url, {headers:this.getHttpRequestHeader()});
	}

	postCartPrescription(id:number)
	{
		const url = `${environment.coreServiceApiUrlV2}/Cart/Prescription/${id}`;
		return this.http.post(url,null, {headers:this.getHttpRequestHeader()});
	}
	gePrescriptionSummary() {
		const url = `${environment.coreServiceApiUrlV2}/Prescription/Upload/Summary`;
		return this.http.get(url, { headers: this.getHttpRequestHeader() });
	}
}