export interface IKhachHang {
    id?: number;
    userName?: string;
    passWord?: string;
    email?: string;
    roleId?: number;
    //Nhân viên
    userId?: number;
    firstName?: string;
    lastName?: string;
    soDienThoai?: string;
    diaChi?: string;
    ngaySinh?: Date;
    gioiTinh?: string;
    avartar?: string;
    trangThai?: boolean;
    createDate?: string;
    updateDate?: string;
}
