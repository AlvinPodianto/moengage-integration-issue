import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ISimpleMasterData {
  id: number;
  name: string;
}

export class Provinces implements ISimpleMasterData {
  id: number;
  name: string;
  polygonCoordinate: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.polygonCoordinate = "";
  }
}
export class Cities implements ISimpleMasterData {
  id: number;
  name: string;
  polygonCoordinate: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.polygonCoordinate = "";
  }
}

export class Districts implements ISimpleMasterData {
  id: number;
  name: string;
  polygonCoordinate: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.polygonCoordinate = "";
  }
}

export class Subdistricts implements ISimpleMasterData {
  id: number;
  name: string;
  polygonCoordinate: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.polygonCoordinate = "";
  }
}

export class ErrorInfo {
  code: string;
  detail: string;

  constructor() {
    this.code = "";
    this.detail = "";
  }
}

export class HttpErrorInfo {
  error: ErrorInfo;
  headers: HttpHeaders;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;

  constructor() {
    this.error = new ErrorInfo();
    this.headers = new HttpHeaders();
    this.message = "";
    this.name = "";
    this.ok = false;
    this.status = 0;
    this.statusText = "";
    this.url = "";
  }
}

export interface IOption {
  name: string;
  value: any;
}

export class OptionValue {
  id: number;
  name: string;
  value: boolean;

  constructor() {
    this.id = 0;
    this.name = "";
    this.value = false;
  }
}

export interface IAppService {
  currentState$: Observable<string>;
  loader$: Observable<Boolean>;

  setLoader(loader: Boolean): void;
  setState(state: string): void;
}

export interface IPagedResult {
  currentPage: number;
  totalRecords: number;
  data: any[];
  resultPerPage: number;
}

export interface IPagedQuery {
  page: number;
  itemsPerPage: number;
  search: string;
}

export interface ISortable {
  field: string;
  order: number;
}

export interface IBreadcrumb {
  title: string;
  url: string;
  isActive: boolean;
}

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

export class IInfo{
  whatsAppPharmacist: string;
  whatsAppCustomerService: string;
  whatsAppDoctor: string;
  whatsAppTelesales: string[];
  linkAppAndroid: string;
  linkAppIos: string;
  linkTwitter: string;
  linkFacebook: string;
  linkInstagram: string;
  linkTikTok: string;
  linkThreads: string;
  phone: string;
  email: string;
  website: string;
  constructor(){
    this.whatsAppPharmacist = "+62 812-1822-1822";
    this.whatsAppCustomerService = "+62 812-1600-1600";
    this.whatsAppDoctor = "87878088222";
    this.whatsAppTelesales = ["6281212160016","6281212160017","6281212160018"];
    this.linkAppAndroid = "https://play.google.com/store/apps/details?id=com.farmaku.app&hl=en";
    this.linkAppIos = "https://apps.apple.com/id/app/farmaku/id6449138635";
    this.linkTwitter = "https://twitter.com/farmaku";
    this.linkFacebook = "https://www.facebook.com/Farmaku-105105668390472";
    this.linkInstagram = "https://instagram.com/farmaku.id";
    this.linkTikTok = "https://www.tiktok.com/@farmaku";
    this.linkThreads = "https://www.threads.net/@farmaku.id";
    this.phone = "+62 811-1220-1616";
    this.email = "staging-info@farmaku.com";
    this.website = "https://staging-ui.securerx.id"
  }
}

export class Announcement {
  content: string;
  startDate: string;
  endDate: string;
  sequence: number;
  
  constructor() {
    this.content = "";
    this.startDate = "";
    this.endDate = "";
    this.sequence = 0;
  }
}