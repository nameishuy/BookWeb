import { Component, OnInit } from '@angular/core';
import { BookStoreAPI } from '../../services/bookstore.services';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private bookstore:BookStoreAPI){}
  UserLogined:any;
  username:String='';
  password:String='';

  ngOnInit(){

  }

  clickme(){
    this.bookstore.getLogin(this.username,this.password)
    .subscribe(
      data =>{
        this.UserLogined = data;
        console.log(this.UserLogined);
        alert(data.Messenger);
      }
    )
  }

}
