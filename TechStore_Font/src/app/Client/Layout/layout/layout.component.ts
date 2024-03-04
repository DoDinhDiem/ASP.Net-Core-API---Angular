import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {

    cartItems: any[] = [];
    quantity = 0;
    totalPrice: number = 0;
    token: string | null;

    isProfileMenuOpen: boolean = false;

    constructor(private cartService: CartService,
        private accountService: AccountService,
        private router: Router) {
        this.token = this.accountService.getTokenClient();
    }

    ngAfterViewInit() {
        const script = document.createElement('script');
        script.src = "/assets/Client/styles/js/main.js"
        document.body.appendChild(script)
    }

    ngOnInit() {
        this.cartService.loadCart();
        this.cartService.products$.subscribe((products) => {
            this.getQuantity();
            this.calculateTotalPrice();
            this.updateCart(products)
        });
        this.cartItems = this.cartService.getProduct();
    }

    getQuantity() {
        this.quantity = this.cartService.getQuantity();
    }

    calculateTotalPrice() {
        this.totalPrice = this.cartService.getTotalPrice();
    }

    removeFromCart(product: any) {
        this.cartService.removeProduct(product);
        this.cartItems = this.cartService.getProduct();
        this.getQuantity();
        this.calculateTotalPrice();
    }

    updateCart(cartItems: any[]) {
        this.cartItems = cartItems;
        this.getQuantity();
        this.calculateTotalPrice();
    }

    toggleProfileMenu() {
        this.isProfileMenuOpen = !this.isProfileMenuOpen;
    }
    onSubmit() {
        this.accountService.isLoggedInClient()
        this.router.navigate(['/loginClient'])

    }

}
