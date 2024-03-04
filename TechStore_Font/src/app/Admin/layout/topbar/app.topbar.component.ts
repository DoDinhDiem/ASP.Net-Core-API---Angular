import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";
import { AccountService } from 'src/app/service/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.scss']
})
export class AppTopBarComponent {

    items!: MenuItem[];
    currentDate: Date;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private accountService: AccountService,
        private router: Router,) { }

    ngOnInit() {
        this.currentDate = new Date();
    }
    isProfileMenuOpen: boolean = false;

    toggleProfileMenu() {
        this.isProfileMenuOpen = !this.isProfileMenuOpen;
    }
    onSubmit() {
        this.accountService.isLoggedIn()
        this.router.navigate(['/login'])

    }
}
