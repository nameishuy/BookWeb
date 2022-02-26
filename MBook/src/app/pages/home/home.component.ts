import { Component, OnInit, ViewChild } from '@angular/core';
import { BookStoreAPI } from "../../services/bookstore.services"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  BookSold1: any;
  BookSold2: any;
  constructor(private bookstore: BookStoreAPI) { }

  ngOnInit(): void {
    this.getbooksold1()
  }

  getbooksold1() {
    this.bookstore.getbooksold1().subscribe(data => {
      this.BookSold1 = data
    })
    this.bookstore.getbooksold2().subscribe(data => {
      this.BookSold2 = data
    })
  }

  isLoading(){
    if(this.BookSold1 == null){
      return true;
    }else{
      return false;
    }
  }
}
