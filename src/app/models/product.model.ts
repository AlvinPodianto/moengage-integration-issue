import { IPagedQuery, IPagedResult, ISimpleMasterData } from "./master.model";

export class ProductPageQuery implements IPagedQuery {
	page: number;
	itemsPerPage: number;
	search: string;
	categories: string[];
	brands: string[];
	promos: string[];
	tags: string[];
	isRecomended: boolean;
	isPrescription: boolean;
	isBestSelling: boolean;
	isTopOffer: boolean;
	isNewArrival: boolean;
	isPopular: boolean;
	isProductSale: boolean;
	isExcludeRedDot: boolean;
	isDiscontinue: boolean;
	isAvailable: boolean;
	activeIngredient: string;
	rating: number;
	searchId: string;
	suffix: string;
	ExcludedProductId: number;
	field: string;
	order: number;
	minPrice:number;
	maxPrice:number;

	constructor() {
		this.page = 1;
		this.itemsPerPage = 8;
		this.search = "";
		this.categories = [];
		this.brands = [];
		this.promos = [];
		this.tags = [];
		this.isRecomended = null;
		this.isPrescription = null;
		this.isBestSelling = null;
		this.isTopOffer = null;
		this.isNewArrival = null;
		this.isPopular = null;
		this.isProductSale = null;
		this.isExcludeRedDot = null;
		this.isDiscontinue= null;
		this.isAvailable= null;
		this.activeIngredient = "";
		this.rating = null;
		this.suffix = "";
		this.searchId = "";
		this.ExcludedProductId = 0;
		this.field = "";
		this.order = null;
		this.minPrice=null;
		this.maxPrice=null;
	}
}

export class ProductPageResult implements IPagedResult {
	currentPage: number;
	totalRecords: number;
	data: any[];
	resultPerPage: number;
	brandSuggestions: SuggestionItem[];
	categorySuggestions: SuggestionItem[];
	promoSuggestions: SuggestionItem[];

	constructor() {
		this.currentPage = 0;
		this.totalRecords = 0;
		this.data = [];
		this.resultPerPage = 0;
		this.brandSuggestions = [];
		this.categorySuggestions = [];
		this.promoSuggestions = [];		
	}
}

export class SuggestionItem {
	name: string;
	iconUrl?: string;
	totalItem?: number;
	suffix?:string;
	type?:string;

	constructor() {
		this.name = "";
		this.iconUrl = "";
		this.totalItem = 0;
	}
}

export class Product implements ISimpleMasterData {
	id: number;
	name: string;
	photoUrl: string;
	quantity: number;
	soldQty: number;
	uom: ISimpleMasterData;
	basePrice: number;
	finalPrice: number;
	dotColor: ISimpleMasterData;
	rating: number;
	suffix: string;
	isPromoFreeShipping:boolean;
	productCode: string;
	brandName: string;
	categories: Categories[];
	remainingStock:number;
	isPharmacy:boolean;
	brand:string;
	category:string;
	isPrescription:boolean;
	isAvailable:boolean;
	isDiscontinue:boolean;
	soldQtyText:string;
	packaging:string;
	discountPercentage:number;
	soldQuantityText:string; 
	tagIconUrlPath:string;

	constructor() {
		this.id = 0;
		this.name = "";
		this.photoUrl = "";
		this.quantity = 0;
		this.soldQty = 0;
		this.uom = null;
		this.basePrice = 0;
		this.finalPrice = 0;
		this.dotColor = null;
		this.rating = 0;
		this.suffix = "";
		this.isPromoFreeShipping = false;
		this.productCode="";
		this.brandName="";
		this.categories = [];
		this.remainingStock=0;
		this.isPharmacy = false;
		this.brand = "";
		this.category = "";
		this.isPrescription = false;
		this.isAvailable = false;
		this.isPharmacy = false;
		this.soldQtyText = "";
		this.packaging = "";
		this.discountPercentage = 0;
		this.soldQuantityText = "";
		this.tagIconUrlPath = "";
	}
}

export class Categories {
	categoryKey: string;
	id: number;
	name: string;
  
	constructor() {
	  this.categoryKey = "";
	  this.id = 0;
	  this.name = "";
	}
  }

  
export class ProductReviewQuery implements IPagedQuery {
	page: number;
	itemsPerPage: number;
	search: string;
	containPhoto: boolean; 
	rate: number; 

	constructor() {
		this.page = 1;
		this.itemsPerPage = 8;
		this.search = ""; 
		this.containPhoto = false;
		this.rate = 0;
	}
}

export class ProductReviewPageResult implements IPagedResult {
	currentPage: number;
	totalRecords: number;
	data: any[];
	detail: any[];
	resultPerPage: number;
	averageRate: number;
	totalReviewer: number;
	constructor() {
		this.currentPage = 0;
		this.totalRecords = 0;
		this.data = [];
		this.detail = [];
		this.resultPerPage = 0;
		this.averageRate = 0;
		this.totalReviewer = 0;
	}
}

export class Review {
	reviewProductId: number; 
	rate: number; 
	reviewer: string; 
	reviewDate: string;
	content: string;
	imageUrl: [];
	showReviewerName:boolean;
	responses: reviewResponses[];

	constructor() {
		this.reviewProductId = 0;
		this.rate = 0;
		this.reviewer = "";
		this.reviewDate = "";
		this.content = "";
		this.imageUrl = [];
		this.showReviewerName= false; 
		this.responses = []; 
	}
}
export class reviewResponses {
	userName: string; 
	responseDate: string;
	content: string; 
	constructor() {
	  this.userName = ""; 
	  this.responseDate = "";
	  this.content = "";
	}
  }