import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Account, reqRegister, resRegister } from "./Classes/Login";
import { BookSold } from "./Classes/Book";


@Injectable({
    providedIn: 'root'
})
export class BookStoreAPI {
    [x: string]: any;
    constructor(private httclient: HttpClient) { }

    url = "https://bookingapiiiii.herokuapp.com";

    postLogin(username: String, password: String): Observable<any> {
        return this.httclient.post<Account>(this.url + "/login", { Taikhoan: username, Matkhau: password });
    }

    postRegister(bodyRegister: reqRegister) {

        return this.httclient.post<resRegister>(this.url + "/khachhang", bodyRegister);
    }

    //get
    getbooksold1(): Observable<any> {
        return this.httclient.get<BookSold>(this.url + "/sachbanchayfirst")
    }
    getbooksold2(): Observable<any> {
        return this.httclient.get<BookSold>(this.url + "/sachbanchaysecond")
    }
}