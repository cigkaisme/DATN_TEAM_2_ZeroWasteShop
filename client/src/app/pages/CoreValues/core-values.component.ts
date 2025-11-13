// core-values.component.ts (Standalone Component)

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-core-values',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './core-values.component.html',
  styleUrls: ['./core-values.component.css'],
})
export class CoreValuesComponent {
  values = [
    {
      iconUrl: 'assets/icons/core_values/san_pham_kiem_tra_ky.svg', // Thay bằng đường dẫn thực tế
      title: 'SẢN PHẨM ĐƯỢC KIỂM TRA MĨ',
      description: 'Chúng tôi chỉ mang đến những sản phẩm tốt nhất, an toàn và hiệu quả, để bạn yên tâm lựa chọn.'
    },
    {
      iconUrl: 'assets/icons/core_values/dong_goi_noi_khong_voi_nhua.svg',
      title: 'ĐÓNG GÓI - NÓI KHÔNG VỚI NHỰA',
      description: 'Đóng gói và vận chuyển bằng tình yêu thương, không phải bằng nhựa.'
    },
    {
      iconUrl: 'assets/icons/core_values/van_chuyen_trung_hoa.svg',
      title: 'VẬN CHUYỂN TRUNG HÒA CARBON',
      description: 'Mỗi đơn hàng đều được đóng gói bằng tay - vận chuyển bằng phương tiện có mức phát thải thấp hoặc bằng 0.'
    },
    {
      iconUrl: 'assets/icons/core_values/vi_cong_dong.png',
      title: 'VÌ CỘNG ĐỒNG',
      description: 'Một phần lợi nhuận sẽ được đóng góp vào các dự án bảo vệ môi trường, cùng nhau xây dựng một hành tinh tốt đẹp.'
    },
    {
      iconUrl: 'assets/icons/core_values/danh_gia.svg',
      title: 'HƠN 1.000 ĐÁNH GIÁ TÍCH CỰC',
      description: 'Khách hàng của chúng tôi tin tưởng, và chúng tôi cũng tin rằng bạn sẽ hài lòng với lựa chọn của mình.'
    },
    {
      iconUrl: 'assets/icons/core_values/eco_points.png',
      title: 'ECO POINT VÀ PHẦN THƯỞNG',
      description: 'Mua sắm - Tái sử dụng - Thưởng! Mỗi lần mua sắm là một cơ hội để tích điểm, và bạn có thể dùng chúng cho những lần mua sắm tiếp theo.'
    },
  ];
}
