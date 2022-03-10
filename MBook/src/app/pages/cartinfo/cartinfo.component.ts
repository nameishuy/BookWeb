import { Component, OnInit } from '@angular/core';
import { BookStoreAPI } from 'src/app/services/bookstore.services';

@Component({
  selector: 'app-cartinfo',
  templateUrl: './cartinfo.component.html',
  styleUrls: ['./cartinfo.component.css']
})
export class CartinfoComponent implements OnInit {

  constructor(private bookapi: BookStoreAPI) { }

  Arraylength: any = [];
  ArrayBook: any = [];
  length: any;
  Total: number = 0;

  ngOnInit(): void {
    this.getbook();
    this.Sum();
  }

  Sum() {
    if (sessionStorage.getItem("listCart")) {
      const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
      this.Total = sessionCart.reduce((acc: any, val: any) => {
        return acc + (val.count * val.unitprice)
      }, 0)
    }
  }

  getbook() {
    const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
    this.length = sessionCart.length;
    if (sessionCart != null) {
      for (let i = 0; i < sessionCart.length; i++) {
        this.bookapi.get1Book(sessionCart[i].idcart).subscribe(data => {
          this.ArrayBook.push(data);
        })
        this.Arraylength.push(sessionCart[i].count)
      }
    }
  }

  lessProducts(i: number) {
    const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
    for (let index = 0; index < this.Arraylength.length; index++) {
      for (let y = 0; y < sessionCart.length; y++) {
        if (i == index && i == y) {
          if (this.Arraylength[index] == 1) {
            this.Arraylength[index] = 1
          } else {
            this.Arraylength[index]--;
          }
          sessionCart[y].count = this.Arraylength[index];
        }
      }
    }
    sessionStorage.setItem("listCart", JSON.stringify(sessionCart));
    this.Sum();
  }

  moreProducts(i: number) {
    const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
    for (let index = 0; index < this.Arraylength.length; index++) {
      for (let y = 0; y < sessionCart.length; y++) {
        if (i == index && i == y) {
          this.Arraylength[index]++;
          sessionCart[y].count = this.Arraylength[index];
        }
      }
    }
    sessionStorage.setItem("listCart", JSON.stringify(sessionCart));
    this.Sum();
  }

  onCheckAll() {
    let checkAll = <HTMLInputElement>document.getElementById("checkbox__all-product");
    let checkItems = document.querySelectorAll("#checkbox__product") as NodeListOf<HTMLInputElement>;
    if (checkAll && checkAll.checked) {
      checkItems.forEach(item => item.checked = true);
    } else {
      checkItems.forEach(item => item.checked = false);
    }
  }
}
