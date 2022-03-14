export interface BookSold {
    id: string;
    Tensach: string;
    Anh: string;
    TenTG: string;
}
export interface Book {
    id: string;
    Tensach: string;
    Giaban: Number;
    Anh: string;
    TenTG: string;
}
export interface newBook {
    id: string;
    Tensach: string;
    Mota: string,
    Anh: string;
    TenTG: string;
}


export class reqBookSoluongTon {
    constructor(id: any, soluongban: number) {
        this.id = id;
        this.soluongban = soluongban;

    }
    id: string = '';
    soluongban: number = 0;

}

export interface Book1 {
    id: string;
    Tensach: string;
    Mota: string,
    Giaban: Number;
    Anh: string;
    TenTG: string;
    TenNXB: string;
}
export interface Category {
    id: string;
    TenChuDe: string;
}

export class itemCart {
    idcart: string = '';
    count: number = 0;
    Anh: string = '';
    Mota: string = '';
    Tensach: string = '';
    unitprice: number = 0;
    Soluongton: number = 0;

    setTensach(Tensach: string) {
        this.Tensach = Tensach;
    }

    getTensach() {
        return this.Tensach;
    }

    setAnh(Anh: string) {
        this.Anh = Anh;
    }

    getAnh() {
        return this.Anh;
    }
    
    setSoluongton(Soluongton: number) {
        this.Soluongton = Soluongton;
    }

    getSoluongton() {
        return this.Soluongton;
    }

    setMota(Mota: string) {
        this.Mota = Mota;
    }

    getMota() {
        return this.Mota;
    }

    setIdCart(idcart: string) {
        this.idcart = idcart;
    }

    setCount(count: number) {
        this.count = count;
    }

    setunitprice(unitprice: number) {
        this.unitprice = unitprice;
    }

    getIdCart() {
        return this.idcart;
    }

    getCount() {
        return this.count;
    }

    getunitprice() {
        return this.unitprice;
    }

}