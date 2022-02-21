import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/services/Classes/Login';
import { BookStoreAPI } from '../../services/bookstore.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:any;
  id:any;

  constructor(private bookstore:BookStoreAPI) { }

  ngOnInit(): void {

    this.username = localStorage.getItem('userName');
    this.id = localStorage.getItem('id');

  }
  
  isLogined(){
    if(this.username != null && this.id != null){
      return true;
    }else{
      return false;
    }
  }

  Signout(){
    localStorage.removeItem('userName');
    localStorage.removeItem('id');
    this.username = null;
    this.id = null;
  }
  
}
