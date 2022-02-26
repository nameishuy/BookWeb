export interface resprofile {
    id: string;
    HoTen: string;
    Email: string;
    DiachiKH: string;
    DienthoaiKH: string;
    Ngaysinh: string;
    Messenger: string;
    Role: boolean;
}

export class reqprofile {
    constructor(id: any, HoTen: any, Email: any, DiachiKH: any, DienthoaiKH: any, Ngaysinh: any) {
        this.id = id;
        this.HoTen = HoTen;
        this.Email = Email;
        this.DiachiKH = DiachiKH;
        this.DienthoaiKH = DienthoaiKH;
        this.Ngaysinh = Ngaysinh;
    }
    id: string = '';
    HoTen: string = '';
    Email: string = '';
    DiachiKH: string = '';
    DienthoaiKH: string = '';
    Ngaysinh: string = '';
}