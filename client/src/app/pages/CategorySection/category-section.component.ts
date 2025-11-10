import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface Product {
    // Các thuộc tính có thể thiếu ở thẻ GIF/Video (Media Lớn)
    id?: number;
    slug?: string;
    name?: string;
    price?: number;
    averageRating?: number;
    reviewCount?: number;
    label?: string;
    hoverUrl?: string;

    // Các thuộc tính luôn có, hoặc chỉ có ở thẻ Media Lớn
    thumbnailUrl: string; // Đây là thuộc tính bắt buộc (vì tất cả các thẻ đều có ảnh)

    // Thuộc tính chỉ có ở thẻ Media Lớn
    isLargeMedia?: boolean;
    mediaUrl?: string;
    videoOverlayText?: string;
}

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.css'],
})
export class CategorySectionComponent {
  Math = Math;

  categories = [
   {
    name: 'ĐỒ DÙNG BẾP',
    routerLink: '/danh-muc/do-dung-bep',
    products: [
     {
       thumbnailUrl: 'assets/media/do_dung_bep.gif',
       isLargeMedia: true, // Thẻ lớn
       mediaUrl: '/assets/media/do_dung_bep.gif',
       videoOverlayText: 'Nâng tầm không gian bếp: Các sản phẩm thiết yếu, không làm hại môi trường.',
     },

     // Các sản phẩm khác giữ nguyên (thẻ ảnh tĩnh)
     {
        id: 1,
        slug:'/bo_ban_chai_chen_dia',
        name: 'Bộ Bàn Chải Chén Dĩa',
        price: 250000,
        thumbnailUrl: '/assets/images/products/bo_ban_chai_chen_dia.webp',
        hoverUrl: '/assets/images/products/bo_ban_chai_chen_dia_2.webp',
        averageRating: 5,
        reviewCount: 46
     },
     {
        id: 2,
        slug:'/pack_3_mieng_co_noi_dong',
        name: '(Pack 3 Miếng) Cọ Nồi Đồng',
        price: 45000,
        thumbnailUrl: '/assets/images/products/pack_3_mieng_co_noi_dong.webp',
        hoverUrl: '/assets/images/products/pack_3_mieng_co_noi_dong_2.webp',
        label: 'NEW',
        averageRating: 5,
        reviewCount: 10
     },
     {
        id: 3,
        slug:'/mieng_co_rua_bang_dua',
        name: 'Tấm Lót Rửa Chén Xơ Mướp',
        price: 55000,
        thumbnailUrl: '/assets/images/products/mieng_co_rua_bang_dua_2.webp',
        hoverUrl: '/assets/images/products/mieng_co_rua_bang_dua.webp',
        averageRating: 4,
        reviewCount: 120
     },
     {
        id: 4,
        slug:'/tui_luoi_dung_nong_san',
        name: 'Túi lưới đựng nông sản',
        price: 30000,
        thumbnailUrl: '/assets/images/products/tui_luoi_dung_nong_san.webp',
        hoverUrl: '/assets/images/products/tui_luoi_dung_nong_san_2.webp',
        averageRating: 5,
        reviewCount: 54
     },
    ],
   },
   {
    name: 'CHĂM SÓC CÁ NHÂN',
    routerLink: '/danh-muc/cham-soc-ca-nhan',
    products: [
     {
       thumbnailUrl: 'assets/media/cham_soc_ca_nhan.gif',
       isLargeMedia: true,
       mediaUrl: '/assets/media/cham_soc_ca_nhan.gif',
       videoOverlayText: 'Sự thanh lọc: Thanh lọc cơ thể, thanh lọc hành tinh.',
     },

     {
       id: 5,
       slug:'/xa_phong_goi_dau_thien_nhien',
       name: 'Xà Phòng Thảo Mộc (1 Bánh)',
       price: 50000,
       thumbnailUrl: '/assets/images/products/xa_phong_goi_dau_thien_nhien.webp',
       hoverUrl: '/assets/images/products/xa_phong_goi_dau_thien_nhien_2.webp',
       averageRating: 5,
       reviewCount: 54
     },
     {
       id: 6,
       slug:'/ban_chai_co_rua_nha_ve_sinh',
       name: 'Bàn Chải Cọ Rửa Nhà Vệ Sinh',
       price: 100000,
       thumbnailUrl: '/assets/images/products/ban_chai_co_rua_nha_ve_sinh.webp',
       hoverUrl: '/assets/images/products/ban_chai_co_rua_nha_ve_sinh_2.webp',
       label: 'NEW',
       averageRating: 5,
       reviewCount: 54
     },
     {
       id: 7,
       slug:'/luoc_chai_toc_bang_go',
       name: 'Lược Chải Tóc Bằng Gỗ',
       price: 42000,
       thumbnailUrl: '/assets/images/products/luoc_chai_toc_bang_go.webp',
       hoverUrl: '/assets/images/products/luoc_chai_toc_bang_go_2.webp',
       averageRating: 5,
       reviewCount: 54
     },
     {
       id: 8,
       slug:'/dao_cao_rau_thep_brass_handle_safety_razor',
       name: 'Dao Cạo Râu Thép Brass Handle Safety Razor',
       price: 279000,
       thumbnailUrl: '/assets/images/products/dao_cao_rau_thep.jpg',
       hoverUrl:'/assets/images/products/dao_cao_rau_thep_2.jpg',
       averageRating: 4.0,
       reviewCount: 15
     },
    ],
   },
  ];

  constructor(public router: Router) {}

  ngOnInit() {
    // Gọi hàm tạo slug khi component khởi tạo
    this.processProducts();
  }

  createSlug(name: string): string {
    // ... (logic tạo slug) ...
    if (!name) return '';

    let slug = name.toLowerCase();
    slug = slug.replace(/á|à|ả|ã|ạ/g, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ/g, 'e');
    slug = slug.replace(/í|ì|ỉ|ĩ|ị/g, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ/g, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ/g, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y');
    slug = slug.replace(/đ/g, 'd');
    slug = slug.replace(/[^a-z0-9]+/g, '-');
    slug = slug.replace(/^-+|-+$/g, '');

    return slug;
  }

  processProducts() {
    this.categories.forEach(category => {
      category.products.forEach(product => {
        if (product.name) {
          product.slug = this.createSlug(product.name);
        }
      });
    });
  }


  // Hàm xử lý click và điều hướng
  navigateToProduct(product: Product, event: Event) {
    // 1. Ngăn chặn điều hướng nếu click vào nút Wishlist
    const target = event.target as HTMLElement;
    // Kiểm tra nếu phần tử được click hoặc bất kỳ phần tử cha nào là .wish-btn
    if (target.closest('.wish-btn')) {
        event.stopPropagation(); // Đảm bảo dừng sự kiện
        return;
    }

    // 2. Chỉ điều hướng nếu sản phẩm có SLUG hoặc ID
    if (product.slug) {
        this.router.navigate(['/product', product.slug]);
    } else if (product.id) {
        // Nếu không có slug, dùng id để điều hướng. Đảm bảo id có tồn tại.
        this.router.navigate(['/product', product.id]);
    }
    // Nếu cả hai đều không tồn tại (thẻ Media Lớn), không làm gì cả.
}

  getStars(rating: number): number[] {
    return Array(5).fill(0);
  }
}
