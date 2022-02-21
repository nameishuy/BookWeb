import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Account } from "./Classes/Login";

@Injectable({
    providedIn: 'root'
})
export class BookStoreAPI
{
    constructor(private httclient:HttpClient){}

    user:any;
    url = "https://bookingapiiiii.herokuapp.com"; 

    getLogin(username:String, password:String):Observable<any>{
        

        return this.httclient.get<Account>( this.url + "/login" + "/" + username + "/" + password );
    }
}