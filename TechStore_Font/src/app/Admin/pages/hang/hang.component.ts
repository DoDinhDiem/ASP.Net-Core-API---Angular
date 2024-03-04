import { Component } from '@angular/core';
import { IHang } from 'src/app/api/hang';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HangService } from 'src/app/service/hang.service';

interface action {
  value: boolean;
  name: string;
}
@Component({
  selector: 'app-hang',
  templateUrl: './hang.component.html',
  providers: [MessageService, ConfirmationService]

})
export class HangComponent {
  title = "Quản lý hãng sản phẩm"
  hangSanPham!: IHang;
  hangSanPhams!: IHang[];
  submitted: boolean = false;
  Dialog: boolean = false;
  selecteds!: IHang[] | null;
  Save = "Lưu";

  actions: action[] | undefined;
  selectAction: action | undefined;

  keyword: any = "";

  constructor(
    private hangService: HangService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  ngOnInit(): void {
    this.loadData(this.keyword);
    this.actions = [
      { value: true, name: 'Hiện' },
      { value: false, name: 'Ẩn' }
    ]
  }

  loadData(keyword: string) {
    this.hangService.search(keyword).subscribe((data) => {
      this.hangSanPhams = data
    })
  };
  toggleTrangThai(hang: IHang) {
    this.hangService.toggleTrangThai(hang.id).subscribe(() => {
      this.loadData(this.keyword);
    });
  }
  onKeywordInput() {
    this.loadData(this.keyword)
  }
  openNew() {
    this.hangSanPham = {};
    this.submitted = false;
    this.Save = "Lưu";
    this.Dialog = true;
  }

  deleteSelected() {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa các hãng sản phẩm đã chọn?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selecteds) {
          const ids = this.selecteds.map((hangSanPham) => hangSanPham.id as number);
          this.hangService.deleteMany(ids).subscribe((res) => {
            this.loadData(this.keyword);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
          });
        }
      }
    });
  }

  edit(hangSanPham: IHang) {
    this.hangService.getById(hangSanPham.id).subscribe(
      data => {
        this.hangSanPham = data;
        this.Save = "Cập nhập";
        this.Dialog = true;
      }
    )
  }

  deleteOnly(hang: IHang) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa ' + hang.tenHang + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hangService.delete(hang.id!).subscribe((res) => {
          this.loadData(this.keyword);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
        })
      }
    });
  }

  hidenDialog() {

    this.Dialog = false;
    this.hangSanPham = {};
    this.submitted = false;
  }

  save() {
    this.hangSanPham.trangThai = this.selectAction?.value
    this.submitted = true;

    if (this.hangSanPham.id) {
      this.hangService.update(this.hangSanPham).subscribe({
        next: res => {
          this.loadData(this.keyword);
          this.hidenDialog();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
        },
        error: err => {
          this.loadData(this.keyword);
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
        }
      })
    }
    else {
      this.hangService.create(this.hangSanPham).subscribe({
        next: res => {
          this.loadData(this.keyword);
          this.hidenDialog();
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
        }
      })
    }
  }
}
