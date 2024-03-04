export interface ITinTuc {
    id?: number;
    tieuDe?: string;
    noiDung?: string;
    trangThai?: boolean;
    danhMucId?: number;
    nguoiViet?: number;
    createDate?: string;
    updateDate?: string;
    anhDaiDien?: string;
    anhTinTucs?: {
        duongDan?: any;
        trangThai?: boolean;
    }[] | null;
}

