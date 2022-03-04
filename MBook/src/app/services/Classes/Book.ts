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

export interface Category {
    id: string;
    TenChuDe: string;
}