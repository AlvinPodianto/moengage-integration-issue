import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gesture, GestureController, ModalController } from '@ionic/angular';
import { SuggestionItem } from 'src/app/models/product.model';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent implements OnInit {
  sortItem:any[] = [];
  ratingItem:any[] = [];
  offerItem:any[] = [];
  selectedSortIndex:number = 0;
  selectedRatingIndex:number = null;
  selectedOfferIndex:number = null;
  categoryItems:SuggestionItem[] = [];
  selectedCategories:string[];

  brandItems:SuggestionItem[] = [];
  selectedBrands:string[];

  promoItems:SuggestionItem[] = [];
  selectedPromos:string[];

  isPrescription:boolean;

  isRecomended:boolean;

  hasAnyFilterAct:boolean = false; 
  minPrice:number = null;
  maxPrice:number = null;
  @ViewChild('puller', {static: true}) puller: ElementRef;

  constructor(protected modalController:ModalController, private gestureCtrl: GestureController) {  
    this.sortItem = [
      {
        id:0,
        name: "Paling Relevan",
        order:0,
        field:""
      },
      // {
      //   name: "Terdekat",
      //   order:-1,
      //   field:""
      // },
      // {
      //   name: "Terjauh",
      //   order:1,
      //   field:""
      // },
      {
        id:1,
        name: "Berdasarkan A-Z",
        order:1,
        field:"productName"
      },
      {
        id:2,
        name: "Berdasarkan Z-A",
        order:-1,
        field:"productName"
      },
      {
        id:3,
        name: "Harga Terendah",
        order:1,
        field:"finalPrice"
      },
      {
        id:4,
        name: "Harga Tertinggi",
        order:-1,
        field:"finalPrice"
      },
      {
        id:5,
        name: "Diskon Terendah",
        order:1,
        field:"discountPercentage"
      },
      {
        id:6,
        name: "Diskon Tertinggi",
        order:-1,
        field:"discountPercentage"
      }
    ];
    
    this.ratingItem = [ 
      {
        id:0,
        name: "Semua", 
        value:""
      }, 
      {
        name: "Bintang 4 ke atas", 
        value:4
      }, 
      {
        name: "Bintang 3 ke atas", 
        value:3
      }
    ];
    this.offerItem = [
      {
        id:0,
        name: "Semua", 
        value:""
      }, 
      {
        id:1,
        name: "Populer", 
        value:"isPopular"
      },   
      {
        id:2,
        name: "Rekomendasi", 
        value:"isRecomended"
      },  
      {
        id:3,
        name: "Promo", 
        value:"isProductSale"
      },  
      {
        id:4,
        name: "Best Selling", 
        value:"isBestSelling"
      },  
      {
        id:5,
        name: "Terbaru", 
        value:"isNewArrival"
      },  
      {
        id:6,
        name: "Top Offer", 
        value:"isTopOffer"
      },  
    ];
  }

  ngOnInit() {
    const gesture:Gesture = this.gestureCtrl.create({
      el:this.puller.nativeElement,
      threshold: 15,
      gestureName: 'my-gesture',
      onMove: (ev) => {
        this.makeMeFullHandler()
      }
    });
  
    gesture.enable();
  }

  onModalDismiss(){
    this.modalController.dismiss();
  }

  makeMeFullHandler()
  {
    let classList = document.querySelector('ion-modal').classList;
    if(classList.contains('srx-bottom-sheet-filter'))
    {
      classList.remove('srx-bottom-sheet-filter');
      classList.add('srx-modal-full');
    }
  }

  onSubmit()
  {
    this.modalController.dismiss({
      selectedCategories:this.selectedCategories,
      selectedBrands:this.selectedBrands,
      selectedPromos:this.selectedPromos,
      isPrescription:this.isPrescription,
      isRecomended:this.isRecomended,
      sort:this.sortItem[this.selectedSortIndex],
      rating:this.ratingItem.find(x => x.value == this.selectedRatingIndex)?.value,
      priceRange:[this.minPrice, this.maxPrice],
      offer:this.offerItem[this.selectedOfferIndex]
    });
  }

  isCategoryActive(name){
    return this.selectedCategories.includes(name);
  }

  isBrandActive(name){
    return this.selectedBrands.includes(name);
  }

  isPromoActive(name){
    return this.selectedPromos.includes(name);
  }

  selectCategoryHandler(event, name:string)
  {
    let element = event.target;
    let arrClass:any[] = element.className.split(" ");
    this.hasAnyFilterAct = true;

    if(arrClass.includes("active"))
      element.classList.remove("active");
    else
      element.classList.add("active");

    if(this.selectedCategories.includes(name))
    {
      let index = this.selectedCategories.indexOf(name);
      this.selectedCategories.splice(index,1);
    }
    else
      this.selectedCategories.push(name);
    
  }

  selectBrandHandler(event, name:string)
  {
    let element = event.target;
    let arrClass:any[] = element.className.split(" ");
    this.hasAnyFilterAct = true;

    if(arrClass.includes("active"))
      element.classList.remove("active");
    else
      element.classList.add("active");

    if(this.selectedBrands.includes(name))
    {
      let index = this.selectedBrands.indexOf(name);
      this.selectedBrands.splice(index,1);
    }
    else
      this.selectedBrands.push(name);
  }

  selectPrescriptionHandler(value)
  {
    this.isPrescription = value;
    this.hasAnyFilterAct = true;
  }

  selectRecomendedHandler(value)
  {
    this.isRecomended = value;
    this.hasAnyFilterAct = true;
  }

  selectPromoHandler(event, name:string)
  {
    let element = event.target;
    let arrClass:any[] = element.className.split(" ");
    this.hasAnyFilterAct = true;

    if(arrClass.includes("active"))
      element.classList.remove("active");
    else
      element.classList.add("active");

    if(this.selectedPromos.includes(name))
    {
      let index = this.selectedPromos.indexOf(name);
      this.selectedPromos.splice(index,1);
    }
    else
      this.selectedPromos.push(name);
  }
  selectSortHandler(i){
    this.selectedSortIndex = i; 
    this.hasAnyFilterAct = true;
  }
  selectRatingHandler(i){
    this.selectedRatingIndex = i; 
    this.hasAnyFilterAct = true;
  }
  selectOfferHandler(i){
    this.selectedOfferIndex = i; 
    this.hasAnyFilterAct = true;
  }
  isFilterFilled()
  {
    return this.selectedBrands.length > 0 || this.selectedCategories.length > 0 || this.selectedPromos.length > 0;
  }

  resetFilterHandler()
  {
    this.selectedBrands = [];
    this.selectedCategories = [];
    this.selectedPromos = [];
    this.hasAnyFilterAct = true;
    this.isPrescription = null;
    this.isRecomended = null;
    this.selectedSortIndex = 0;
    this.selectedRatingIndex = 0;
    this.selectedOfferIndex = 0;
    this.minPrice=null;
    this.maxPrice=null;
  }
  setPrice(min, max){
    this.minPrice=min;
    this.maxPrice=max;
    this.hasAnyFilterAct = true;
  }
}