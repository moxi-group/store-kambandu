import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router)
  {}

  private isLoggedIn: boolean = sessionStorage.getItem('sessionToken')? true : false

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if ( this.isLoggedIn ) {
      return true
    }

    this.router.navigate(['auth/login'])
    return false
  }
}



