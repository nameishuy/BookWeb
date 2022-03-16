import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historypay',
  templateUrl: './historypay.component.html',
  styleUrls: ['./historypay.component.css']
})
export class HistorypayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showDialog_HistoryPay(){
    let details = <HTMLElement>document.getElementById("DialogDetailsHistoryPay__Container");
    details.style.display = "block";
  }
  closeDialog_HistoryPay(){
    let details = <HTMLElement>document.getElementById("DialogDetailsHistoryPay__Container");
    details.style.display = "none";
  }
}
