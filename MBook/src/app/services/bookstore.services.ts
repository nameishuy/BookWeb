import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Account, reqRegister, resRegister } from "./Classes/Login";


@Injectable({
    providedIn: 'root'
})
export class BookStoreAPI
{
    constructor(private httclient:HttpClient){}

    url = "https://bookingapiiiii.herokuapp.com"; 
    
    getLogin(username:String, password:String):Observable<any>{
        

        return this.httclient.get<Account>( this.url + "/login" + "/" + username + "/" + password );
    }

    postRegister(bodyRegister:reqRegister){

        return this.httclient.post<resRegister>(this.url + "/khachhang",bodyRegister);
    }

}