import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class ActiveRouteService {
	protected currentRouteSubject: BehaviorSubject<string>;
	currentRoute$: Observable<string>;

	constructor() {
		this.currentRouteSubject = new BehaviorSubject<string>("");
		this.currentRoute$ = this.currentRouteSubject.asObservable();
	}

	setCurrentRoute(data: string) {
		this.currentRouteSubject.next(data);
	}
}