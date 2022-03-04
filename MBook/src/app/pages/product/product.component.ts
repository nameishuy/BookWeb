import { Component, OnInit } from '@angular/core';
import { BookStoreAPI } from 'src/app/services/bookstore.services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private bookapi: BookStoreAPI) { }
  categories: any;
  Book: any;
  ngOnInit(): void {
    this.getCategory();
    this.getbook()
  }

  getCategory() {
    this.bookapi.getCategory()
      .subscribe(data => {
        this.categories = data;
      })
  }

  getbook() {
    this.bookapi.getAllBook().subscribe(data => {
      this.Book = data
    })
  }
}
