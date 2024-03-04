export interface IHoaDonBan {
    id?: number;
    userId?: number;
    hoTen?: string;
    soDienThoai?: string;
    email?: string;
    diaChi?: string;
    ghiChu?: string;
    trangThai?: string;
    tongTien?: number
    giamGia?: number
    trangThaiThanhToan?: boolean;
    chiTietHoaDonBans?: {
        sanPhamId?: number;
        soLuong?: number;
        giaBan?: number;
        thanhTien?: number;
    }[] | null;
}
