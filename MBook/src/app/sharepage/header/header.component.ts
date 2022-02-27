import { Component, OnInit, Input } from '@angular/core';

import { BookStoreAPI } from '../../services/bookstore.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any;

  constructor(private bookstore: BookStoreAPI, private router: Router) { }
  UserLogined: any;

  ngOnInit(): void {
  }

  isAdmin() {
    return this.data.Role;
  }
  isLogined() {
    if (sessionStorage.getItem('UserLogin') != null) {
      this.data = JSON.parse(sessionStorage.getItem('UserLogin')!);
      return true;
    } else {
      return false;
    }
  }

  goProfile() {
    //console.log(this.share.id);
  }

  Signout() {
    sessionStorage.removeItem('UserLogin');
    //  this.share.setshare(null, null, null);
    this.router.navigate(['/login']);
  }

}
