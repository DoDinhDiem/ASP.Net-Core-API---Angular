import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class CartService {

    products: any[] = [];

    private productsSubject = new BehaviorSubject<any[]>([]);
    products$ = this.productsSubject.asObservable();

    constructor(
        private http: HttpClient
    ) { }

    getProduct() {
        return this.products
    }

    saveCart() {
        localStorage.setItem('cart_items', JSON.stringify(this.products))
    }

    addToCart(product: any) {
        const existingProduct = this.products.find(p => p.id === product.id);

        if (existingProduct) {
            // Nếu đã tồn tại, tăng số lượng
            existingProduct.soLuong += 1;
        } else {
            // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
            product.soLuong = 1;
            product.giaGiam = product.giaBan - product.khuyenMai
            this.products.push(product);
        }
        this.productsSubject.next(this.products);
        this.saveCart();
    }

    getQuantity(): number {
        return this.products.length;
    }

    incrementQuantity(product: any) {
        product.soLuong += 1;
        this.updateCart();
    }

    decrementQuantity(product: any) {
        if (product.soLuong > 1) {
            product.soLuong -= 1;
            this.updateCart();
        }
    }

    private updateCart() {
        this.productsSubject.next([...this.products]);
        this.saveCart();
        this.getTotalPrice();
        this.getQuantity();
    }

    getTotalPrice(): number {
        return this.products.reduce((total, product) => {
            const discountedPrice = product.giaBan - product.khuyenMai;
            return total + discountedPrice * product.soLuong;
        }, 0)
    }

    loadCart() {
        this.products = JSON.parse(localStorage.getItem('cart_items') as any) || []
    }

    productInCart(product: any) {
        return this.products.findIndex((x: any) => x.id === product.id) > -1
    }

    removeProduct(product: any) {
        const index = this.products.findIndex((x: any) => x.id === product.id)
        if (index > -1) {
            this.products.splice(index, 1)
            this.updateCart();
        }

    }

    clearProducts() {
        const emptyCart = [];
        localStorage.setItem('cart_items', JSON.stringify(emptyCart));
        this.products = [];
        this.getTotalPrice;
        this.updateCart()
    }

}


