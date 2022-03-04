import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  id:any;
  number:number=1;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    //Get param id on router link /detail/:id
    this.id= + this.route.snapshot.params['id'];

    console.log((<HTMLInputElement>document.querySelector("body > app-root > app-bookdetails > div > div > div.Book__info > div.Book__info-Count > div > input")).value);

    //You can call api details book with that id in the following line down here:
    //Code:
  }

  lessProducts(){
    if(this.number == 1){
      this.number = 1;
    }else{
      this.number--;
    }
  }
  
  moreProducts(){
    let input = (<HTMLInputElement>document.querySelector("body > app-root > app-bookdetails > div > div > div.Book__info > div.Book__info-Count > div > input"));
      this.number++;
  }
}
