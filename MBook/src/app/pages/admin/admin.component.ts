import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onCheckAll(){
    let checkAll = <HTMLInputElement> document.getElementById("checkbox__all-account");
    let checkItems = document.querySelectorAll("#checkbox__account") as NodeListOf<HTMLInputElement>;
    if(checkAll && checkAll.checked){
      checkItems.forEach(item => item.checked = true);
    }else{
      checkItems.forEach(item => item.checked = false);
    }
  }
  ifCheckAll(){
    let checkAll = <HTMLInputElement> document.getElementById("checkbox__all-account");
    let checkItems = document.querySelectorAll("#checkbox__account") as NodeListOf<HTMLInputElement>;
    if(checkAll && checkAll.checked){
      return true;
    }else{
      return false;
    }
  }
}
