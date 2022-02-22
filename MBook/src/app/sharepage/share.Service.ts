import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class ShareService {

    constructor() { }
    HoTen: any = null;
    id: any = null;

    setshare(HoTen: any, id: any) {
        this.HoTen = HoTen
        this.id = id
    }

    getshare() {
        var obj = { HoTen: this.HoTen, id: this.id }
        return obj
    }

}
