import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-category-list',
  templateUrl: './home-category-list.component.html',
  styleUrls: ['./home-category-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})

export class HomeCategoryListComponent {
  categories = [
    {
      name: 'ĐỒ DÙNG BẾP',
      routerLink: '/danh-muc/do-dung-bep',
      iconUrl: 'assets/icons/categories_icon/kitchen.svg'
    },
    {
      name: 'CHĂM SÓC CÁ NHÂN',
      routerLink: '/danh-muc/cham-soc-ca-nhan',
      iconUrl: 'assets/icons/categories_icon/body_care.svg'
    },
    {
      name: 'TÁI SỬ DỤNG',
      routerLink: '/danh-muc/tai-su-dung',
      iconUrl: 'assets/icons/categories_icon/tai_su_dung.svg'
    },
    {
      name: 'STARTER KIT / COMBO',
      routerLink: '/danh-muc/starter-kit',
      iconUrl: 'assets/icons/categories_icon/kits_bundles.svg'
    }
  ];
}
