import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookStoreAPI } from '../../services/bookstore.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private bookstore: BookStoreAPI, private router: Router) { }
  UserLogined: any;
  username: String = '';
  password: String = '';

  ngOnInit() {

  }
  clickme() {
    this.bookstore.postLogin(this.username, this.password)
      .subscribe(
        data => {
          this.UserLogined = data;
          sessionStorage.setItem('UserLogin', JSON.stringify(data))        
          alert(this.UserLogined.Messenger);
          this.router.navigate(['']);
        }
      )
  }

}
