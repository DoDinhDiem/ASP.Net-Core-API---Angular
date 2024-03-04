import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { IBinhLuanTinTuc } from 'src/app/api/binhluantintuc';
import { IDanhMucTinTuc } from 'src/app/api/danhmuctintuc';
import { ITinTuc } from 'src/app/api/tintuc';
import { AccountService } from 'src/app/service/account.service';
import { BinhLuanTinTucService } from 'src/app/service/binhluantintuc.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
    selector: 'app-chitiettintuc',
    templateUrl: './chitiettintuc.component.html',
    styleUrls: ['./chitiettintuc.component.scss'],
    providers: [MessageService]
})
export class ChiTietTinTucComponent {
    tintuc: ITinTuc = {};
    id!: number;

    tinTuc!: IDanhMucTinTuc[];

    idClient = this.accountService.getUserIdClient();

    p: number = 1;

    comentNew: IBinhLuanTinTuc = {};
    comentNews!: IBinhLuanTinTuc[];

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id']; // Chuyển đổi id sang kiểu số nếu cần thiết
            this.loadChiTiet(this.id);
            this.getAllCommet(this.id);
            this.loadDanhMuc()
            this.canActivate();
        });
    }
    constructor(
        private clientService: ClientService,
        private messageService: MessageService,
        private accountService: AccountService,
        private binhluanService: BinhLuanTinTucService,
        private route: ActivatedRoute,
        private jwtHelper: JwtHelperService) { }

    loadChiTiet(id: number) {
        this.clientService.getChiTietTinTuc(id).subscribe(data => {
            this.tintuc = data;
        })
    }

    getAllCommet(id: number) {
        this.binhluanService.getAll(id).subscribe((data) => {
            this.comentNews = data
        })
    }

    save() {
        this.comentNew.userId = Number(this.idClient);
        this.comentNew.tinTucId = this.id

        if (this.idClient) {
            if (this.comentNew.id) {
                this.binhluanService.update(this.comentNew).subscribe({
                    next: res => {
                        this.comentNew = {};
                        this.getAllCommet(this.id);
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                    }
                })
            }
            else {
                this.binhluanService.create(this.comentNew).subscribe({
                    next: res => {
                        this.comentNew = {};
                        this.getAllCommet(this.id);
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 });
                    },
                    error: err => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi', life: 3000 });
                    }
                })
            }
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Hãy đăng nhập để tiếp tục', life: 3000 });
        }

    }

    loadDanhMuc() {
        this.clientService.getDanhMucTinTuc().subscribe(data => {
            this.tinTuc = data
        })
    }

    canActivate() {
        const token = localStorage.getItem('tokenClient');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            const userId = decodedToken?.UserId;
            this.accountService.setUserIdClient(userId);
            this.idClient = this.accountService.getUserIdClient()
        }
    }
}
