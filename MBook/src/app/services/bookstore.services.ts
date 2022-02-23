import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Account, reqRegister, resRegister } from "./Classes/Login";


@Injectable({
    providedIn: 'root'
})
export class BookStoreAPI {
    constructor(private httclient: HttpClient) { }

    url = "https://bookingapiiiii.herokuapp.com";

    postLogin(username: String, password: String): Observable<any> {


        return this.httclient.post<Account>(this.url + "/login", { Taikhoan: username, Matkhau: password });
    }

    postRegister(bodyRegister: reqRegister) {

        return this.httclient.post<resRegister>(this.url + "/khachhang", bodyRegister);
    }

}