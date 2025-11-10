import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Banner {
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  link: string;
}

@Component({
  selector: 'app-hero-commitment-block',
  templateUrl: './hero-commitment-block.component.html',
  styleUrls: ['./hero-commitment-block.component.css'],
  // Khắc phục lỗi NG8103 nếu bạn dùng *ngFor
  imports: [CommonModule, RouterLink],
  standalone: true // Đặt thành true nếu đây là component độc lập
})
export class HeroCommitmentBlockComponent implements OnInit {

  banners: Banner[] = [
    {
      title: 'NGUỒN GỐC & TẦM NHÌN',
      description: 'Chúng tôi không có người sáng lập?',
      imageUrl: 'assets/images/banners/commitments/nguon_goc_tam_nhin.png', // Thay thế đường dẫn
      ctaText: 'GẶP NHỮNG NGƯỜI TIÊN PHONG',
      link: '/nguon-goc-va-tam-nhin'
    },
    {
      title: 'GIÁ TRỊ CỐT LÕI',
      description: 'Những con người tử tế, với tác động LỚN.',
      imageUrl: 'assets/images/banners/commitments/gia_tri_cot_loi.png', // Thay thế đường dẫn
      ctaText: 'TÌM HIỂU THÊM',
      link: '/gia-tri-cot-loi'
    },
    {
      title: 'CỘNG ĐỒNG CỦA CHÚNG TÔI',
      description: '“MỘT CÂY LÀM CHẲNG NÊN NON, BA CÂY CHỤM LẠI NÊN HÒN NÚI CAO”',
      imageUrl: 'assets/images/banners/commitments/cong_dong_cua_chung_toi.png', // Thay thế đường dẫn
      ctaText: 'TÌM HIỂU CỦA CHÚNG TÔI',
      link: '/cong-dong-cua-chung-toi'
    },
    {
      title: 'SỨ MỆNH & CAM KẾT',
      description: 'Hành tinh sạch, khách hàng hài lòng.',
      imageUrl: 'assets/images/banners/commitments/su_menh_cam_ket.png', // Thay thế đường dẫn
      ctaText: 'THAM GIA',
      link: '/su-menh-va-cam-ket'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
