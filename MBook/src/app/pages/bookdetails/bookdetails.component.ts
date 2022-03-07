import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStoreAPI } from 'src/app/services/bookstore.services';
import { Book, itemCart } from 'src/app/services/Classes/Book';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  id: any;
  book: any;
  number: number = 1;
  listCart:itemCart[] = [];

  constructor(private route: ActivatedRoute, private bookapi: BookStoreAPI) { }

  ngOnInit(): void {
    //Get param id on router link /detail/:id
    this.id = "" + this.route.snapshot.params['id'];

    //You can call api details book with that id in the following line down here:
    //Code:
    this.getBook(this.id)
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

  getBook(id: any) {
    this.bookapi.get1Book(id).subscribe(data => {
      this.book = data
    })
  }

  addCart(){
    let newItem:itemCart = new itemCart();
    newItem.idcart=this.id;
    newItem.count=this.number;
    let listSess = JSON.parse(sessionStorage.getItem('listCart')!)
    if(listSess != null){
      let obj = listSess.findIndex((x:any) => x.idcart === newItem.idcart)
      if(obj == -1){
        listSess.push(newItem);
        sessionStorage.setItem('listCart', JSON.stringify(listSess))
      }else{
        listSess[obj].count += newItem.count
        sessionStorage.setItem('listCart', JSON.stringify(listSess))
      }
     
    }else{
      this.listCart.push(newItem);
      sessionStorage.setItem('listCart', JSON.stringify(this.listCart))
    }
  
  }
}


