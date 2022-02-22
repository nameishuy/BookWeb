import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookStoreAPI } from '../../services/bookstore.services';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/sharepage/share.Service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private bookstore: BookStoreAPI, private router: Router, private share: ShareService) { }
  UserLogined: any;
  username: String = '';
  password: String = '';

  ngOnInit() {

  }
  clickme() {
    this.bookstore.getLogin(this.username, this.password)
      .subscribe(
        data => {
          this.UserLogined = data;
          this.share.setshare(this.UserLogined.HoTen, this.UserLogined.id);
          alert(this.UserLogined.Messenger);
          this.router.navigate(['']);
        }
      )
  }

}
