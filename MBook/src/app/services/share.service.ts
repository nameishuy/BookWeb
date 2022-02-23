import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class ShareService {

    constructor() { }
    HoTen: any;
    id: any;
    Role:any;

    setshare(HoTen: any, id: any, Role:any) {
        this.HoTen = HoTen
        this.id = id
        this.Role=Role;
    }

    getshare() {
        var obj = { HoTen: this.HoTen, id: this.id }
        return obj
    }

}
