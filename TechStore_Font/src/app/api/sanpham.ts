export interface ISanPham {
    id?: number;
    anhDaiDien?: string;
    tenSanPham?: string;
    giaBan?: number;
    khuyenMai?: number;
    soLuongTon?: number;
    baoHanh?: string;
    moTa?: string;
    loaiId?: number;
    hangSanXuatId?: number;
    trangThaiSanPham?: string;
    trangThaiHoatDong?: boolean;
    duongDanAnh?: string;
    createDate?: string;
    updateDate?: string;
    anhSanPhams?: {
        duongDanAnh?: any;
        trangThai?: boolean;
    }[] | null;
    thongSos?: {
        tenThongSo?: string;
        moTa?: string;
        trangThai?: boolean;
    }[] | null;
}
