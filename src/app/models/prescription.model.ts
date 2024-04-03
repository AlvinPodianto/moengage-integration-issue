import { IPagedQuery } from "src/app/models/master.model";

export class PrescriptionPageQuery implements IPagedQuery{
    page: number;
    itemsPerPage: number;
    search: string;
    prescriptionUploadStatusId?:number;

    constructor()
    {
        this.page = 1;
        this.itemsPerPage = 8;
        this.search = "";
    }
}

export class Prescription{
    id: number;
    prescriptionUploadNumber: string;
    prescriptionUploadStatusId: number;
    prescriptionUploadStatus: string;
    prescriptionUploadUrl: string;
    notes: string;
    uploadedDate: string;
    prescriptionId: number;
    prescriptionNumber: string;
    prescriptionTypeId: number;
    code: string;
    description: string;
    totalItems: number;
    totalQty: number;
    placeOfPracticeName: string;
    doctorName: string;
    validUntil: string;
    note: string;
    iteration: number;
    prescriptionStatusId: number;
    prescriptionStatus: string;
    transactionDoctorId: number;
    transactionPlaceOfPracticeId: number;
    products:PrescriptionProduct[];
    deliveryInformation: string;

    constructor()
    {
        this.id = 0;
        this.prescriptionUploadNumber = "";
        this.prescriptionUploadStatusId = 0;
        this.prescriptionUploadStatus = "";
        this.prescriptionUploadUrl = "";
        this.notes = "";
        this.uploadedDate = "";
        this.prescriptionId = 0;
        this.prescriptionNumber = "";
        this.prescriptionTypeId = 0;
        this.code = "";
        this.description = "";
        this.totalItems = 0;
        this.totalQty = 0;
        this.placeOfPracticeName = "";
        this.doctorName = "";
        this.validUntil = "";
        this.note = "";
        this.iteration = 0;
        this.prescriptionStatusId = 0;
        this.prescriptionStatus = "";
        this.transactionDoctorId = 0;
        this.transactionPlaceOfPracticeId = 0;
        this.products = [];
        this.deliveryInformation="";
    }
}

export class PrescriptionProduct{
    id: number;
    transactionProductId: number;
    productId: number;
    productName: string;
    quantity: number;
    uom: string;
    note: string;
    isConcoction: boolean;
    concoctionType: string;
    imageUrl: string;
    dimensionWeight: number;
    dotColorName: string;
    productCode: string;

    constructor()
    {
        this.id = 0;
        this.transactionProductId = 0;
        this.productId = 0;
        this.productName = "";
        this.quantity = 0;
        this.uom = "";
        this.note = "";
        this.isConcoction = true;
        this.concoctionType = "";
        this.imageUrl = "";
        this.dimensionWeight = 0;
        this.dotColorName = "";
        this.productCode = "";
    }
}

export class PrescriptionRedeemQuery{
    prescriptionId:number;
    productId:number;
    constructor(){
        this.productId = 0;
        this.prescriptionId = 0;
    }
}

export enum PrescriptionUploadStatusId{
    Reviewed = 1,
    Verified = 2,
    Rejected = 3,
    Consultation = 4
}

export enum PrescriptionUploadStatus{
    Reviewed = "Menunggu Verifikasi",
    Verified = "Terverifikasi",
    Rejected = "Ditolak",
    Consultation = "Konsultasi"
}
