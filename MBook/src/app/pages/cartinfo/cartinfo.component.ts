import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartinfo',
  templateUrl: './cartinfo.component.html',
  styleUrls: ['./cartinfo.component.css']
})
export class CartinfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  lessProducts() {
    let inputNum = <HTMLInputElement> document.getElementById("inputNum");
    if (inputNum.value == "1") {
    inputNum.value = "1";
    } else {
    inputNum.value = "" + (Number(inputNum.value) - 1);
    }
  }

  moreProducts() {
    let inputNum = <HTMLInputElement> document.getElementById("inputNum");
    inputNum.value= "" + (Number(inputNum.value) + 1);;
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
