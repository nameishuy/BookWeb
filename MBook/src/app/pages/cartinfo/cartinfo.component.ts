import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookStoreAPI } from 'src/app/services/bookstore.services';
import { resDatHang, reqDatHang, reqDatHangnodategiao, reqCTDonHang } from '../../services/Classes/DonHang'
@Component({
  selector: 'app-cartinfo',
  templateUrl: './cartinfo.component.html',
  styleUrls: ['./cartinfo.component.css']
})
export class CartinfoComponent implements OnInit {

  constructor(private bookapi: BookStoreAPI, private router: Router) { }
  name: any
  Date: any
  Messager: any = [];
  IDMaDonHang: any
  Arraylength: any = [];
  ArrayBook: any = [];
  length: any;
  Total: number = 0;

  ngOnInit(): void {
    if (sessionStorage.getItem("UserLogin")) {
      let data = JSON.parse(sessionStorage.getItem("UserLogin")!)
      if (data.HoTen != null) {
        this.name = data.HoTen
      }
    }

    this.Date = new Date().toLocaleDateString();
    this.getbook();
    this.Sum();
  }

  DatHang() {
    this.Messager = []
    if (this.ArrayBook.length > 0) {
      if (sessionStorage.getItem("UserLogin")) {
        let data = JSON.parse(sessionStorage.getItem("UserLogin")!);
        if (data.id != null) {
          let Body = new reqDatHangnodategiao(false, false, this.Date, data.id);
          this.bookapi.DatHang(Body).subscribe(data => {
            if (data._id != null) {
              let sessionCart = JSON.parse(sessionStorage.getItem("listCart")!);
              for (let i = 0; i < sessionCart.length; i++) {
                let body = new reqCTDonHang(data._id, sessionCart[i].idcart, sessionCart[i].count, sessionCart[i].unitprice);
                this.bookapi.CTDatHang(body).subscribe(data => {
                  sessionStorage.setItem("Mess", data.Messager);
                })
              }
              if (sessionStorage.getItem("Mess")) {
                alert("Đặt Hàng " + sessionStorage.getItem("Mess"))
              }
              sessionStorage.removeItem("listCart")
              this.Sum();
              this.getbook();
            }
          })
        } else {
          this.router.navigate(['login']);
        }
      } else {
        this.router.navigate(['login']);
      }
    }
  }

  delete(cartID: any) {
    if (sessionStorage.getItem("listCart")) {
      const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
      for (let i = 0; i < sessionCart.length; i++) {
        if (cartID === sessionCart[i].idcart) {
          sessionCart.splice(i, 1);
          sessionStorage.setItem("listCart", JSON.stringify(sessionCart));
        }
      }
    }
    this.getbook();
    this.Sum();
  }

  Sum() {

    if (sessionStorage.getItem("listCart")) {
      const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
      this.Total = sessionCart.reduce((acc: any, val: any) => {
        return acc + (val.count * val.unitprice)
      }, 0)
    } else {
      this.Total = 0;
    }
  }

  getbook() {
    this.ArrayBook = [];
    this.Arraylength = [];
    const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
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
