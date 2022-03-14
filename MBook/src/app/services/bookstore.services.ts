import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Account, reqRegister, resRegister } from "./Classes/Login";
import { Banner, Book, Book1, BookSold, Category, newBook, reqBookSoluongTon } from "./Classes/Book";
import { reqprofile, resprofile } from "./Classes/profile";
import { reqpass, respass } from './Classes/changepass'
import { reqCTDonHang, resCTDonHang, resDatHang } from "./Classes/DonHang";


@Injectable({
    providedIn: 'root'
})
export class BookStoreAPI {
    [x: string]: any;
    constructor(private httclient: HttpClient) { }
    url = "https://bookingapiiiii.herokuapp.com";

    getBanner(): Observable<any> {
        return this.httclient.get<Banner>(this.url + "/Banner")
    }

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
    get3newbook(): Observable<any> {
        return this.httclient.get<newBook>(this.url + "/sachtimestamps");
    }
    CapNhatSoLuongTon(body: reqBookSoluongTon) {
        return this.httclient.put<Book>(this.url + "/sach", body);
    }
    getAllBook(): Observable<any> {
        return this.httclient.get<Book>(this.url + "/sach");
    }
    get1Book(id: string): Observable<any> {
        return this.httclient.get<Book1>(this.url + "/sachbyid/" + id);
    }
    getBookByChuDe(id: string): Observable<any> {
        return this.httclient.get<Book>(this.url + "/sachbyCD/" + id);
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

    //Đặt Hàng
    DatHang(bodyDatHang: any) {
        return this.httclient.post<resDatHang>(this.url + "/DonHang", bodyDatHang);
    }
    //Get Đơn Đặt Hàng
    GetDonHang() {
        return this.httclient.get(this.url + "/DonHang");
    }
    //Get Đơn Đặt Hàng By Id
    GetDonHangById(id: any) {
        return this.httclient.get(this.url + "/DonHangbyid/" + id);
    }
    //Chi Tiết Đơn Hàng
    CTDatHang(bodyCTDatHang: reqCTDonHang) {
        return this.httclient.post<resCTDonHang>(this.url + "/CTDonHang", bodyCTDatHang);
    }
    //Get Chi Tiết Đơn Hàng
    getCTDonHang(id: any) {
        return this.httclient.get(this.url + "/CTDonHangbyid/" + id);
    }

    //Khách Hàng
    GetTk(Role: boolean) {
        return this.httclient.get(this.url + "/khachhangforadmin/" + Role);
    }
    //Xóa Tài Khoản Khách Hàng
    deleteTK(id: string) {
        return this.httclient.delete(this.url + "/khachhangbyid/" + id)
    }
}