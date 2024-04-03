import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { mapProductStr } from '../helpers/helper'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MetaService {
  nofollow:boolean=false;
  constructor(private meta: Meta, private title: Title) {  
    if (!environment.production) { 
      this.nofollow=true;
    }
  }
  
  setDefaultMeta(pageType:string="home-desktop", nofollow:boolean=this.nofollow) {
      this.title.setTitle('Farmaku | Apotek Resmi Terpercaya');
      this.meta.updateTag(
      { 
        name:"description",
        content:"Farmaku adalah apotek online Indonesia terlengkap dan terpercaya yang menjual obat OTC, obat resep, produk kesehatan, kecantikan, dan perawatan tubuh." },
        `name='description'`
      );
      this.meta.updateTag(
      { 
        name:"page-type", 
        content:pageType },
        `name='page-type'`
      );
      this.meta.updateTag(
      { 
        property:"og:title", 
        content:"Farmaku | Apotek Resmi Terpercaya" },
        `property='og:title'`
      );
      this.meta.updateTag(
      { 
        property:"og:description", 
        content:"Farmaku adalah apotek online Indonesia terlengkap dan terpercaya yang menjual obat OTC, obat resep, produk kesehatan, kecantikan, dan perawatan tubuh." },
        `property='og:description'`
      );
      this.meta.updateTag(
      { 
        property:"og:site_name", 
        content:"farmaku" },
        `property='og:site_name'`
      );
      this.meta.updateTag(
      { 
        property:"og:url",
        content:window.location.origin },
        `property='og:url'`
      );
      this.meta.updateTag(
      { 
        property:"og:image", 
        content:window.location.origin+"/assets/icon/favicon.png" },
        `property='og:image'`
      );
      this.meta.updateTag(
      { 
        property:"og:type", 
        content:"website" },
        `property='og:type'`
      );
      this.meta.updateTag(
      { 
        property:"og:image:secure_url", 
        content:window.location.origin+"/assets/icon/favicon.png" },
        `property='og:image:secure_url'`
      );
      this.meta.updateTag(
      { 
        property:"og:image:type", 
        content:"image/png" },
        `property='og:image:type'`
      );
      this.meta.updateTag(
      { 
        property:"og:image:width", 
        content:"1200" },
        `property='og:image:width'`
      );
      this.meta.updateTag(
      { 
        property:"og:image:height", 
        content:"1200" },
        `property='og:image:height'`
      );
      this.meta.updateTag(
      { 
        property:"og:image:alt", 
        content:"Farmaku Logo" },
        `property='og:image:alt'`
      );
      this.meta.updateTag(
      { 
        name:"twitter:card", 
        content:"summary_large_image" },
        `name='twitter:card'`
      );
      this.meta.updateTag(
      { 
        name:"twitter:site", 
        content:"@farmaku" },
      `name='twitter:site'`
      );
      this.meta.updateTag(
      { 
        name:"twitter:creator", 
        content:"@farmaku" },
        `name='twitter:creator'`
      );
      this.meta.updateTag(
      { 
        name:"twitter:title", 
        content:"Farmaku | Apotek Resmi Terpercaya" },
        `name='twitter:title'`
      );
      this.meta.updateTag(
      { 
        name:"twitter:description", 
        content:"Farmaku adalah apotek online Indonesia terlengkap dan terpercaya yang menjual obat OTC, obat resep, produk kesehatan, kecantikan, dan perawatan tubuh." },
        `name='twitter:description'`
      );
      this.meta.updateTag(
      { 
        name:"twitter:image", 
        content:window.location.origin+"/assets/images/pesan-obat-dan-vitamin-mudah-Banner-IG.jpg" },
        `name='twitter:image'`
      );
      this.meta.updateTag(
      { 
        name:"branch:deeplink:$ios_deeplink_path",
        content:`${window.location.origin}` },
        `name='branch:deeplink:$ios_deeplink_path'`
      ); 
      this.meta.updateTag(
      { 
        name:"branch:deeplink:$android_deeplink_path",
        content:`${window.location.origin}` },
        `name='branch:deeplink:$android_deeplink_path'`
      ); 
      this.meta.updateTag(
      { 
        name:"branch:deeplink:$desktop_url",
        content:`${window.location.origin}` },
        `name='branch:deeplink:$desktop_url'`
      );
      if(nofollow){
        this.meta.updateTag(
        { 
          name:"robots",
          content:"noindex" },
          `name='robots'`
        );   
      }else{
        this.meta.updateTag(
        { 
          name:"robots",
          content:"index, follow" },
          `name='robots'`
        );  
      }
  }
  
  setMeta(title, description, images, imageAlt, pageType){   
    this.title.setTitle(title+' | Farmaku');
    this.meta.updateTag(
    { 
      name:"description",
      content:description},
      `name='description'`
    );
    this.meta.updateTag(
    { 
      name:"page-type", 
      content:pageType },
      `name='page-type'`
    );
    this.meta.updateTag(
    { 
      property:"og:title", 
      content:title },
      `property='og:title'`
    );
    this.meta.updateTag(
    { 
      property:"og:description", 
      content:description },
      `property='og:description'`
    );
    this.meta.updateTag(
    { 
      property:"og:site_name", 
      content:"farmaku" },
      `property='og:site_name'`
    );
    this.meta.updateTag(
    { 
      property:"og:url",
      content:window.location.origin },
      `property='og:url'`
    );
    this.meta.updateTag(
    { 
      property:"og:image", 
      content:images },
      `property='og:image'`
    );
    this.meta.updateTag(
    { 
      property:"og:type", 
      content:"website" },
      `property='og:type'`
    );
    this.meta.updateTag(
    { 
      property:"og:image:secure_url", 
      content:images },
      `property='og:image:secure_url'`
    );
    this.meta.updateTag(
    { 
      property:"og:image:type", 
      content:"image/jpg" },
      `property='og:image:type'`
    );
    this.meta.updateTag(
    { 
      property:"og:image:width", 
      content:"1200" },
      `property='og:image:width'`
    );
    this.meta.updateTag(
    { 
      property:"og:image:height", 
      content:"1200" },
      `property='og:image:height'`
    );
    this.meta.updateTag(
    { 
      property:"og:image:alt", 
      content:imageAlt },
      `property='og:image:alt'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:card", 
      content:"summary_large_image" },
      `name='twitter:card'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:site", 
      content:"@farmaku" },
    `name='twitter:site'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:creator", 
      content:"@farmaku" },
      `name='twitter:creator'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:title", 
      content:title },
      `name='twitter:title'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:description", 
      content:description },
      `name='twitter:description'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:image", 
      content:images },
      `name='twitter:image'`
    ); 
    this.meta.updateTag(
    { 
      name:"robots",
      content:"index, follow" },
      `name='robots'`
    ); 
  }

  setProductMeta(data?: Record<string, any>, ratingValue: number=0, ratingCount: number=0) { 
    const title = data.product.metaTitle != ''
    ? data.product.metaTitle
    : `${data.product.name}`;
    const desctiption = data.product.metaDescription != ''
    ? data.product.metaDescription
    : data.product.description;

    this.title.setTitle(title+' | Farmaku');
    this.meta.updateTag(
    { 
      name:"description",
      content:desctiption },
      `name='description'`
    );
    this.meta.updateTag(
    { 
      name:"page-type", 
      content:"productdetail-desktop" },
      `name='page-type'`
    );
    this.meta.updateTag(
    { 
      property:"og:title", 
      content:title },
      `property='og:title'`
    );
    this.meta.updateTag(
    { 
      property:"og:description", 
      content:desctiption },
      `property='og:description'`
    );
    this.meta.updateTag(
    { 
      property:"og:site_name", 
      content:"farmaku" },
      `property='og:site_name'`
    );
    this.meta.updateTag(
    { 
      property:"og:url",
      content:window.location.origin },
      `property='og:url'`
    );
    this.meta.updateTag(
    { 
      property:"og:image", 
      content:data.product.photos[0] },
      `property='og:image'`
    );
    this.meta.updateTag(
    { 
      property:"og:type", 
      content:"website" },
      `property='og:type'`
    );
    this.meta.updateTag(
    { 
      property:"og:image:secure_url", 
      content:data.product.photos[0] },
      `property='og:image:secure_url'`
    );
    this.meta.updateTag(
    { 
      property:"og:image:type", 
      content:"image/jpg" },
      `property='og:image:type'`
    );
    this.meta.updateTag(
    { 
      property:"og:image:width", 
      content:"1200" },
      `property='og:image:width'`
    );
    this.meta.updateTag(
    { 
      property:"og:image:height", 
      content:"1200" },
      `property='og:image:height'`
    );
    this.meta.updateTag(
    { 
      property:"og:image:alt", 
      content:data.product.name },
      `property='og:image:alt'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:card", 
      content:"summary_large_image" },
      `name='twitter:card'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:site", 
      content:"@farmaku" },
    `name='twitter:site'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:creator", 
      content:"@farmaku" },
      `name='twitter:creator'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:title", 
      content:title },
      `name='twitter:title'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:description", 
      content:desctiption },
      `name='twitter:description'`
    );
    this.meta.updateTag(
    { 
      name:"twitter:image", 
      content:data.product.photos[0] },
      `name='twitter:image'`
    ); 
      this.meta.updateTag(
      { 
        property:"product:price:amount", 
        content:data.product.finalPrice },
        `property='product:price:amount'`
      ); 
      this.meta.updateTag(
      { 
        property:"product:price:currency",
        content:"Rp" },
        `property='product:price:currency'`
      ); 
      this.meta.updateTag(
      { 
        name:"twitter:label1",
        content:"Harga" },
        `name='twitter:label1'`
      ); 
      this.meta.updateTag(
      { 
        name:"twitter:data1",
        content:data.product.finalPrice },
        `name='twitter:data1'`
      ); 
      this.meta.updateTag(
      { 
        name:"twitter:label2",
        content:"Lokasi" },
        `name='twitter:label2'`
      ); 
      this.meta.updateTag(
      { 
        name:"branch:deeplink:$ios_deeplink_path",
        content:`product/${mapProductStr(data.product.id, data.product.name)}` },
        `name='branch:deeplink:$ios_deeplink_path'`
      ); 
      this.meta.updateTag(
      { 
        name:"branch:deeplink:$android_deeplink_path",
        content:`product/${mapProductStr(data.product.id, data.product.name)}` },
        `name='branch:deeplink:$android_deeplink_path'`
      ); 
      this.meta.updateTag(
      { 
        name:"branch:deeplink:$desktop_url",
        content:`${window.location.origin}/product/${data.product.productKey}` },
        `name='branch:deeplink:$desktop_url'`
      ); 
      this.meta.updateTag(
      { 
        itemprop:"ratingValue",
        content:String(ratingValue) },
        `itemprop='ratingValue'`
      ); 
      this.meta.updateTag(
      { 
        itemprop:"bestRating", 
        content:"5" },
        `itemprop='bestRating'`
      ); 
      this.meta.updateTag(
      { 
        itemprop:"worstRating",
        content:"1" },
        `itemprop='worstRating'`
      ); 
      this.meta.updateTag(
      { 
        itemprop:"ratingCount", 
        content:String(ratingCount) },
        `itemprop='ratingCount'`
      ); 
      this.meta.updateTag(
      { 
        itemprop:"reviewCount", 
        content:String(ratingCount) },
        `itemprop='reviewCount'`
      ); 
      this.meta.updateTag(
      { 
        name:"twitter:data2",
        content:data.pharmacy.city },
        `name='twitter:data2'`
      ); 
      this.meta.updateTag(
      { 
        name:"robots",
        content:"index, follow" },
        `name='robots'`
      ); 
  }
}