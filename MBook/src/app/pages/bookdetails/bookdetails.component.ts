import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStoreAPI } from 'src/app/services/bookstore.services';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  id: any;
  book: any;
  number: number = 1;
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
}


