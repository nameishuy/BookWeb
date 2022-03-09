import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartinfo',
  templateUrl: './cartinfo.component.html',
  styleUrls: ['./cartinfo.component.css']
})
export class CartinfoComponent implements OnInit {

  number: number = 1;
  constructor() { }

  ngOnInit(): void {
  }
  lessProducts() {
    if (this.number == 1) {
      this.number = 1;
    } else {
      this.number--;
    }
  }

  moreProducts() {
    let input = (<HTMLInputElement>document.querySelector("body > app-root > app-bookdetails > div > div > div.Book__info > div.Book__info-Count > div > input"));
    this.number++;
  }

  onCheckAll(){
    let checkAll = <HTMLInputElement> document.getElementById("checkbox__all-product");
    let checkItems = document.querySelectorAll("#checkbox__product") as NodeListOf<HTMLInputElement>;
    if(checkAll && checkAll.checked){
      checkItems.forEach(item => item.checked = true);
    }else{
      checkItems.forEach(item => item.checked = false);
    }
  }
}
