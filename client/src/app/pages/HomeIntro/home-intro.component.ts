import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Định nghĩa Interface
interface RatingDistribution {
  star5Count: number;
  star4Count: number;
  star3Count: number;
  star2Count: number;
  star1Count: number;
}

interface HomeReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution;
  featuredReview: {
    quote: string;
  };
}

// Định nghĩa interface cho dữ liệu comment
interface CustomerReview {
  id: number;
  reviewerName: string;
  rating: number;
  quote: string;
  isVerified: boolean;
}

@Component({
  selector: 'app-home-intro',
  templateUrl: './home-intro.component.html',
  styleUrls: ['./home-intro.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeIntroComponent implements OnInit {

  // Dữ liệu mẫu (sẽ được thay thế bằng dữ liệu từ API)

  // --- DỮ LIỆU TỔNG QUAN (Rating Summary) ---
  reviewSummary: HomeReviewSummary = {
    averageRating: 4.59,
    totalReviews: 1460,
    ratingDistribution: {
      star5Count: 1005,
      star4Count: 350,
      star3Count: 80,
      star2Count: 15,
      star1Count: 10,
    },
    featuredReview: {
      quote: "Sản phẩm rất chất lượng, giao hàng nhanh chóng và tôi rất thích thông điệp của shop. Sẽ ủng hộ dài dài.",
    }
  };

  allStarCounts: { stars: number, count: number, width: number }[] = [];


  // --- DỮ LIỆU SLIDER COMMENT (Featured Reviews) ---
  reviews: CustomerReview[] = [
    // COMMENT MẪU 1
    {
      id: 1,
      reviewerName: 'Nguyễn Văn A',
      rating: 5,
      quote: "Sản phẩm chất lượng vượt trội, giao hàng nhanh chóng. Tôi cảm thấy yên tâm khi sử dụng các sản phẩm thân thiện môi trường của shop!",
      isVerified: true
    }
  ];

  currentReviewIndex: number = 0;
  private sliderInterval: any;

  ngOnInit() {
    this.calculateDistribution();
    // Bắt đầu slider chỉ sau khi dữ liệu đã được khởi tạo
    this.startSlider();
  }

  ngOnDestroy() {
    this.stopSlider();
  }

  calculateDistribution() {
    const total = this.reviewSummary.totalReviews;
    const dist = this.reviewSummary.ratingDistribution;

    this.allStarCounts = [
      { stars: 5, count: dist.star5Count, width: total > 0 ? (dist.star5Count / total) * 100 : 0 },
      { stars: 4, count: dist.star4Count, width: total > 0 ? (dist.star4Count / total) * 100 : 0 },
      { stars: 3, count: dist.star3Count, width: total > 0 ? (dist.star3Count / total) * 100 : 0 },
      { stars: 2, count: dist.star2Count, width: total > 0 ? (dist.star2Count / total) * 100 : 0 },
      { stars: 1, count: dist.star1Count, width: total > 0 ? (dist.star1Count / total) * 100 : 0 },
    ].reverse(); // Đảo ngược để 5 sao ở trên cùng
  }

  startSlider() {
        this.stopSlider();

        // Chỉ chạy slider nếu có nhiều hơn 1 review
        if (this.reviews.length > 1) {
            this.sliderInterval = setInterval(() => {
                this.nextSlide();
            }, 6000); // Tự động chuyển slide sau 6 giây
        }
  }

  stopSlider() {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
      this.sliderInterval = null;
    }
  }

  nextSlide() {
    this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
  }

  prevSlide() {
    this.currentReviewIndex = (this.currentReviewIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  // Phương thức để gọi API sẽ được thêm vào đây (fetchData())
}
