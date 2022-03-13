import { Component, OnInit } from '@angular/core';
import { BookStoreAPI } from 'src/app/services/bookstore.services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  constructor(private bookapi: BookStoreAPI) { }
  user: any
  DonHanglist: any
  DonHanglistByID: any
  BookByDonHang: any
  key = "Role";
  p: any = "";
  pdialog: any = "";
  select: any = "Khách Hàng";
  reverse: boolean = false;
  check: boolean = false;
  ngOnInit(): void {
    this.getAllTaiKhoan()
    this.getDonHang()
  }

  ChooseAdmin() {
    this.select = "Admin"
    this.check = true;
    this.getAllTaiKhoan()
  }
  ChooseUser() {
    this.select = "Khách Hàng"
    this.check = false;
    this.getAllTaiKhoan()
  }

  sort() {
    this.reverse = !this.reverse
  }

  getDonHang() {
    this.bookapi.GetDonHang().subscribe(data => {
      this.DonHanglist = data     
    })
  }

  getAllTaiKhoan() {
    this.bookapi.GetTk(this.check).subscribe(data => {
      this.user = data
      this.p = 1
    })
  }

  onCheckAll() {
    let checkAll = <HTMLInputElement>document.getElementById("checkbox__all-account");
    let checkItems = document.querySelectorAll("#checkbox__account") as NodeListOf<HTMLInputElement>;
    if (checkAll && checkAll.checked) {
      checkItems.forEach(item => item.checked = true);
    } else {
      checkItems.forEach(item => item.checked = false);
    }
  }

  ifCheckAll() {
    let checkAll = <HTMLInputElement>document.getElementById("checkbox__all-account");
    let checkItems = document.querySelectorAll("#checkbox__account") as NodeListOf<HTMLInputElement>;
    if (checkAll && checkAll.checked) {
      return true;
    } else {
      return false;
    }
  }

  showDialog(id: any) {
    this.pdialog = 1
    let details = <HTMLElement>document.getElementById("DialogDetailsPay__Container");
    details.style.display = "block";

    this.bookapi.GetDonHangById(id).subscribe(data => {
      this.DonHanglistByID = data
    })

    this.bookapi.getCTDonHang(id).subscribe(data => {
      this.BookByDonHang = data
    })
  }

  closeDialog() {
    let details = <HTMLElement>document.getElementById("DialogDetailsPay__Container");
    details.style.display = "none";
  }

  SetRole(id: any) {
  }
}
