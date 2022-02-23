import { Component, OnInit, Input } from '@angular/core';
import { ShareService } from '../../services/share.service';
import { BookStoreAPI } from '../../services/bookstore.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any
  username: any;
  id: any;

  constructor(private bookstore: BookStoreAPI, private share: ShareService, private router:Router) { }
  UserLogined: any;

  ngOnInit(): void {
  }

  isAdmin(){
    return this.share.Role;
  }
  isLogined() {
    this.data = this.share.getshare();
    if (this.data.HoTen != null && this.data.id != null) {
      return true;
    } else {
      return false;
    }
  }

  goProfile(){
    console.log(this.share.id);
  }

  Signout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('id');
    this.username = null;
    this.id = null;
    this.share.setshare(null, null, null);
    this.router.navigate(['/login']);
  }

}
