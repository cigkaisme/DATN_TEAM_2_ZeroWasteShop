import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

// Giao diện (interface) cho dữ liệu sản phẩm
interface Product {
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string;
  reviewCount: number;
  averageRating: number;
  slug: string;
}

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule] // CurrencyPipe cho giá tiền
})

export class FeaturedProductsComponent implements OnInit {

  // Dữ liệu mẫu (Sản phẩm cơ bản)
  featuredProducts: Product[] = [
    { id: 1, name: 'Xà Phòng Gội Đầu Thiên Nhiên', price: 200000, thumbnailUrl: 'assets/images/shampoo_bar.jpg', reviewCount: 3246, averageRating: 4.8, slug: 'xa-phong-goi-dau' },
    { id: 2, name: 'Khăn Giấy Tái Sử Dụng ZWS', price: 100000, thumbnailUrl: 'assets/images/reusable_towel.jpg', reviewCount: 236, averageRating: 4.5, slug: 'khan-giay-tai-su-dung' },
    { id: 3, name: 'Son Dưỡng Môi ZWS', price: 50000, thumbnailUrl: 'assets/images/lip_balm.jpg', reviewCount: 20, averageRating: 4.0, slug: 'son-duong-moi' },
    { id: 4, name: 'Bàn Chải Đánh Răng Tre', price: 45000, thumbnailUrl: 'assets/images/bamboo_brush.jpg', reviewCount: 350, averageRating: 4.6, slug: 'ban-chai-tre' },
    { id: 5, name: 'Bàn Chải Cọ Nồi Bằng Đồng', price: 45000, thumbnailUrl: 'assets/images/bamboo_brush.jpg', reviewCount: 250, averageRating: 4.6, slug: 'ban-chai-co-noi' },
    { id: 6, name: 'Bộ Bàn Chải Chén Dĩa', price: 250000, thumbnailUrl: 'assets/images/bamboo_brush.jpg', reviewCount: 250, averageRating: 4.6, slug: 'bo-ban-chai-chen-dia' },
    { id: 7, name: 'Túi lưới đựng nông sản - Nhiều kích cỡ', price: 30000, thumbnailUrl: 'assets/images/bamboo_brush.jpg', reviewCount: 250, averageRating: 4.6, slug: 'ban-chai-co-noi' },
  ];

  // (Logic slider sản phẩm sẽ được thêm nếu cần)
  currentSlidePosition: number = 0;
  cardWidth: number = 290;

  ngOnInit() {
    // Gọi API để lấy dữ liệu sản phẩm tại đây
    // this.fetchFeaturedProducts();
  }

  slide(direction: 'next' | 'prev') {
    const totalCards = this.featuredProducts.length;
    const visibleCards = 4; // Số lượng card hiển thị cùng lúc
    const maxScroll = totalCards - visibleCards;

    if (direction === 'next' && this.currentSlidePosition < maxScroll) {
      this.currentSlidePosition += 1;
    } else if (direction === 'prev' && this.currentSlidePosition > 0) {
      this.currentSlidePosition -= 1;
    }
    // Logic: Nếu chuyển đến slide cuối, cuộn về slide đầu tiên (Tùy chọn)
    // else if (direction === 'next' && this.currentSlidePosition === maxScroll) {
    //     this.currentSlidePosition = 0;
    // }
  }

  // Hàm tạo mảng sao rỗng/đầy (để hiển thị icon sao)
  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill(0);
  }
}
