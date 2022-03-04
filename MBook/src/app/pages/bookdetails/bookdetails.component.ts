import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  id:any;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {

    //Get param id on router link /detail/:id
    this.id= + this.route.snapshot.params['id'];

    //You can call api details book with that id in the following line down here:
    //Code:
  }

}
