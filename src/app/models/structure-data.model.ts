import { environment } from "src/environments/environment"

export const websiteSchema = {
	"@context": "http://schema.org",
	"@type": "WebSite",
	"url": environment.appUrlWww,
	"potentialAction": {
		"@type": "SearchAction",
		"target": environment.appUrlWww + "/search?keyword={search_term_string}",
		"query-input": "required name=search_term_string"
	}
}

export const orgSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"name": "farmaku",
	"url": environment.appUrlWww,
	"logo": environment.appUrlWww + "/home/logo-farmaku.png",
	"sameAs": [
		"https://www.facebook.com/farmaku",
		"https://www.twitter.com/farmaku",
		"https://www.linkedin.com/company/pt--farmaku/",
		"https://www.instagram.com/farmaku",
		"https://www.youtube.com/user/farmaku",
		"https://www.pinterest.com/farmaku"
	]
}

export class products {
	id: string;
	name: string;
	price: number;
	brand: string;
	category: any[];
	quantity: number;
	constructor() {
		this.id = "";
		this.name = "";
		this.price = 0;
		this.brand = "";
		this.category = [];
		this.quantity = 0;
	}
}

export class transaction {
	id: number;
	affiliation: string;
	revenue: number;
	tax: number;
	shipping: number;
	constructor() {
		this.id = 0;
		this.affiliation = "";
		this.revenue = 0;
		this.tax = 0;
		this.shipping = 0;
	}
}

export class items {
	item_id: string;
	item_name: string;
	constructor() {
		this.item_id = '';
		this.item_name = '';
	}
}

export class productsVendor {
	item_id: any;
	item_name: any;
	affiliation: any;
	coupon: any;
	currency: any;
	discount: any;
	index: any;
	item_brand: any;
	item_category: any;
	item_category2: any;
	item_category3: any;
	item_category4: any;
	item_category5: any;
	item_list_id: any;
	item_list_name: any;
	item_variant: any;
	location_id: any;
	price: any;
	quantity: any;
	constructor() {
		this.item_id = null;
		this.item_name = null;
		this.affiliation = null;
		this.coupon = null;
		this.currency = null;
		this.discount = null;
		this.index = null;
		this.item_brand = null;
		this.item_category = null;
		this.item_category2 = null;
		this.item_category3 = null;
		this.item_category4 = null;
		this.item_category5 = null;
		this.item_list_id = null;
		this.item_list_name = null;
		this.item_variant = null;
		this.location_id = null;
		this.price = null;
		this.quantity = null;
	}
}

export class loginLayer {
	event: "success_login";
	user_name: string;
	userId: number;
	medium: 'phone_number' | 'user_email';
	phone_number: string;
	email: string;
	gender: string;

	constructor() {
		this.event = "success_login";
		this.user_name = "";
		this.userId = 0;
		this.medium = "user_email";
		this.phone_number = "";
		this.email = "";
		this.gender = "";
	}
}

export class registerLayer {
	event: "registration_completed";
	user_name: string;
	userId: number;
	medium: "phone_number" | "user_email";
	phone_number: string;
	email: string;
	gender: string;
	constructor() {
		this.event = "registration_completed";
		this.user_name = "";
		this.userId = 0;
		this.medium = "phone_number";
		this.phone_number = "";
		this.email = "";
		this.gender = "";
	}
}

export class ecommerceLayer {
	event: string;
	ecommerce: Ecommerce;
	constructor() {
		this.event = "";
		this.ecommerce = new Ecommerce();
	}
}

export class Ecommerce {
	transaction_id: string;
	value: number;
	tax: number;
	shipping: number;
	currency: string;
	coupon: string;
	items: productEcommerce[];
	constructor() {
		this.transaction_id = "";
		this.value = 0;
		this.tax = 0;
		this.shipping = 0;
		this.currency = "";
		this.coupon = "";
		this.items = [];
	}
}

export class productEcommerce {
	item_id: string;
	item_name: string;
	affiliation: string;
	coupon: string;
	discount: number;
	index: number;
	item_brand: string;
	item_category: string;
	item_category2: string;
	item_category3: string;
	item_category4: string;
	item_category5: string;
	item_list_id: string;
	item_list_name: string;
	item_variant: string;
	location_id: string;
	price: number;
	quantity: number;
	constructor() {
		this.item_id = "";
		this.item_name = "";
		this.affiliation = "";
		this.coupon = "";
		this.discount = 0;
		this.index = 0;
		this.item_brand = "";
		this.item_category = "";
		this.item_category2 = "";
		this.item_category3 = "";
		this.item_category4 = "";
		this.item_category5 = "";
		this.item_list_id = "";
		this.item_list_name = "";
		this.item_variant = "";
		this.location_id = "";
		this.price = 0;
		this.quantity = 0;
	}
}