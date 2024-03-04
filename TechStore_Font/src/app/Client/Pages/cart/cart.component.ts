import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
})
export class CartComponent {
    cartItems: any[] = [];
    quantity = 0;
    totalPrice: number = 0;
    price: number = 0;
    constructor(private cartService: CartService) { }

    ngOnInit() {
        this.cartService.loadCart();
        this.cartService.products$.subscribe((products) => {
            this.getQuantity();
            this.calculateTotalPrice();
        });
        this.cartItems = this.cartService.getProduct()
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

    incrementQuantity(cart: any) {
        this.cartService.incrementQuantity(cart);
    }

    decrementQuantity(cart: any) {
        this.cartService.decrementQuantity(cart);
    }

    calculateSubtotal(cart: any): number {
        const discountedPrice = cart.giaBan - cart.khuyenMai;
        return discountedPrice * cart.soLuong;
    }
}
