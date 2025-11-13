// wishlist.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Wishlist {
    id: number;
    name: string;
    items: number[]; // Lưu ID sản phẩm
}

export interface Product {
    id: number;
    name: string;
    price: number;
    thumbnailUrl: string;
    reviewCount: number;
    averageRating: number;
    slug: string;
}

@Injectable({
    providedIn: 'root',
})
export class WishlistService {
    // Dữ liệu mẫu (Giả định sản phẩm 1 đã được thêm vào My Wishlist)
    private initialWishlists: Wishlist[] = [
        { id: 1, name: 'My Wishlist', items: [1] },
        { id: 2, name: 'Quà tặng bạn bè', items: [] },
    ];

    private wishlistsSubject = new BehaviorSubject<Wishlist[]>(this.initialWishlists);
    wishlists$: Observable<Wishlist[]> = this.wishlistsSubject.asObservable();

    private currentListIdSubject = new BehaviorSubject<number>(1);

    // Dữ liệu sản phẩm mẫu (Giống trong FeaturedProductsComponent)
    private productData: Product[] = [
        { id: 1, name: 'Xà Phòng Gội Đầu Thiên Nhiên', price: 200000, thumbnailUrl: '/assets/images/products/xa_phong_goi_dau_thien_nhien.svg', reviewCount: 3246, averageRating: 4.8, slug: 'xa-phong-goi-dau' },
        { id: 2, name: 'Khăn Giấy Tái Sử Dụng ZWS', price: 100000, thumbnailUrl: '/assets/images/products/khan_giay_tai_su_dung.svg', reviewCount: 236, averageRating: 4.5, slug: 'khan-giay-tai-su-dung' },
        { id: 3, name: 'Bàn Chải Tre Cao Cấp', price: 45000, thumbnailUrl: 'https://placehold.co/70x70/d1c3f7/330080?text=SP3', reviewCount: 500, averageRating: 4.9, slug: 'ban-chai-tre' },
        { id: 4, name: 'Bộ Ống Hút Thép Không Gỉ', price: 120000, thumbnailUrl: '/assets/images/products/ong_hut_inox.svg', reviewCount: 300, averageRating: 4.6, slug: 'ong-hut-inox' },
        { id: 5, name: 'Túi Lưới Đựng Rau Củ', price: 30000, thumbnailUrl: 'https://placehold.co/70x70/f7c3c3/800000?text=SP5', reviewCount: 150, averageRating: 4.7, slug: 'tui-luoi' },
    ];

    getWishlists(): Wishlist[] {
        return this.wishlistsSubject.value;
    }

    getCurrentList(): Wishlist {
        const lists = this.getWishlists();
        const currentId = this.currentListIdSubject.value;
        return lists.find(l => l.id === currentId) || lists[0]; // Trả về list đầu tiên nếu không tìm thấy
    }

    setCurrentList(listId: number): void {
        this.currentListIdSubject.next(listId);
    }

    getProductById(id: number): Product | undefined {
        return this.productData.find(p => p.id === id);
    }

    // Hàm này sẽ được gọi từ FeaturedProductsComponent
    updateList(listId: number, productId: number, isAdding: boolean): void {
        const lists = this.getWishlists();
        const list = lists.find(l => l.id === listId);

        if (list) {
            const index = list.items.indexOf(productId);
            if (isAdding && index === -1) {
                list.items.push(productId);
            } else if (!isAdding && index !== -1) {
                list.items.splice(index, 1);
            }
            this.wishlistsSubject.next(lists);
        }
    }

    // Hàm này sẽ được gọi từ FeaturedProductsComponent
    addNewList(name: string, productId: number): void {
        const lists = this.getWishlists();
        const newList: Wishlist = {
            id: lists.length + 1,
            name: name,
            items: [productId]
        };
        lists.push(newList);
        this.wishlistsSubject.next(lists);
    }
}
