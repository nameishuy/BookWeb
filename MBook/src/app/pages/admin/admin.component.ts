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
  p: any = "";
  pdialog: any = "";
  select: any = "Khách Hàng";
  check: boolean = false;
  mess: any;
  Role: any;
  userid: any;

  ngOnInit(): void {
    this.getAllTaiKhoan(this.check)
    this.getDonHang()
  }
  //Xóa Tài Khoản Khách Hàng
  DeleteTK() {
    let check = []
    let isNoneID = this.userid == ""
    check.push(isNoneID)
    let isNUllID = this.userid == null
    check.push(isNUllID)
    let isNoneRole = this.Role == ""
    check.push(isNoneRole)
    let isNUllRole = this.Role == null
    check.push(isNUllRole)

    let isTrue = (va: boolean) => va === true
    if (check.every(isTrue)) {
      if (this.Role) {
        alert("Không Thể Xóa Tài Khoản Admin")
      } else {
        this.bookapi.deleteTK(this.userid).subscribe(data => {
          this.mess = data;
          alert(this.mess.Messager);
          this.getAllTaiKhoan(this.Role)
          this.getDonHang()
        })
      }
    } else {
      alert("Đã Xảy Ra Lỗi")
    }

  }

  showdialogMess(id: string, Role: boolean) {
    let details = <HTMLElement>document.getElementById("Dialog_Messenger");
    details.style.display = "block";
    this.Role = Role;
    this.userid = id;
  }

  //Chuyển Đổi Giữa Tài Khoản Khách Hàng Và Tài Khoản Khác
  ChooseAdmin() {
    this.select = "Admin"
    this.check = true;
    this.getAllTaiKhoan(this.check)
  }
  ChooseUser() {
    this.select = "Khách Hàng"
    this.check = false;
    this.getAllTaiKhoan(this.check)
  }

  getDonHang() {
    this.bookapi.GetDonHang().subscribe(data => {
      this.DonHanglist = data
    })
  }

  getAllTaiKhoan(Role: boolean) {
    this.bookapi.GetTk(Role).subscribe(data => {
      this.user = data
      this.p = 1
    })
  }

  ifCheckAll() {
    let n = 0;
    let checkItems = document.querySelectorAll("#checkbox__account") as NodeListOf<HTMLInputElement>;
    checkItems.forEach(checkbox => {
      if (checkbox.checked) n++;
    })
    if (n > 0) return true;
    else return false;
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
    let Dialog_Messenger = <HTMLElement>document.getElementById("Dialog_Messenger");
    Dialog_Messenger.style.display = "none";
    this.Role = "";
    this.userid = ""
  }

  SetRole(id: any) {
  }
}
