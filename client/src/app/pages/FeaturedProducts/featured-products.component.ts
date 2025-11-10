import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
   selector: 'app-featured-products',
   standalone: true,
   imports: [CommonModule, RouterModule],
   templateUrl: './featured-products.component.html',
   styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent implements OnInit {
   readonly CARD_WIDTH = 240;
   readonly GAP = 20;

   currentIndex = 0;
   cardsPerView = 4;
   // Xóa bỏ totalCards và maxScroll, sử dụng products.length và tính toán trực tiếp

   products = [
     { id: 1, name: 'Xà Phòng Gội Đầu Thiên Nhiên', price: 200000, thumbnailUrl: '/assets/images/products/xa_phong_goi_dau_thien_nhien.svg', reviewCount: 3246, averageRating: 4.8, slug: 'xa-phong-goi-dau' },
     { id: 2, name: 'Khăn Giấy Tái Sử Dụng ZWS', price: 100000, thumbnailUrl: '/assets/images/products/khan_giay_tai_su_dung.svg', reviewCount: 236, averageRating: 4.5, slug: 'khan-giay-tai-su-dung' },
     { id: 3, name: 'Son Dưỡng Môi ZWS', price: 50000, thumbnailUrl: '/assets/images/products/son_duong_moi_zws.svg', reviewCount: 20, averageRating: 4.0, slug: 'son-duong-moi' },
     { id: 4, name: 'Bàn Chải Đánh Răng Tre', price: 45000, thumbnailUrl: '/assets/images/products/ban_chai_danh_rang_tre.svg', reviewCount: 350, averageRating: 4.6, slug: 'ban-chai-tre' },
     { id: 5, name: '(Pack 3 Miếng) Cọ Nồi Đồng', price: 45000, thumbnailUrl: '/assets/images/products/pack_3_mieng_co_noi_dong.svg', reviewCount: 250, averageRating: 4.6, slug: 'ban-chai-co-noi' },
     { id: 6, name: 'Bộ Bàn Chải Chén Dĩa', price: 250000, thumbnailUrl: '/assets/images/products/bo_ban_chai_chen_dia.svg', reviewCount: 250, averageRating: 4.6, slug: 'bo-ban-chai-chen-dia' },
     { id: 7, name: 'Túi lưới đựng nông sản - Nhiều kích cỡ', price: 30000, thumbnailUrl: '/assets/images/products/tui_luoi_dung_nong_san.svg', reviewCount: 250, averageRating: 4.6, slug: 'tui-luoi-nong-san' },
    // === THÊM SẢN PHẨM THỨ 8 ĐỂ CHO PHÉP CUỘN TỚI INDEX 4 ===
     { id: 8, name: 'Bông Tẩy Trang Tái Sử Dụng', price: 80000, thumbnailUrl: '/assets/images/products/bong_tay_trang.svg', reviewCount: 150, averageRating: 4.7, slug: 'bong-tay-trang' },
     { id: 9, name: 'Bông Tẩy Trang Tái Sử Dụng', price: 80000, thumbnailUrl: '/assets/images/products/bong_tay_trang.svg', reviewCount: 150, averageRating: 4.7, slug: 'bong-tay-trang' },
     { id: 10, name: 'Bông Tẩy Trang Tái Sử Dụng', price: 80000, thumbnailUrl: '/assets/images/products/bong_tay_trang.svg', reviewCount: 150, averageRating: 4.7, slug: 'bong-tay-trang' },
   ];

   Math = Math;

   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

   ngOnInit() {
     this.updateCardsPerView();
   }

   @HostListener('window:resize')
   onResize() {
     // const oldCardsPerView = this.cardsPerView; // Không cần thiết
     this.updateCardsPerView();

     // Điều chỉnh currentIndex khi thay đổi cardsPerView để tránh lỗi hiển thị
     // Tính lại maxScroll sau khi cardsPerView thay đổi
     const maxScroll = Math.max(0, this.products.length - this.cardsPerView);
     if (this.currentIndex > maxScroll) {
        this.currentIndex = maxScroll;
     }
   }

   private updateCardsPerView() {
     if (isPlatformBrowser(this.platformId)) {
        // const width = window.innerWidth; // Không cần thiết khi force 4
        this.cardsPerView = 4;
     } else {
        this.cardsPerView = 4;
     }
   }

   nextSlide() {
     // Vị trí cuối cùng có thể cuộn (Last Index): products.length - cardsPerView
     // Vì bạn đã thêm 1 sản phẩm (tổng 8), maxScroll của bạn là 4.
     // Vị trí cuối cùng hợp lệ để dừng là 4.
     const maxScroll = this.products.length - this.cardsPerView;

     // FIX: Nếu currentIndex đã đạt đến maxScroll, chuyển về 0 (sản phẩm đầu tiên)
     if (this.currentIndex >= maxScroll) {
        this.currentIndex = 0; // Quay về đầu
     } else {
        // Nếu chưa phải là cuối, cuộn bình thường
        this.currentIndex++;
     }

     console.log('Next (Loop) - currentIndex:', this.currentIndex, 'maxScroll:', maxScroll);
   }

   prevSlide() {
     // Vị trí cuối cùng có thể cuộn (Last Index)
     const maxScroll = this.products.length - this.cardsPerView;

     // FIX: Nếu currentIndex đang ở 0, chuyển về maxScroll (sản phẩm cuối cùng)
     if (this.currentIndex === 0) {
        this.currentIndex = maxScroll; // Chuyển đến cuối
     } else {
        // Nếu chưa phải là đầu, cuộn lùi bình thường
        this.currentIndex--;
     }

     console.log('Prev (Loop) - currentIndex:', this.currentIndex);
   }

   // Helper methods for template
   get canGoPrev(): boolean {
     return true;
   }

   get canGoNext(): boolean {
     return true;
   }

   getStars(rating: number): number[] {
     return Array(5).fill(0);
   }
}
