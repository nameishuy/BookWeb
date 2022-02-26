import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ShareService } from '../../app/services/share.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  data:any;
  constructor(private AccountLogin:ShareService){}
  canActivate(){
    
    this.data = this.AccountLogin.getshare();
    if (this.data.HoTen != null && this.data.id != null) {
      return true;
    }else return false;

  }
  
}
