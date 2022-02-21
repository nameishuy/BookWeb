import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookStoreAPI } from '../../services/bookstore.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private bookstore:BookStoreAPI,private router:Router){}
  UserLogined:any;
  username:String='';
  password:String='';

  @Output()  redirect:EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(){

  }

  clickme(){
    this.bookstore.getLogin(this.username,this.password)
    .subscribe(
      data =>{
        this.UserLogined = data;
        localStorage.setItem('id',this.UserLogined.id);
        localStorage.setItem('userName',this.UserLogined.HoTen);
        alert(this.UserLogined.Messenger);
        this.router.navigate(['']); 
      }
    )
  }

}
