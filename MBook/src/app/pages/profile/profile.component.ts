import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../services/share.service'
import { BookStoreAPI } from '../../services/bookstore.services';
import { resprofile, reqprofile } from '../../services/Classes/profile'
import { reqpass, respass } from '../../services/Classes/changepass'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private Share: ShareService, private bookstoreapi: BookStoreAPI) { }
  data:any;
  hovaten: any;
  Email: any;
  diachi: any;
  sdt: any;
  date: any;

  resProfile: resprofile | undefined;

  matkhauhientai: any;
  matkhaumoi: any;
  xacnhanmatkhau: any;
  resPass: respass | undefined;

  ngOnInit() {
    console.log(this.Share.getshare());
    if (this.Share.getshare().id == null || this.Share.getshare().id == "" || this.Share.getshare().id.lenght <= 0) {
      console.log("Rỗng")
    } else {
      this.bookstoreapi.getProfile(this.Share.getshare().id).subscribe(res => {
        this.hovaten = res.HoTen
        this.Email = res.Email
        this.diachi = res.DiachiKH
        this.sdt = res.DienthoaiKH
        this.date = res.Ngaysinh
        this.data = res
      })
    }
  }

  clickme() {
    let bodyProfile = new reqprofile(this.Share.getshare().id, this.hovaten, this.Email, this.diachi, this.sdt, this.date);
    this.bookstoreapi.putupdateprofile(bodyProfile).subscribe(
      data => {
        this.resProfile = data;
        alert(this.resProfile.Messenger);
      }
    )
  }
  UpdataPass() {
    let bodypass = new reqpass(this.Share.getshare().id, this.matkhauhientai, this.matkhaumoi, this.xacnhanmatkhau);
    this.bookstoreapi.putupdatapass(bodypass).subscribe(
      data => {
        this.resPass = data;
        this.matkhauhientai = '';
        this.matkhaumoi = '';
        this.xacnhanmatkhau = '';
        alert(this.resPass.Messenger);
      }
    )
  }
}
