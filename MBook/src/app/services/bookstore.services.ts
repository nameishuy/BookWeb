import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Account, reqRegister, resRegister } from "./Classes/Login";
import { BookSold, Category } from "./Classes/Book";
import { reqprofile, resprofile } from "./Classes/profile";
import { reqpass, respass } from './Classes/changepass'


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
        return this.httclient.get<BookSold>(this.url + "/sachbanchayfirst");
    }
    getbooksold2(): Observable<any> {
        return this.httclient.get<BookSold>(this.url + "/sachbanchaysecond");
    }
    getCategory(): Observable<any> {
        return this.httclient.get<Category>(this.url + "/chude");
    }
    //Get Profile
    getProfile(id: string): Observable<any> {
        return this.httclient.get(this.url + "/khachhangbyid/" + id);
    }
    // cập nhật tài khoản put 
    putupdateprofile(bodyProfile: reqprofile) {

        return this.httclient.put<resprofile>(this.url + "/khachhang", bodyProfile);
    }
    //cập nhật pass put 
    putupdatapass(bodyProfile: reqpass) {

        return this.httclient.put<respass>(this.url + "/khachhangmk", bodyProfile);
    }
}