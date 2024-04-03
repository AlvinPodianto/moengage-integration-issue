import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})

export class ParamsGuard  {
  constructor(private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, 
            routerState: RouterStateSnapshot): boolean | UrlTree {
    const params = route.data.params;
    const token = route.queryParamMap.has(params);  
    if(!token)
    this.router.navigate(['/']);

    return token; 
  }
}