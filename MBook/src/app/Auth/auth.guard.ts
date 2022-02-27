import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor() { }
  canActivate() {
    if (sessionStorage.getItem('UserLogin') != null) {
      JSON.parse(sessionStorage.getItem('UserLogin')!);
      return true;
    }
    else return false;
  }
}
