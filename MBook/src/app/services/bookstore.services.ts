import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Account, reqRegister, resRegister } from "./Classes/Login";
import { Banner, Book, Book1, Category, resinsertbook, reqinsertbook, newBook, reqBookSoluongTon } from "./Classes/Book";
import { resimg, resprofile } from "./Classes/profile";
import { reqpass, respass } from './Classes/changepass';
import { reqCTDonHang, resCTDonHang, resDatHang ,reqChang_Stautus} from "./Classes/DonHang";
import { resALL, resNXB } from "./Classes/NXB";
import { resAuthor } from "./Classes/author";

@Injectable({
    providedIn: 'root'
})



export class BookStoreAPI {
    [x: string]: any;
    constructor(private httclient: HttpClient) { }
    url = "https://bookingapiiiii.herokuapp.com";

    SendMail(Mail: string): Observable<any> {
        return this.httclient.get<Banner>(this.url + "/Sendmail/" + Mail)
    }

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

    set1Banner(anh: any, url: string): Observable<any> {
        let body = { "Image": anh }
        return this.httclient.put<Banner>(this.url + "/Banner1/" + url, body)
    }


    getdonhangforuser(id: string, ngaydat: string, gioihan: string): Observable<any> {
        return this.httclient.get<resDatHang>(this.url + "/DonHang/" + id + "/" + ngaydat + "/" + gioihan)
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
    getbookforpagehome(): Observable<any> {
        return this.httclient.get<resinsertbook>(this.url + "/home");
    }

    CapNhatSoLuongTon(body: reqBookSoluongTon) {
        return this.httclient.put<Book>(this.url + "/sach", body);
    }
    getAllBook(): Observable<any> {
        return this.httclient.get<Book>(this.url + "/sach");
    }
    getdeleted(): Observable<any> {
        return this.httclient.get<Book>(this.url + "/getdeleted");
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
    //
    UploadImage(body: FormData) {
        return this.httclient.post<resimg>(this.url + "/upload-image", body);
    }
    // c???p nh???t t??i kho???n put 
    putupdateprofile(bodyProfile: any) {

        return this.httclient.put<resprofile>(this.url + "/khachhang", bodyProfile);
    }
    //c???p nh???t pass put 
    putupdatapass(bodyProfile: reqpass) {

        return this.httclient.put<respass>(this.url + "/khachhangmk", bodyProfile);
    }

    //?????t H??ng
    DatHang(bodyDatHang: any) {
        return this.httclient.post<resDatHang>(this.url + "/DonHang", bodyDatHang);
    }
    //Get ????n ?????t H??ng
    GetDonHang() {
        return this.httclient.get(this.url + "/DonHang");
    }
    //Get ????n ?????t H??ng By Id
    GetDonHangById(id: any) {
        return this.httclient.get(this.url + "/DonHangbyid/" + id);
    }
    //Chi Ti???t ????n H??ng
    CTDatHang(bodyCTDatHang: reqCTDonHang) {
        return this.httclient.post<resCTDonHang>(this.url + "/CTDonHang", bodyCTDatHang);
    }
    //Get Chi Ti???t ????n H??ng
    getCTDonHang(id: any) {
        return this.httclient.get(this.url + "/CTDonHangbyid/" + id);
    }

    //Kh??ch H??ng
    GetTk(Role: boolean) {
        return this.httclient.get(this.url + "/khachhangforadmin/" + Role);
    }
    //C???p Quy???n Admin
    CapQuyen(id: any[]) {
        console.log({ id: id })
        return this.httclient.put(this.url + "/setRole", { id: id });
    }
    //X??a T??i Kho???n Kh??ch H??ng
    deleteTK(id: string) {
        return this.httclient.delete(this.url + "/khachhangbyid/" + id)
    }
    DeteleBook(id: any) {
        return this.httclient.delete(this.url + "/sachbyid/" + id);
    }
    DeteleCD(id: any) {
        return this.httclient.delete(this.url + "/chudebyid/" + id);
    }
    DeteleTG(id: any) {
        return this.httclient.delete(this.url + "/tacgiabyid/" + id);
    }
    DeteleNXB(id: any) {
        return this.httclient.delete(this.url + "/nhaxuatbanbyid/" + id);
    }
    //Get Ch??? ?????
    GetAll() {
        return this.httclient.get<resALL>(this.url + "/GetAll");
    }

    //New NXB
    AddNewNXB(bodyNXB: any) {
        return this.httclient.post<resNXB>(this.url + "/nhaxuatban", bodyNXB);
    }

    //New Category
    AddNewCategory(TenChuDe: any) {
        return this.httclient.post<Category>(this.url + "/chude", TenChuDe);
    }

    //New Author
    AddNewAuthor(bodyAuthor: any) {
        return this.httclient.post<resAuthor>(this.url + "/tacgia", bodyAuthor)
    }

    //s???a tr???ng th??i giao h??ng
    change(id: any){
        let body = {
            "id": id,
            "Tinhtranggiaohang": true
          }
        return this.httclient.put(this.url + "/DonHang" , body);
    }
   
}
