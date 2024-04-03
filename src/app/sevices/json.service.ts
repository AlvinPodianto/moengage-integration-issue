import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ecommerceLayer, loginLayer, productEcommerce, products, productsVendor, registerLayer, transaction } from '../models/structure-data.model';
import { BehaviorSubject, Observable } from 'rxjs';
declare global {
	interface Window { dataLayer: any[]; }
}

@Injectable({
	providedIn: 'root'
})

export class JsonLDService {
	static scriptType = 'application/ld+json';
	protected windowDataLayerSubject: BehaviorSubject<string>;
	windowDataLayer$: Observable<string>;

	constructor(@Inject(DOCUMENT) private _document: Document) {
		this.windowDataLayerSubject = new BehaviorSubject<any>("");
		this.windowDataLayer$ = this.windowDataLayerSubject.asObservable();
	}

	removeStructuredData(): void {
		const els = [];
		['structured-data', 'structured-data-org'].forEach(c => {
			els.push(...Array.from(this._document.head.getElementsByClassName(c)));
		});
		els.forEach(el => this._document.head.removeChild(el));
	}

	insertSchema(schema: Record<string, any>, className = 'structured-data'): void {
		let script;
		script = this._document.createElement('script');
		script.setAttribute('class', className);
		script.type = JsonLDService.scriptType;
		script.text = JSON.stringify(schema);
		this._document.head.appendChild(script);
	}

	productSchema(data: any, ratingValue: number = 0, ratingCount: number = 0) {
		let productData: any;

		if (ratingCount > 0) {
			productData = {
				"@context": "http://schema.org/",
				"@type": "Product",
				"name": data?.product.name,
				"description": data?.product.description,
				"url": this._document.URL,
				"productID": data?.productId,
				"image": data?.product.photos[0],
				"brand": data?.product.brandName,
				"offers": {
					"@type": "AggregateOffer",
					"lowPrice": data?.product.finalPrice,
					"highPrice": data?.product.basePrice,
					"priceCurrency": "IDR",
					"seller": {
						"@context": "http://schema.org",
						"@type": "Organization",
						"name": data?.pharmacy.name,
						"url": environment.appUrlWww,
						"image": environment.appUrlWww + "/assets/icon/favicon.png",
						"aggregateRating": {
							"@type": "AggregateRating",
							"bestRating": 5,
							"worstRating": 1,
							"ratingCount": ratingCount,
							"ratingValue": ratingValue
						}
					},
					"itemCondition": "NewCondition",
					"availability": "http://schema.org/" + (data?.product.remainingStock > 0) ? 'InStock' : 'OutStock'
				},
				"aggregateRating": {
					"@type": "AggregateRating",
					"bestRating": 5,
					"worstRating": 1,
					"ratingCount": ratingCount,
					"ratingValue": ratingValue
				}
			};
		}
		else {
			productData = {
				"@context": "http://schema.org/",
				"@type": "Product",
				"name": data?.product.name,
				"description": data?.product.description,
				"url": this._document.URL,
				"productID": data?.productId,
				"image": data?.product.photos[0],
				"brand": data?.product.brandName,
				"offers": {
					"@type": "AggregateOffer",
					"lowPrice": data?.product.finalPrice,
					"highPrice": data?.product.basePrice,
					"priceCurrency": "IDR",
					"seller": {
						"@context": "http://schema.org",
						"@type": "Organization",
						"name": data?.pharmacy.name,
						"url": environment.appUrlWww,
						"image": environment.appUrlWww + "/assets/icon/favicon.png",
						"aggregateRating": {
							"@type": "AggregateRating",
							"bestRating": 5,
							"worstRating": 1,
							"ratingCount": 1,
							"ratingValue": 5
						}
					},
					"itemCondition": "NewCondition",
					"availability": "http://schema.org/" + (data?.product.remainingStock > 0) ? 'InStock' : 'OutStock'
				}
			};
		}

		this.insertSchema(productData);
	}

	breadcrumbSchema(data: any) {
		var categories = [];
		data?.product.categorySEO.forEach(
			(item: any) => {
				var categoryChild = [];
				categoryChild.push({
					"@type": "ListItem",
					"position": 1,
					"name": environment.appName,
					"item": environment.appUrlWww
				});
				var count = 2;
				item.details.forEach(
					(detail) => {
						categoryChild.push({
							"@type": "ListItem",
							"position": count,
							"name": detail.categoryName,
							"item": environment.appUrlWww + "/category/" + detail.categoryKey
						});
						count++;
					}
				);
				var category = {
					"@context": "http://schema.org/",
					"@type": "BreadcrumbList",
					"name": item.categoryName,
					"itemListElement": categoryChild
				};
				categories.push(category);
			}
		);
		var breadcrumbData = categories;

		this.insertSchema(breadcrumbData);
	}

	brandSchema(data: any) {
		var brandData = {
			"@context": "http://schema.org/",
			"@type": "Store",
			"name": data?.brandName,
			"url": environment.appUrlWww + "/brand/" + data?.brandKey,
			"image": data?.brandImageUrlPath,
			"address": { "@type": "PostalAddress", "addressLocality": "Jakarta Barat" },
			"aggregateRating": {
				"@type": "AggregateRating",
				"bestRating": 5,
				"worstRating": 1,
				"ratingCount": (data?.qtySold > 0) ? data?.qtySold : 1,
				"ratingValue": (data?.brandRating > 0) ? data?.brandRating : 5
			}
		}

		this.insertSchema(brandData);
	}

	categorySchema(data: any) {
		var brandData = {
			"@context": "http://schema.org/",
			"@type": "Store",
			"name": data?.name,
			"url": environment.appUrlWww + "/category/" + data?.fullSuffix,
			"image": data?.imageUrlPath,
			"address": { "@type": "PostalAddress", "addressLocality": "Jakarta Barat" }
			,
			"aggregateRating": {
				"@type": "AggregateRating",
				"bestRating": 5,
				"worstRating": 1,
				"ratingCount": 1,
				"ratingValue": 5
			}
		}

		this.insertSchema(brandData);
	}

	searchSchema(keyword: string) {
		var searchData = {
			"@context": "http://schema.org/",
			"@type": "WebSite",
			"url": environment.appUrlWww,
			"potentialAction": {
				"@type": "SearchAction",
				"target": environment.appUrlWww + `search?keyword={${keyword}}`,
				"query-input": `required name=${keyword}`
			}
		}

		this.insertSchema(searchData);
	}

	// Data Layer 
	pageView(title: string, customerId: any = "") {
		window.dataLayer.push({
			event: 'view' + this.capitalizeFirstLetter(title),
			userId: customerId || "",
			eventAction: 'screenView',
			// page: {
			// 	title: title,
			// 	path: "",
			// }
			page: 'homePage'
		});
	}

	screenView(eventName: string, label: string, eProps: any = null, eCom: any = null, eCategory: any = null) {
		var layer = {
			event: eventName,
			eventAction: 'screenView',
			labelName: label
		}

		if (eProps !== null)
			layer = Object.assign(layer, { eventProps: eProps });

		if (eCom !== null)
			layer = Object.assign(layer, { ecommerce: eCom });

		if (eCategory !== null)
			layer = Object.assign(layer, { eventCategory: eCategory });

		window.dataLayer.push(layer);
	}

	clickLayer(eventName: string, label: string, eProps: any = null, eCom: any = null, eCategory: any = null) {
		var layer = {
			event: eventName,
			eventAction: 'click',
			labelName: label
		}

		if (eProps !== null)
			layer = Object.assign(layer, { eventProps: eProps });

		if (eCom !== null)
			layer = Object.assign(layer, { ecommerce: eCom });

		if (eCategory !== null)
			layer = Object.assign(layer, { eventCategory: eCategory });

		window.dataLayer.push(layer);
	}

	swipeLayer(eventName: string, label: string, eventProps: any = null, ecommerce: any) {
		if (ecommerce !== null)
			window.dataLayer.push({
				event: eventName,
				eventAction: 'swipe',
				labelName: label,
				eventProps,
				ecommerce
			});
		else
			window.dataLayer.push({
				event: eventName,
				eventAction: 'swipe',
				labelName: label,
				eventProps
			});
	}

	scrollLayer(eventName: string, label: string, eventProps: any = null, ecommerce: any = null) {
		if (ecommerce !== null)
			window.dataLayer.push({
				event: eventName,
				eventAction: 'impression',
				labelName: label,
				eventProps,
				ecommerce
			});
		else
			window.dataLayer.push({
				event: eventName,
				eventAction: 'impression',
				labelName: label,
				eventProps
			});
	}

	// Data Layer 
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	transformProduct(products: any) {
		const newProduct = [];
		products = products.map(item => {
			var product: products = {
				id: item.productCode,
				name: item.productName,
				price: item.finalPrice,
				brand: item.brandName,
				category: item.categoryBreadcrumbs,
				quantity: item.qty
			};
			newProduct.push(product)
		});

		return newProduct;
	}


	// Data Layer Ecommerce
	pushDataLayer(object) {
		this.windowDataLayerSubject.next(object);
	}

	removeFromCart(products: products) {
		window.dataLayer.push({
			event: "EEaddToCart",
			ecommerce: {
				"currencyCode": "IDR",
				remove: {
					"products": [products]
				}
			}
		});
	}

	addTocart(products: products) {
		window.dataLayer.push({
			event: "EEaddToCart",
			ecommerce: {
				"currencyCode": "IDR",
				add: {
					"products": [products]
				}
			}
		});
	}

	checkout(products: any, step: number, payment: string = '') {
		let product = this.transformProduct(products);
		var actionField = {
			step: step
		}

		if (step == 4 && payment !== '') {
			var option = {
				option: payment
			};
			actionField = Object.assign(actionField, option);
		}

		window.dataLayer.push({
			event: "EEcheckout",
			ecommerce: {
				checkout: {
					actionField: actionField,
					products: product
				}
			}
		});
	}

	affiliateCheckout(products: any, payment: string, affiliate: any) {
		let product = this.transformProduct(products);
		window.dataLayer.push({
			event: "EEcheckout",
			ecommerce: {
				checkout: {
					actionField: {
						step: 4,
						option: payment
					},
					products: product
				}
			},
			affiliate: affiliate
		});
	}

	checkoutOption(paymentMethod: string) {
		window.dataLayer.push({
			event: "checkoutOption",
			ecommerce: {
				checkout_option: {
					actionField: {
						step: 3,
						option: paymentMethod
					}
				}
			}
		});
	}

	transaction(products: products, transaction: transaction) {
		window.dataLayer.push({
			event: "EEtransaction",
			ecommerce: {
				purchase: {
					actionField: {
						transaction
					},
					products: [products]
				}
			}
		});
	}
	// Data Layer Ecommerce  

	// TEST VENDOR TRACK
	onLoad(event: any, products: any, categorySuffix: any = null, source: any = null) {
		let product = this.transformProductVendor(products, categorySuffix);
		window.dataLayer.push({
			event: event,
			ecommerce: {
				item_list_id: source,
				item_list_name: source,
				items: product
			}
		});
	}

	onView(event: any, products: any, categorySuffix: any = null, total: any = 0, coupon: any = null, paymentMethod: any = null, tid: any = null, shipping: any = null, taxs: any = null) {
		let product = this.transformProductVendor(products, categorySuffix, event, coupon);
		if (coupon !== null) {
			if (event == 'purchase') {
				window.dataLayer.push({
					event: event,
					ecommerce: {
						transaction_id: tid,
						affiliation: null,
						value: total,
						tax: taxs,
						shipping: shipping,
						currency: "IDR",
						coupon: coupon,
						items: product,
					}
				});
			} else {
				window.dataLayer.push({
					event: event,
					ecommerce: {
						currency: "IDR",
						value: (event == 'view_cart' || event == 'begin_checkout' || event == 'add_payment_info') ? total : product[0]?.price,
						coupon: coupon,
						payment_type: paymentMethod,
						items: product,
					}
				});
			}
		} else {
			if (event == 'purchase') {
				window.dataLayer.push({
					event: event,
					ecommerce: {
						transaction_id: tid,
						affiliation: null,
						value: total,
						tax: taxs,
						shipping: shipping,
						currency: "IDR",
						items: product,
					}
				});

			} else {
				window.dataLayer.push({
					event: event,
					ecommerce: {
						currency: "IDR",
						value: (event == 'view_cart' || event == 'begin_checkout' || event == 'add_payment_info') ? total : product[0]?.price,
						items: product
					}
				});
			}
		}
	}

	transformProductVendor(products: any, categorySuffix: any = null, event: any = null, coupon: any = null) {
		const newProduct = [];
		if (products.length > 0) {
			let categories: any;

			if (event == 'view_cart' || event == 'remove_from_cart' || event == 'begin_checkout') {
			} 
			else {
				if (categorySuffix?.includes('/')) {
					categories = categorySuffix?.split('/');
				} 
				else {
					categories = [];
				}
			}

			products = products.map((item, i) => {
				if (event == 'view_cart' || event == 'remove_from_cart' || event == 'begin_checkout' || event == 'add_payment_info' || event == 'purchase') {
					categories = item.categoryBreadcrumbs
				}

				var product: productsVendor = {
					item_id: item.productCode,
					item_name: item.name ? item.name : item.productName,
					affiliation: null,
					coupon: coupon,
					currency: "IDR",
					discount: item?.discountPercentage,
					index: i + 1,
					item_brand: item?.brand ? item.brand : item.brandName,
					item_category: categories[0] || "",
					item_category2: categories[1] || "",
					item_category3: categories[2] || "",
					item_category4: categories[3] || "",
					item_category5: categories[4] || "",
					item_list_id: "related_products",
					item_list_name: "Related Products",
					item_variant: item?.dotColor?.name,
					location_id: null,
					price: item.finalPrice,
					quantity: event == 'add_to_cart' ? 1 : (item.quantity ? item.quantity : item.qty)
				};

				newProduct.push(product);
			});
		}

		return newProduct;
	}
	// TEST VENDOR TRACK

	loginLayer(data: loginLayer) {
		window.dataLayer.push(data);
	}

	registerLayer(data: registerLayer) {
		window.dataLayer.push(data);
	}

	transformProductEcommerce(products: any) {
		const newProduct = [];
		products = products.map((item, i) => {
			var product: productEcommerce = {
				item_id: item.productCode,
				item_name: item.productName,
				affiliation: "",
				coupon: item.voucherCode,
				discount: item.discountAmount,
				index: i + 1,
				item_brand: item.brand,
				item_category: item.categories[0],
				item_category2: item.categories[1],
				item_category3: item.categories[2],
				item_category4: item.categories[3],
				item_category5: item.categories[4],
				item_list_id: "",
				item_list_name: "",
				item_variant: "",
				location_id: item.pharmacyId,
				price: item.normalPrice,
				quantity: item.qty,
			};
			newProduct.push(product)
		});

		return newProduct;
	}

	ecommerce(event: string, transaction_id: string, total: number, products: any[]) {
		let product = this.transformProductEcommerce(products);
		var layer: ecommerceLayer = {
			event: event,
			ecommerce: {
				transaction_id: transaction_id,
				value: total,
				tax: 0,
				shipping: 0,
				currency: "IDR",
				coupon: "",
				items: product
			}
		}

		window.dataLayer.push({ ecommerce: null });
		window.dataLayer.push(layer);
	}
} 
