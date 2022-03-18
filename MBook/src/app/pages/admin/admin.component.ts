import { Component, OnInit } from '@angular/core';

import { reqChuDe, reqinsertbook, resinsertbook } from "../../services/Classes/Book";
import { BookStoreAPI } from 'src/app/services/bookstore.services';
import { reqBookSoluongTon } from "../../services/Classes/Book";
import { reqNXB } from 'src/app/services/Classes/NXB';
import { reqAuthor } from 'src/app/services/Classes/author';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  constructor(private bookapi: BookStoreAPI) { }
  Search: any = '';
  user: any = ''
  DonHanglist: any = ''
  HangTon: any = ''
  DonHanglistByID: any = ''
  BookByDonHang: any = ''
  p: any = "";
  pdialog: any = "";
  pHangTon: any = "";
  select: any = "Khách Hàng";
  check: boolean = false;
  mess: any = '';
  Role: any = '';
  userid: any = '';
  idbook: any = '';
  CD: any = '';
  TG: any = '';
  SolnTon: number = 0;
  Product__Price: number = 0;
  arrayid: any[] = []
  IDCD: any[] = []
  IDTG: any = '';
  IDNXB: any = '';
  Categoryselected = 'option2';
  Authorselected = 'option2';
  NXBselected = 'option2';
  img: any = ''
  TenSach: any = ''
  Mota: any = ''
  Soluongton: any = ''
  Giaban: any = ''
  NXB: any = ''
  Anh1: any = ''
  Anh2: any = ''
  Anh3: any = ''

  /** Biến của phần thêm mới nxb */
  TenNXB: any;
  DiaChi: any;
  DienThoai: any;

  /** Biến của phần thêm mới chủ đề */
  category: any;

  /** Biến của phần thêm mới tác giả */
  authorName: any;
  authorAddr: any;
  authorHist: any;
  authorPhone: any;


  ngOnInit(): void {
    this.Action_ngOnInit()
  }

  Action_ngOnInit() {
    this.getAllTaiKhoan(this.check)
    this.getDonHang()
    this.GetHangTon()
    this.CallChuDe()
    this.CallTacGia()
    this.CallNXB()
  }
  selectedCD(event: any) {
    this.IDCD = []
    this.IDCD.push(event);
  }
  selectedTG(event: any) {
    this.IDTG = event
  }
  selectedNXB(event: any) {
    this.IDNXB = event
  }


  onFileSelected(event: any) {
    if (event.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e) => {
        this.img = e.target?.result
      }
    }
  }
  onFileSelected1(event: any) {
    if (event.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e) => {
        this.Anh1 = e.target?.result
      }
    }
  }
  onFileSelected2(event: any) {
    if (event.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e) => {
        this.Anh2 = e.target?.result
      }
    }
  }
  onFileSelected3(event: any) {
    if (event.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e) => {
        this.Anh3 = e.target?.result
      }
    }
  }

  CapNhatBanner() {
    let check = []
    check.push(!(this.Anh1 == '')); check.push(!(this.Anh2 == '')); check.push(!(this.Anh3 == ''));

    if (check.every(va => va === true)) {
      this.bookapi.setBanner(this.Anh1, this.Anh2, this.Anh3).subscribe(da => {
        if (da._id != null) {
          alert("Cập Nhật Thành Công")
        } else {
          alert("Cập Nhật Không Thành Công")
        }
      })
    } else {
      alert("Vui Lòng Chọn Cả 3 Ảnh")
    }
  }

  Reset() {
    let a1 = "https://nxbphunu.com.vn/wp-content/uploads/2020/02/banner-hoi-sach.jpg"
    let a2 = "https://amovietnam.vn/wp-content/uploads/2016/02/banner-doc-sach-vi-tuong-lai-amo-vietnam-2018.jpg"
    let a3 = "https://pvm.com.vn/wp-content/uploads/2017/11/banner-sach.jpg"
    this.bookapi.setBanner(a1, a2, a3).subscribe(da => {
    });
    alert("Khôi Phục Thành Công")
  }

  InsertBook() {
    let check = []
    check.push(!(this.TenSach == '')); check.push(!(this.Giaban == '')); check.push(!(this.Mota == ''));
    check.push(!(this.img == '')); check.push(!(this.Soluongton == '')); check.push(!(this.IDCD == []));
    check.push(!(this.IDNXB == '')); check.push(!(this.IDTG == '')); check.push(!(this.Giaban == 0));
    check.push(!(this.Soluongton == 0));

    if (check.every(va => va === true)) {
      let body = new reqinsertbook(this.TenSach, this.Giaban, this.Mota, this.img, this.Soluongton, this.IDCD, this.IDNXB, this.IDTG);
      this.bookapi.InsertBook(body).subscribe(da => {
        if (da._id != null) {
          alert("Thêm Thành Công")
          this.GetHangTon();
        } else {
          alert("Thêm Thất Bại")
        }

      })
    } else {
      alert("Vui Lòng Điền Đầy Đủ Thông Tin");
    }


  }

  CallChuDe() {
    this.bookapi.GetCD().subscribe(data => {
      this.CD = data;
    })
  }
  CallTacGia() {
    this.bookapi.GetTG().subscribe(data => {
      this.TG = data
    })
  }
  CallNXB() {
    this.bookapi.GetNXB().subscribe(data => {
      this.NXB = data
    })
  }

  //Get Hàng Tồn
  GetHangTon() {
    this.bookapi.getAllBook().subscribe(data => {
      this.HangTon = data
    })
  }

  //Cập Nhật Hàng Tồn
  UpdateBook() {
    let check = []
    check.push(!(this.SolnTon == 0)); check.push(!(this.Product__Price == 0));
    check.push((typeof this.SolnTon == "number")); check.push((typeof this.Product__Price == "number"));

    if (check.every(va => va === true)) {
      let body = new reqBookSoluongTon(this.idbook, (Number(this.SolnTon)), this.Product__Price)
      console.log(body)
      this.bookapi.CapNhatSoLuongTon(body).subscribe(data => {
        if (data.Tensach != null) {
          alert("Cập Nhật Thành Công")
          this.GetHangTon()
          this.closeDialogChangeDetails()
        }
      })
    } else {
      alert("Vui Lòng Điền Đầy Đủ Thông Tin")
    }


  }

  //Xóa Tài Khoản Khách Hàng
  DeleteTK() {
    let check = []
    let isNoneID = this.userid == ""
    check.push(!isNoneID)
    let isNUllID = this.userid == null
    check.push(!isNUllID)
    let isNUllRole = this.Role == null
    check.push(!isNUllRole)

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
          this.closeDialog()
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

  closeDialogChangeDetails() {
    let dialog = <HTMLElement>document.getElementById("DialogChangeDetailsProduct__Container");
    dialog.style.display = "none";
  }

  SetRole(id: any) {
    let checkk = true
    for (let i = 0; i < this.arrayid.length; i++) {
      if (this.arrayid[i] == id) {
        this.arrayid.splice(i, 1)
        checkk = false
      }
    }
    if (checkk) {
      this.arrayid.push(id)
    }
    console.log(this.arrayid);
  }

  CapQuyen() {
    this.bookapi.CapQuyen(this.arrayid).subscribe(data => {
    })
    alert("Cấp Quyền Thành Công")
    this.getAllTaiKhoan(this.check)
  }

  showDialogChangeDetailsProduct(idbook: any, Price: number) {
    let dialog = <HTMLElement>document.getElementById("DialogChangeDetailsProduct__Container");
    dialog.style.display = "block";
    this.idbook = idbook
    this.Product__Price = Price
    console.log()
  }


  /* Hàm cho chức năng thêm NXB */
  newNXB() {
    /* Các biến cho phần thêm mới nhà xuất bản */
    if (this.TenNXB != '' && this.DiaChi != '') {
      let newNXB = new reqNXB(this.TenNXB, this.DiaChi, this.DienThoai);
      this.bookapi.AddNewNXB(newNXB).subscribe(data => {

        if (data.TenNXB != null) alert("Thêm mới thành công!");
        else alert("Thêm mới thất bại");

      });
    }
  }

  newCategory() {

    if (this.category != '') {

      let newCategory = new reqChuDe(this.category);
      this.bookapi.AddNewCategory(newCategory).subscribe(data => {

        if (data.TenChuDe != null) alert("Thêm mới thành công!");
        else alert("Thêm mới thất bại");

      });
    }
  }

  newAuthor() {

    if (this.authorName != '' && this.authorHist != '' && this.authorAddr != '') {

      let newAuthor = new reqAuthor(this.authorName, this.authorAddr, this.authorHist, this.authorPhone)

      this.bookapi.AddNewAuthor(newAuthor).subscribe(data => {

        if (data.TenTG != null) alert("Thêm mới thành công!");
        else alert("Thêm mới thất bại");
      })
    }

  }
}
