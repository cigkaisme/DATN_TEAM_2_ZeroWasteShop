import {
  Component,
  signal,
  computed,
  Renderer2,
  OnDestroy,
  OnInit,
  Input,
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // Thêm CurrencyPipe và DecimalPipe
import { RouterLink } from '@angular/router'; // Giả định bạn có RouterLink

// --- 1. Định nghĩa Interfaces ---

interface Product {
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string;
  hoverUrl: string;
  reviewCount: number;
  averageRating: number;
  slug: string;
  isWished?: boolean;
  soldCount?: number;
}

// Định nghĩa cho các tùy chọn sắp xếp
type SortOption =
  | 'Nổi bật'
  | 'Bán chạy'
  | 'A-Z'
  | 'Z-A'
  | 'Giá, thấp đến cao'
  | 'Giá, cao đến thấp';

type FilterType = 'all' | 'best-seller' | 'favorite';

// --- 2. Dữ liệu mẫu (Mock Data) ---
// Dữ liệu dựa trên hình ảnh image_7a0cc4.jpg
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: '',
    price: 45000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP1',
    hoverUrl:'',
    reviewCount: 350,
    averageRating: 4.8,
    slug: 'ban-chai-danh-rang-tre',
    isWished: true,
    soldCount: 1200,
  },
  {
    id: 2,
    name: 'Miếng Rửa Bát Bằng Xơ Mướp',
    price: 40000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP2',
    hoverUrl:'',
    reviewCount: 120,
    averageRating: 4.7,
    slug: 'mieng-rua-bat-xo-muop',
    soldCount: 850,
  },
  {
    id: 3,
    name: '(STARTER KIT) Bộ Bàn Chải Cọ Rửa',
    price: 250000,
    thumbnailUrl: '/assets/images/products/ban_chai_co_rua_nha_ve_sinh.webp',
    hoverUrl:'/assets/images/products/ban_chai_co_rua_nha_ve_sinh_2.webp',
    reviewCount: 45,
    averageRating: 4.9,
    slug: 'starter-kit-ban-chai',
    soldCount: 320,
  },
  {
    id: 4,
    name: 'Lược Chải Tóc Bằng Tre',
    price: 80000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP4',
    hoverUrl:'',
    reviewCount: 80,
    averageRating: 4.6,
    slug: 'luoc-chai-toc-tre',
    soldCount: 560,
  },
  {
    id: 5,
    name: '(Pack 3 miếng) Cọ Rửa Đa Năng',
    price: 100000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP5',
    hoverUrl:'',
    reviewCount: 155,
    averageRating: 4.8,
    slug: 'co-rua-da-nang',
    soldCount: 980,
  },
  {
    id: 6,
    name: 'Túi Lưới Đa Năng Sản Phẩm (Nhiều Kích Cỡ)',
    price: 35000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP6',
    hoverUrl:'',
    reviewCount: 55,
    averageRating: 4.7,
    slug: 'tui-luoi-da-nang',
    soldCount: 440,
  },
  {
    id: 7,
    name: 'Bàn Chải Cọ Chậu Ngắn Bằng Tre',
    price: 60000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP7',
    hoverUrl:'',
    reviewCount: 36,
    averageRating: 4.5,
    slug: 'ban-chai-co-chau',
    soldCount: 280,
  },
  {
    id: 8,
    name: 'Khăn Giấy Tái Sử Dụng ZWS',
    price: 100000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP8',
    hoverUrl:'',
    reviewCount: 71,
    averageRating: 4.9,
    slug: 'khan-giay-tai-su-dung',
    soldCount: 720,
  },
  {
    id: 9,
    name: 'Ống Hút Tre (Pack 20 Ống + Thanh Cọ Rửa)',
    price: 140000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP9',
    hoverUrl:'',
    reviewCount: 92,
    averageRating: 4.8,
    slug: 'ong-hut-tre',
    soldCount: 650,
  },
  {
    id: 10,
    name: 'Nến Thơm Than Tre Gáo Dừa Bạc Hà',
    price: 195000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP10',
    hoverUrl:'',
    reviewCount: 30,
    averageRating: 4.9,
    slug: 'nen-thom-than-tre',
    soldCount: 380,
  },
  {
    id: 11,
    name: 'Bình Nước Thủy Tinh Tre',
    price: 165000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP11',
    hoverUrl:'',
    reviewCount: 88,
    averageRating: 4.7,
    slug: 'binh-nuoc-thuy-tinh',
    soldCount: 540,
  },
  {
    id: 12,
    name: 'Hộp Đựng Cơm Inox 3 Ngăn',
    price: 220000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP12',
    hoverUrl:'',
    reviewCount: 125,
    averageRating: 4.8,
    slug: 'hop-dung-com-inox',
    soldCount: 890,
  },
  {
    id: 13,
    name: 'Túi Vải Canvas Tái Chế',
    price: 85000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP13',
    hoverUrl:'',
    reviewCount: 210,
    averageRating: 4.6,
    slug: 'tui-vai-canvas',
    soldCount: 1100,
  },
  {
    id: 14,
    name: 'Bộ Thìa Dĩa Tre Cao Cấp',
    price: 175000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP14',
    hoverUrl:'',
    reviewCount: 62,
    averageRating: 4.9,
    slug: 'bo-thia-dia-tre',
    soldCount: 470,
  },
  {
    id: 15,
    name: 'Xà Phòng Handmade Organic',
    price: 55000,
    thumbnailUrl: 'https://placehold.co/300x300/F0F0F0/333?text=SP15',
    hoverUrl:'',
    reviewCount: 180,
    averageRating: 4.8,
    slug: 'xa-phong-handmade',
    soldCount: 950,
  },
];

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe], // Import pipes
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Input() filterType: FilterType = 'all';
  @Input() pageTitle: string = 'TẤT CẢ SẢN PHẨM';
  @Input() breadcrumbText: string = 'TẤT CẢ SẢN PHẨM';

  // --- 3. Trạng thái (State) ---
  isFilterSidebarOpen = signal(false);
  gridLayout = signal('grid-cols-4');

  // Tùy chọn Sắp xếp
  sortOptions: SortOption[] = [
    'Nổi bật',
    'Bán chạy',
    'A-Z',
    'Z-A',
    'Giá, thấp đến cao',
    'Giá, cao đến thấp',
  ];
  activeSort = signal<SortOption>('Nổi bật');

  // Trạng thái Wishlist (giả lập)
  wishlistStatus = signal<{ [key: number]: boolean }>({ 1: true }); // SP 1 đã được thích

  // Dữ liệu sản phẩm
  allProducts = signal<Product[]>(MOCK_PRODUCTS);

  // Sản phẩm đã lọc và sắp xếp (Sử dụng computed)
  filteredAndSortedProducts = computed(() => {
    let products = [...this.allProducts()];
    const type = this.filterType;

    // Bước 1: Lọc theo loại trang
    switch (type) {
      case 'best-seller':
        // Sắp xếp theo số lượng bán và lấy top 20
        products = products
          .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
          .slice(0, 20);
        break;

      case 'favorite':
        // Chỉ lấy sản phẩm có rating >= 4.8
        products = products.filter((p) => p.averageRating >= 4.8);
        break;

      case 'all':
      default:
        // Hiển thị tất cả sản phẩm
        break;
    }
    const sort = this.activeSort();
    switch (sort) {
      case 'A-Z':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Giá, thấp đến cao':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'Giá, cao đến thấp':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'Bán chạy':
        products.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
        break;
      case 'Nổi bật':
      default:
        // Giữ thứ tự đã lọc
        break;
    }

    return products;
  });

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Khởi tạo trạng thái wishlist (có thể lấy từ service)
    const initialStatus: { [key: number]: boolean } = {};
    this.allProducts().forEach((p) => {
      if (p.isWished) {
        initialStatus[p.id] = true;
      }
    });
    this.wishlistStatus.set(initialStatus);
  }

  ngOnDestroy() {
    // Đảm bảo mở khóa cuộn khi component bị hủy
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  // --- 4. Phương thức (Methods) ---

  // Mở/Đóng Bộ lọc và Khóa cuộn
  toggleFilterSidebar() {
    this.isFilterSidebarOpen.update((isOpen) => {
      const newState = !isOpen;
      if (newState) {
        this.renderer.addClass(document.body, 'no-scroll');
      } else {
        this.renderer.removeClass(document.body, 'no-scroll');
      }
      return newState;
    });
  }

  // Thay đổi Layout
  setGridLayout(layout: string) {
    this.gridLayout.set(layout);
  }

  // Thay đổi Sắp xếp
  onSortChange(event: Event) {
    const newSort = (event.target as HTMLSelectElement).value as SortOption;
    this.activeSort.set(newSort);
  }

  // Logic Thích/Bỏ thích
  toggleWishlist(productId: number) {
    this.wishlistStatus.update((currentStatus) => {
      const newStatus = { ...currentStatus };
      newStatus[productId] = !currentStatus[productId]; // Đảo ngược trạng thái

      if (newStatus[productId]) {
        console.log(`Đã THÍCH sản phẩm ${productId}`);
      } else {
        console.log(`Đã BỎ THÍCH sản phẩm ${productId}`);
      }
      return newStatus;
    });
  }

  // Giả lập click vào ảnh
  productClicked(slug: string) {
    console.log(`Đang điều hướng đến: /san-pham/${slug}`);
    // (Trong ứng dụng thật: this.router.navigate(['/san-pham', slug]);)
  }

  addToCart(productName: string) {
    console.log(`Đã thêm "${productName}" vào giỏ hàng! (Nút Giỏ hàng)`);
  }

  // Giả lập click "Mua ngay"
  buyNow(productName: string) {
    console.log(`Đã thêm "${productName}" vào giỏ hàng!`);
  }
}
