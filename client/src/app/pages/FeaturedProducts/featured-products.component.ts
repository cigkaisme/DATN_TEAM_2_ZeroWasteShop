import {
  Component,
  OnInit,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface ProductAttribute {
  name: string;
  value: string;
  options?: string[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string;
  reviewCount: number;
  averageRating: number;
  slug: string;
  isWished?: boolean;
  attributes?: ProductAttribute[];
}

interface Wishlist {
  id: number;
  name: string;
  items: number[]; // Lưu ID sản phẩm
}

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent implements OnInit {
  readonly CARD_WIDTH = 240;
  readonly GAP = 20;

  currentIndex = 0;
  cardsPerView = 4;
  // Xóa bỏ totalCards và maxScroll, sử dụng products.length và tính toán trực tiếp

  isModalVisible: boolean = false;
  selectedProduct: Product | any = {};
  newListName: string = '';
  showNewListInput: boolean = false;

  isQuickBuyModalVisible: boolean = false;
  selectedQuickBuyProduct: Product | null = null;
  selectedAttributes: { [key: string]: string } = {};

  products = [
    {
      id: 1,
      name: 'Xà Phòng Gội Đầu Thiên Nhiên',
      price: 200000,
      thumbnailUrl: '/assets/images/products/xa_phong_goi_dau_thien_nhien.svg',
      reviewCount: 3246,
      averageRating: 4.8,
      slug: 'xa-phong-goi-dau',
      attributes: [
        {
          name: 'Mùi',
          value: 'Vải lạnh tươi',
          options: ['Vải lạnh tươi', 'Không mùi', 'Hoa lavender'],
        },
      ],
    },
    {
      id: 2,
      name: 'Khăn Giấy Tái Sử Dụng ZWS',
      price: 100000,
      thumbnailUrl: '/assets/images/products/khan_giay_tai_su_dung.svg',
      reviewCount: 236,
      averageRating: 4.5,
      slug: 'khan-giay-tai-su-dung',
      attributes: [
        { name: 'Size', value: 'M', options: ['S', 'M', 'L'] },
        { name: 'Màu', value: 'Trắng', options: ['Trắng', 'Be', 'Xanh'] },
      ],
    },
    {
      id: 3,
      name: 'Son Dưỡng Môi ZWS',
      price: 50000,
      thumbnailUrl: '/assets/images/products/son_duong_moi_zws.svg',
      reviewCount: 20,
      averageRating: 4.0,
      slug: 'son-duong-moi',
    },
    {
      id: 4,
      name: 'Bàn Chải Đánh Răng Tre',
      price: 45000,
      thumbnailUrl: '/assets/images/products/ban_chai_danh_rang_tre.svg',
      reviewCount: 350,
      averageRating: 4.6,
      slug: 'ban-chai-tre',
    },
    {
      id: 5,
      name: '(Pack 3 Miếng) Cọ Nồi Đồng',
      price: 45000,
      thumbnailUrl: '/assets/images/products/pack_3_mieng_co_noi_dong.svg',
      reviewCount: 250,
      averageRating: 4.6,
      slug: 'ban-chai-co-noi',
    },
    {
      id: 6,
      name: 'Bộ Bàn Chải Chén Dĩa',
      price: 250000,
      thumbnailUrl: '/assets/images/products/bo_ban_chai_chen_dia.svg',
      reviewCount: 250,
      averageRating: 4.6,
      slug: 'bo-ban-chai-chen-dia',
    },
    {
      id: 7,
      name: 'Túi lưới đựng nông sản - Nhiều kích cỡ',
      price: 30000,
      thumbnailUrl: '/assets/images/products/tui_luoi_dung_nong_san.svg',
      reviewCount: 250,
      averageRating: 4.6,
      slug: 'tui-luoi-nong-san',
    },
    // === THÊM SẢN PHẨM THỨ 8 ĐỂ CHO PHÉP CUỘN TỚI INDEX 4 ===
    {
      id: 8,
      name: 'Bông Tẩy Trang Tái Sử Dụng',
      price: 80000,
      thumbnailUrl: '/assets/images/products/bong_tay_trang.svg',
      reviewCount: 150,
      averageRating: 4.7,
      slug: 'bong-tay-trang',
    },
    {
      id: 9,
      name: 'Bông Tẩy Trang Tái Sử Dụng',
      price: 80000,
      thumbnailUrl: '/assets/images/products/bong_tay_trang.svg',
      reviewCount: 150,
      averageRating: 4.7,
      slug: 'bong-tay-trang',
    },
    {
      id: 10,
      name: 'Bông Tẩy Trang Tái Sử Dụng',
      price: 80000,
      thumbnailUrl: '/assets/images/products/bong_tay_trang.svg',
      reviewCount: 150,
      averageRating: 4.7,
      slug: 'bong-tay-trang',
    },
  ];

  wishlistLists: Wishlist[] = [
    { id: 1, name: 'My Wishlist', items: [] },
    { id: 2, name: 'Quà tặng bạn bè', items: [] },
  ];

  Math = Math;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateCardsPerView();
  }

  @HostListener('window:resize')
  onResize() {
    // const oldCardsPerView = this.cardsPerView; // Không cần thiết
    this.updateCardsPerView();

    // Điều chỉnh currentIndex khi thay đổi cardsPerView để tránh lỗi hiển thị
    // Tính lại maxScroll sau khi cardsPerView thay đổi
    const maxScroll = Math.max(0, this.products.length - this.cardsPerView);
    if (this.currentIndex > maxScroll) {
      this.currentIndex = maxScroll;
    }
  }

  private updateCardsPerView() {
    if (isPlatformBrowser(this.platformId)) {
      // const width = window.innerWidth; // Không cần thiết khi force 4
      this.cardsPerView = 4;
    } else {
      this.cardsPerView = 4;
    }
  }

  nextSlide() {
    // Vị trí cuối cùng có thể cuộn (Last Index): products.length - cardsPerView
    // Vì bạn đã thêm 1 sản phẩm (tổng 8), maxScroll của bạn là 4.
    // Vị trí cuối cùng hợp lệ để dừng là 4.
    const maxScroll = this.products.length - this.cardsPerView;

    // FIX: Nếu currentIndex đã đạt đến maxScroll, chuyển về 0 (sản phẩm đầu tiên)
    if (this.currentIndex >= maxScroll) {
      this.currentIndex = 0; // Quay về đầu
    } else {
      // Nếu chưa phải là cuối, cuộn bình thường
      this.currentIndex++;
    }

    console.log(
      'Next (Loop) - currentIndex:',
      this.currentIndex,
      'maxScroll:',
      maxScroll
    );
  }

  prevSlide() {
    // Vị trí cuối cùng có thể cuộn (Last Index)
    const maxScroll = this.products.length - this.cardsPerView;

    // FIX: Nếu currentIndex đang ở 0, chuyển về maxScroll (sản phẩm cuối cùng)
    if (this.currentIndex === 0) {
      this.currentIndex = maxScroll; // Chuyển đến cuối
    } else {
      // Nếu chưa phải là đầu, cuộn lùi bình thường
      this.currentIndex--;
    }

    console.log('Prev (Loop) - currentIndex:', this.currentIndex);
  }

  // Helper methods for template
  get canGoPrev(): boolean {
    return true;
  }

  get canGoNext(): boolean {
    return true;
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0);
  }

  openWishlistModal(product: Product) {
    if (!product.id) return;
    this.selectedProduct = product;
    this.isModalVisible = true;
  }

  closeWishlistModal() {
    this.isModalVisible = false;
    this.newListName = '';
    this.selectedProduct = {};
    this.showNewListInput = false;
  }

  toggleNewListInput() {
    this.showNewListInput = true;
  }

  get isAnyListSelected(): boolean {
    const productId = this.selectedProduct?.id;
    if (!productId) return false;
    return this.wishlistLists.some((list) => list.items.includes(productId));
  }

  toggleItemInList(list: Wishlist, productId: number, isChecked: boolean) {
    const itemIndex = list.items.indexOf(productId);

    if (isChecked && itemIndex === -1) {
      list.items.push(productId);
    } else if (!isChecked && itemIndex !== -1) {
      list.items.splice(itemIndex, 1);
    }

    // Cập nhật trạng thái isWished cho sản phẩm gốc
    this.updateProductWishStatus(productId);
  }

  updateProductWishStatus(productId: number) {
    const isWished = this.wishlistLists.some((list) =>
      list.items.includes(productId)
    );

    // Chỉ cần duyệt qua mảng products của component này
    this.products.forEach((product) => {
      if (product.id === productId) {
        // Ép kiểu an toàn (Type Assertion)
        (product as Product).isWished = isWished;
      }
    });
  }

  createNewList() {
    if (this.newListName.trim() && this.selectedProduct.id) {
      const newListId = this.wishlistLists.length + 1;
      const newList: Wishlist = {
        id: newListId,
        name: this.newListName.trim(),
        items: [this.selectedProduct.id],
      };
      this.wishlistLists.push(newList);
      alert(
        `Đã tạo danh sách "${this.newListName}" và thêm ${this.selectedProduct.name}.`
      );
      this.updateProductWishStatus(this.selectedProduct.id); // Cập nhật trạng thái tim
      this.closeWishlistModal();
    } else if (!this.newListName.trim()) {
      alert('Vui lòng nhập tên danh sách.');
    }
  }

  addSelectedToLists() {
    if (this.isAnyListSelected) {
      this.closeWishlistModal();
    }
  }

  // Mở Quick Buy Modal
  openQuickBuyModal(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.selectedQuickBuyProduct = product;
    this.isQuickBuyModalVisible = true;

    // Khởi tạo giá trị mặc định cho attributes
    this.selectedAttributes = {};
    if (product.attributes) {
      product.attributes.forEach((attr) => {
        this.selectedAttributes[attr.name] = attr.value; // Giá trị mặc định
      });
    }
  }

  // Đóng Quick Buy Modal
  closeQuickBuyModal(): void {
    this.isQuickBuyModalVisible = false;
    this.selectedQuickBuyProduct = null;
    this.selectedAttributes = {};
  }

  // Chọn attribute option
  selectAttribute(attributeName: string, value: string): void {
    this.selectedAttributes[attributeName] = value;
  }

  // Kiểm tra attribute có được chọn không
  isAttributeSelected(attributeName: string, value: string): boolean {
    return this.selectedAttributes[attributeName] === value;
  }

  // Xử lý Mua Ngay (thêm vào giỏ và chuyển đến checkout)
  handleQuickBuy(): void {
    if (!this.selectedQuickBuyProduct) return;

    // Tạo thông báo với attributes đã chọn
    let attributesText = '';
    if (Object.keys(this.selectedAttributes).length > 0) {
      attributesText = Object.entries(this.selectedAttributes)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    }

    alert(
      `Đã thêm "${this.selectedQuickBuyProduct.name}" vào giỏ hàng!\n${attributesText}\n\nĐang chuyển đến trang thanh toán...`
    );

    // TODO: Gọi service để thêm vào giỏ hàng thực sự
    // this.cartService.addToCart(this.selectedQuickBuyProduct, this.selectedAttributes);

    // TODO: Chuyển đến trang checkout
    // this.router.navigate(['/thanh-toan']);

    this.closeQuickBuyModal();
  }

  getColorCode(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      Trắng: '#ffffff',
      Be: '#f5f5dc',
      Xanh: '#4a90e2',
      Đỏ: '#e74c3c',
      'Xanh lá': '#27ae60',
      // Thêm các màu khác...
    };
    return colorMap[colorName] || '#cccccc';
  }

  navigateToProductDetail(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    // Chuyển đến trang chi tiết với slug
    this.router.navigate(['/product', product.slug]);
  }
}
