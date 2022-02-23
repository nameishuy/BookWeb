import { Component, OnInit } from '@angular/core';
import { BookStoreAPI } from 'src/app/services/bookstore.services';
import { reqRegister, resRegister } from 'src/app/services/Classes/Login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private bookstore:BookStoreAPI,private router:Router) { }

  username='';
  password='';
  fullname='';
  confirmpassword='';
  
  resRegister:resRegister | undefined;
  ngOnInit(): void {
  }

  clickme() {
   
    let bodyRegister = new reqRegister(this.fullname,this.username,this.password,this.confirmpassword);
    this.bookstore.postRegister(bodyRegister)

    .subscribe(
      data => {
        this.resRegister = data;
        alert(this.resRegister.Messenger);
        this.router.navigate(['/login']);
      }
    )
  }
}
