import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor() { }
  canActivate() {
    if (sessionStorage.getItem('UserLogin') != null) {
      let data = JSON.parse(sessionStorage.getItem('UserLogin')!);
      if (data != null) {
        return true;
      } else return false;
    }
    else return false;
  }
}
