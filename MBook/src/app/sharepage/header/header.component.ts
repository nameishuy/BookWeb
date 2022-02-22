import { Component, OnInit, Input } from '@angular/core';
import { ShareService } from 'src/app/sharepage/share.Service';
import { BookStoreAPI } from '../../services/bookstore.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any
  username: any;
  id: any;

  constructor(private bookstore: BookStoreAPI, private share: ShareService) { }
  UserLogined: any;

  ngOnInit(): void {
  }

  isLogined() {
    this.data = this.share.getshare();
    if (this.data.HoTen != null && this.data.id != null) {
      return true;
    } else {
      return false;
    }
  }

  Signout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('id');
    this.username = null;
    this.id = null;
    this.share.setshare(null, null)
  }

}
