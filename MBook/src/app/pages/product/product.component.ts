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
  Messager: any = "";
  Search: any = "";
  p: any = "";
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

  GetByChuDe(id: string) {
    this.bookapi.getBookByChuDe(id).subscribe(data => {
      if (data.Messager != null) {
        this.Messager = data.Messager;
      } else {
        this.Messager="";
        console.log(this.Messager)
        this.Book = data;
        console.log(this.Book)
      }
    })
  }
}
