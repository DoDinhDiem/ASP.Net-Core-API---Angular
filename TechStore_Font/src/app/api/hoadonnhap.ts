export interface IHoaDonNhap {
    id?: number;
    userId?: number;
    nhaCungCapId?: number;
    trangThaiThanhToan?: boolean;
    tongTien?: number;
    chiTietHoaDonNhaps?: {
        sanPhamId?: number;
        soLuongNhap?: number;
        GiaNhap?: number;
        ThanhTien?: number;
    }[] | null;
}
