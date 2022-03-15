import { Component, OnInit, ViewChild } from '@angular/core';
import { BookStoreAPI } from "../../services/bookstore.services"
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  BookSold1: any;
  BookSold2: any;
  newbook: any;
  Banner: any[] = [];
  constructor(private bookstore: BookStoreAPI, private router: Router) { }

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
    this.bookstore.get3newbook().subscribe(data => {
      this.newbook = data
    })
    this.bookstore.getBanner().subscribe(data => {
      this.Banner.push(data)
    })
  }

  isLoading() {
    if (this.BookSold1 == null) {
      return true;
    } else {
      return false;
    }
  }

  goDetails(id: string) {
    console.log('was clicked');
    this.router.navigate(['detail', id]);
  }
}
