import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookStoreAPI } from 'src/app/services/bookstore.services';

@Component({
  selector: 'app-historypay',
  templateUrl: './historypay.component.html',
  styleUrls: ['./historypay.component.css']
})
export class HistorypayComponent implements OnInit {

  constructor(private bookapi: BookStoreAPI) { }

  ListDonHang: any
  CTDH: any
  DonHangByID: any
  p: any

  ngOnInit(): void {
    this.action_ngOnInit()
  }

  action_ngOnInit() {
    if (sessionStorage.getItem("UserLogin")) {
      let datauser = JSON.parse(sessionStorage.getItem("UserLogin")!);
      if (datauser["id"] != null) {
        this.bookapi.getdonhangforuser(datauser["id"]).subscribe(data => {
          this.ListDonHang = data
        });
      } else {
      }
    } else {
    }

  }

  showDialog_HistoryPay(id: string) {
    let details = <HTMLElement>document.getElementById("DialogDetailsHistoryPay__Container");
    details.style.display = "block";

    this.bookapi.getCTDonHang(id).subscribe(da => {
      this.CTDH = da
    })
    this.bookapi.GetDonHangById(id).subscribe(da => {
      this.DonHangByID = da
    })
  }

  closeDialog_HistoryPay() {
    let details = <HTMLElement>document.getElementById("DialogDetailsHistoryPay__Container");
    details.style.display = "none";
  }
}
