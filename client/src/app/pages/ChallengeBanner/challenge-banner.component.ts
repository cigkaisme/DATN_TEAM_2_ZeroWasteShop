import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Thêm CommonModule nếu component là standalone

@Component({
  selector: 'app-challenge-banner',
  templateUrl: './challenge-banner.component.html',
  styleUrls: ['./challenge-banner.component.css'],
  // Thêm CommonModule và cấu hình standalone nếu cần
  // imports: [CommonModule],
  // standalone: true
})
export class ChallengeBannerComponent implements OnInit {

  // Bạn có thể dùng mảng này để lưu trữ các đường dẫn icon mạng xã hội
  // nếu bạn muốn sử dụng *ngFor trong HTML thay vì hardcode.
  socialLinks = [
    { name: 'X', icon: 'assets/icons/x-icon.svg', url: '#', label: 'X (Twitter)' },
    { name: 'Twitch', icon: 'assets/icons/twitch-icon.svg', url: '#', label: 'Twitch' },
    { name: 'Facebook', icon: 'assets/icons/facebook-icon.svg', url: '#', label: 'Facebook' },
    { name: 'Instagram', icon: 'assets/icons/instagram-icon.svg', url: '#', label: 'Instagram' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Bạn có thể thêm các hàm xử lý sự kiện tại đây nếu nút CTA không phải là link
  onChallengeCtaClick(): void {
    console.log('Chuyển hướng đến trang Thử Thách Sống Xanh...');
    // Thêm logic điều hướng router ở đây
    // this.router.navigate(['/challenge']);
  }
}
