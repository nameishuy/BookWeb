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
  UserLogin: any
  Date: any
  Messager: any = [];
  IDMaDonHang: any
  Arraylength: any = [];
  ArrayBook: any = [];
  length: any;
  Total: number = 0;

  ngOnInit(): void {
    this.actionIn_ngOnInit();
  }

  actionIn_ngOnInit() {
    sessionStorage.removeItem("Mess")
    this.Date = new Date().toLocaleDateString();
    this.getbook();
    this.Sum();
    this.checkUserLogin();
    this.get_Profile_User();
  }

  get_Profile_User() {
    if (this.checkUserLogin()) {
      this.bookapi.getProfile(JSON.parse(sessionStorage.getItem("UserLogin")!).id).subscribe(data => {
        this.UserLogin = [data]
      })
    }
  }

  checkUserLogin() {
    if (sessionStorage.getItem("UserLogin")) {
      let data = JSON.parse(sessionStorage.getItem("UserLogin")!)
      if (data.id != null) {
        return true;
      }
      return false;
    }
    return false;
  }


  DatHang() {
    this.Messager = []

    let isNull_Session = sessionStorage.getItem("UserLogin") == null
    let islength_ArrayBook = this.ArrayBook.length > 0

    if (!islength_ArrayBook) {
      alert("Giỏ Hàng Hiện Tại Đang Trống\nVui Lòng Chọn Sách Bạn Muốn Mua")
    } else {
      if (!isNull_Session) {

        let data = JSON.parse(sessionStorage.getItem("UserLogin")!);
        let isNull_login = data.id == null

        if (!isNull_login) {
          let Body = new reqDatHangnodategiao(false, false, this.Date, this.Total, data.id);
          this.bookapi.DatHang(Body).subscribe(data => {
            if (data._id != null) {
              let sessionCart = JSON.parse(sessionStorage.getItem("listCart")!);
              for (let i = 0; i < sessionCart.length; i++) {
                let body = new reqCTDonHang(data._id, sessionCart[i].idcart, sessionCart[i].count, sessionCart[i].unitprice);
                this.bookapi.CTDatHang(body).subscribe(data => {
                })
              }
              alert("Đặt Hàng Thành Công")
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

  ifAllCheck() {
    let checkAll = <HTMLInputElement>document.getElementById("checkbox__all-product");
    if (checkAll && checkAll.checked) {
      return true;
    } else {
      return false;
    }
  }

  onDeleteAll() {
    sessionStorage.removeItem("listCart");
    let checkAll = <HTMLInputElement>document.getElementById("checkbox__all-product");
    checkAll.checked = false;
    this.getbook();
    this.Sum();
  }

  ifEmpty() {
    if (this.ArrayBook.length === 0) return true;
    else return false;
  }
}
