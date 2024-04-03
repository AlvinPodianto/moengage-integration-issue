import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../sevices';
 

@Injectable({
  providedIn: 'root'
})

export class SessionGuard  {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token'); 
    if(route.url[0].path == 'register' && !sessionStorage.getItem('tmpEmail'))
    this.router.navigate(['/404']);
  
    if (token !== undefined && token !== '' && token !== null) {
      this.authService.setLoader(true);
      this.router.navigate(['/account']);
      return false;
    }
  }
}