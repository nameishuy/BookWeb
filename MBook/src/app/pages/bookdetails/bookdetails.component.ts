import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStoreAPI } from 'src/app/services/bookstore.services';
import { itemCart } from 'src/app/services/Classes/Book';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  id: any;
  book: any;
  unitprice: number = 0;
  listCart: itemCart[] = [];

  constructor(private router: ActivatedRoute, private bookapi: BookStoreAPI) { }

  ngOnInit(): void {
    //Get param id on router link /detail/:id
    this.id = "" + this.router.snapshot.params['id'];

    //You can call api details book with that id in the following line down here:
    //Code:
    this.getBook(this.id)
  }

  lessProducts() {
    let inputNum = <HTMLInputElement>document.getElementById("inputNum");
    if (inputNum.value == "1") {
      inputNum.value = "1";
    } else {
      inputNum.value = "" + (Number(inputNum.value) - 1);
    }
  }

  moreProducts() {
    let inputNum = <HTMLInputElement>document.getElementById("inputNum");
    inputNum.value = "" + (Number(inputNum.value) + 1);;
  }

  getBook(id: any) {
    this.bookapi.get1Book(id).subscribe(data => {
      this.book = data
      this.unitprice = data[0].Giaban;
    })
  }

  addCart() {
    let inputNum = <HTMLInputElement>document.getElementById("inputNum");
    let newItem: itemCart = new itemCart();
    newItem.idcart = this.id;
    newItem.count = Number(inputNum.value);
    newItem.unitprice = this.unitprice;
    let listSess = JSON.parse(sessionStorage.getItem('listCart')!)
    if (listSess != null) {
      let obj = listSess.findIndex((x: any) => x.idcart === newItem.idcart)
      if (obj == -1) {
        listSess.push(newItem);
        sessionStorage.setItem('listCart', JSON.stringify(listSess))
      } else {
        listSess[obj].count += newItem.count
        sessionStorage.setItem('listCart', JSON.stringify(listSess))
      }

    } else {
      this.listCart.push(newItem);
      sessionStorage.setItem('listCart', JSON.stringify(this.listCart))
    }
  }
}


