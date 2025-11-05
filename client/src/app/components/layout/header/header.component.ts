import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Biến kiểm soát trạng thái menu
  isMenuOpen: boolean = false;

  constructor() { }

  // Hàm mở/đóng menu
  toggleSideMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}
}
