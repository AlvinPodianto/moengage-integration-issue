import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../sevices';
 

@Injectable({
  providedIn: 'root'
})

export class AuthGuard  {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token !== undefined && token !== '' && token !== null) {
      return true;
    }

    if (token == null || token == undefined || token == '') {
      // load auth layout
      this.authService.setLoader(true);
      // set tab to default tab
      this.authService.setState('logOut');

      localStorage.setItem('LoginReturnUrl', state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }
}