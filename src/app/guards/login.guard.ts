import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.auth.getAuth().subscribe(user => {
        if (user) this.router.navigate(['/lista']);

        resolve(!user ? true : false);
      })
    })    
  }

}
