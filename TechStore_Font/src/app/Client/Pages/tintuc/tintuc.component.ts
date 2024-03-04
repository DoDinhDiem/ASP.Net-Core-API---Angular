import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITinTuc } from 'src/app/api/tintuc';
import { ClientService } from 'src/app/service/client.service';

@Component({
    selector: 'app-tintuc',
    templateUrl: './tintuc.component.html',
    styleUrls: ['./tintuc.component.scss']
})
export class TinTucComponent {
    tinTucs!: ITinTuc[];

    id!: number;
    name!: string;

    p: number = 1;

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id'];
            this.loadTinTuc(this.id);
            this.loadNameTinTuc(this.id)
        });
    }

    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute) { }

    loadTinTuc(id: number) {
        this.clientService.getTinTucByDanhMucId(id).subscribe(data => {
            this.tinTucs = data
        })
    }
    loadNameTinTuc(id: number) {
        this.clientService.getNameTinTuc(id).subscribe((data) => {
            this.name = data.name
        })
    }
}
