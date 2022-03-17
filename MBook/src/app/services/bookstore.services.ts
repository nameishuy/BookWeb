import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Account, reqRegister, resRegister } from "./Classes/Login";
import { Banner, Book, Book1, BookSold, Category, resinsertbook, reqinsertbook, newBook, reqBookSoluongTon } from "./Classes/Book";
import { reqprofile, resprofile } from "./Classes/profile";
import { reqpass, respass } from './Classes/changepass';
import { reqCTDonHang, resCTDonHang, resDatHang } from "./Classes/DonHang";
import { resNXB } from "./Classes/NXB";
import { resAuthor } from "./Classes/author";

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
    setBanner(anh1: any, anh2: any, anh3: any): Observable<any> {
        let body = {
            Anh1: anh1,
            Anh2: anh2,
            Anh3: anh3
        }
        return this.httclient.put<Banner>(this.url + "/Banner", body)
    }

    getdonhangforuser(id: string): Observable<any> {
        return this.httclient.get<resDatHang>(this.url + "/DonHangbyidKH/" + id)
    }

    postLogin(username: String, password: String): Observable<any> {
        return this.httclient.post<Account>(this.url + "/login", { Taikhoan: username, Matkhau: password });
    }

    postRegister(bodyRegister: reqRegister) {

        return this.httclient.post<resRegister>(this.url + "/khachhang", bodyRegister);
    }


    InsertBook(bodyRegister: reqinsertbook) {

        return this.httclient.post<resinsertbook>(this.url + "/sach", bodyRegister);
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
    //Cấp Quyền Admin
    CapQuyen(id: any[]) {
        console.log({ id: id })
        return this.httclient.put(this.url + "/setRole", { id: id });
    }
    //Xóa Tài Khoản Khách Hàng
    deleteTK(id: string) {
        return this.httclient.delete(this.url + "/khachhangbyid/" + id)
    }

    //Get Chủ Đề
    GetCD() {
        return this.httclient.get(this.url + "/chude");
    }

    //Get Tác Giả
    GetTG() {
        return this.httclient.get(this.url + "/tacgia");
    }
    GetNXB() {
        return this.httclient.get(this.url + "/nhaxuatban");
    }

    //New NXB
    AddNewNXB(bodyNXB:any){
        return this.httclient.post<resNXB>(this.url + "/nhaxuatban",bodyNXB);
    }

    //New Category
    AddNewCategory(TenChuDe:any){
        return this.httclient.post<Category>(this.url + "/chude", TenChuDe);
    }

    //New Author
    AddNewAuthor(bodyAuthor:any){
        return this.httclient.post<resAuthor>(this.url + "/tacgia", bodyAuthor)
    }
}