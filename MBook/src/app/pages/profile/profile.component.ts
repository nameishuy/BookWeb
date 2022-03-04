import { Component, OnInit } from '@angular/core';
import { BookStoreAPI } from '../../services/bookstore.services';
import { resprofile, reqprofile } from '../../services/Classes/profile'
import { reqpass, respass } from '../../services/Classes/changepass'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private bookstoreapi: BookStoreAPI) { }

  hovaten: any;
  Email: any;
  diachi: any;
  sdt: any;
  date: any;

  data: any
  img: any = "https://firebasestorage.googleapis.com/v0/b/chat-1e086.appspot.com/o/default.jpg?alt=media&token=b2f7e2de-5a7e-4bd6-8c29-443015246589"
  resProfile: resprofile | undefined;

  matkhauhientai: any;
  matkhaumoi: any;
  xacnhanmatkhau: any;
  resPass: respass | undefined;

  onFileSelected(event: any) {
    if (event.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e) => {
        this.img = e.target?.result
      }
    }
  }

  ngOnInit() {
    if (sessionStorage.getItem('UserLogin') != null) {
      this.data = JSON.parse(sessionStorage.getItem('UserLogin')!);
      this.bookstoreapi.getProfile(this.data.id).subscribe(res => {
        this.hovaten = res.HoTen
        this.Email = res.Email
        this.diachi = res.DiachiKH
        this.sdt = res.DienthoaiKH
        this.date = res.Ngaysinh
        this.img = res.Anh
      })
    } else {
      console.log("Rỗng");
    }
  }

  updateInfo() {
    if (this.data.id != null) {
      console.log(this.data.id)
      let bodyProfile = new reqprofile(this.data.id, this.img, this.hovaten, this.Email, this.diachi, this.sdt, this.date);
      this.bookstoreapi.putupdateprofile(bodyProfile).subscribe(
        data => {
          this.resProfile = data;
          console.log(data)
          alert(this.resProfile.Messenger);
        }
      )
    }

  }

  UpdataPass() {
    if (this.data.id != null) {
      console.log(this.data.id)
      let bodypass = new reqpass(this.data.id, this.matkhauhientai, this.matkhaumoi, this.xacnhanmatkhau);
      this.bookstoreapi.putupdatapass(bodypass).subscribe(
        data => {
          this.resPass = data;
          this.matkhauhientai = '';
          this.matkhaumoi = '';
          this.xacnhanmatkhau = '';
          console.log(data)
          alert(this.resPass.Messenger);
        }
      )
    }
  }
}
