import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  // Thêm các module cần thiết (CommonModule, RouterLink)
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Dữ liệu cho phần 4 giá trị cốt lõi (để dễ quản lý trong TS)
  coreValues = [
    { title: 'Nguồn Gốc & Tầm Nhìn', icon: '🍃', description: 'Bắt nguồn từ tình yêu thiên nhiên, hướng tới không rác thải.' },
    { title: 'Giá Trị Cốt Lõi', icon: '🌱', description: 'Minh bạch, bền vững, và tôn trọng môi trường.' },
    { title: 'Cộng Đồng', icon: '🤝', description: 'Kết nối những người cùng chí hướng, cùng nhau thay đổi.' },
    { title: 'Sứ Mệnh & Cam Kết', icon: '🌎', description: 'Cung cấp sản phẩm chất lượng, an toàn, và thân thiện môi trường.' }
  ];
}
