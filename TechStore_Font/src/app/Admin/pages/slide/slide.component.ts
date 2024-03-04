import { Component } from '@angular/core';
import { ISlide } from 'src/app/api/slide';
import { SlideService } from 'src/app/service/slide.service';
import { ConfirmationService, MessageService } from 'primeng/api';

interface action {
    value: boolean;
    name: string;
}
@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class SlideComponent {
    title = "Quản lý Slide"
    slide!: ISlide;
    slides!: ISlide[];
    submitted: boolean = false;
    Dialog: boolean = false;
    selecteds!: ISlide[] | null;
    Save = "Lưu";

    actions: action[] | undefined;
    selectAction: action | undefined;

    fileOnly: File;
    sequenceNumber = 0;

    role: any[] = [];
    selectRole: any;

    chucvu: any[] = [];
    selectChucVu: any;

    shouldDisplayImage: boolean = false;

    constructor(
        private slideService: SlideService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }


    ngOnInit(): void {
        this.loadData();
        this.actions = [
            { value: true, name: 'Hiện' },
            { value: false, name: 'Ẩn' }
        ]
    }



    loadData() {

        this.slideService.search().subscribe((data) => {
            this.slides = data
        })
    };

    toggleTrangThai(slide: ISlide) {
        this.slideService.toggleTrangThai(slide.id).subscribe(() => {
            this.loadData();
        });
    }
    onKeywordInput() {
        this.loadData();
    }

    openNew() {
        this.slide = {};
        this.fileOnly = null;
        this.shouldDisplayImage = false;
        this.submitted = false;
        this.Dialog = true;
        this.Save = "Lưu";
    }

    edit(slide: ISlide) {
        this.slideService.getById(slide.id).subscribe(
            data => {
                this.shouldDisplayImage = true;
                this.slide = data;
                this.fileOnly = data.anhSlide;
                this.selectAction = this.actions.find(option => option.value == data.trangThai);
                this.Dialog = true;
                this.Save = "Cập nhập";
            }
        )
    }


    hidenDialog() {

        this.Dialog = false;
        this.slide = {};
        this.submitted = false;
    }

    save() {
        if (this.fileOnly) {
            this.slide.anhSlide = this.fileOnly.name;
        }
        this.slide.status = this.selectAction?.value;
        this.submitted = true;
        if (this.slide.anhSlide) {
            if (this.slide.id) {
                this.slideService.update(this.slide).subscribe({
                    next: res => {
                        this.loadData();
                        this.hidenDialog();
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.loadData();
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                    }
                })
            }
            else {
                this.slideService.create(this.slide).subscribe({
                    next: res => {
                        this.loadData();
                        this.hidenDialog();
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: err.error.message, life: 3000 });
                    }
                })
            }
        }
    }

    onFileOnly(event) {
        const files: FileList = event.target.files;
        const file = files[0];
        if (file) {
            const newName = this.generateNewFileName(file.name);
            this.fileOnly = new File([file], newName, { type: file.type });
        }
    }

    generateNewFileName(oldFileName: string): string {
        const timestamp = new Date().getTime();
        const extension = oldFileName.split('.').pop();
        const newFileName = `slide_${timestamp}_${this.sequenceNumber}.${extension}`;
        this.sequenceNumber++;
        return newFileName;
    }
    onUpload() {
        if (this.fileOnly) {
            this.slideService.uploadFile(this.fileOnly).subscribe({
                next: response => {
                },
                error: err => {
                }
            })
        }
    }
}
