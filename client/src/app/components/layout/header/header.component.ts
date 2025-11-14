import {
  Component,
  OnInit,
  HostListener,
  Renderer2,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService, Wishlist, Product } from 'services/wishlist.service';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';

// Đăng ký locale Việt Nam
registerLocaleData(localeVi);

// Giả định tên người dùng
const FAKE_USERNAME = 'Huy Minh';

interface ProductAttribute {
  name: string; // Tên thuộc tính: "Mùi", "Size", "Màu",...
  value: string; // Giá trị: "Vải lạnh tươi", "M", "Đỏ",...
}
// Giả định cho dữ liệu
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  thumbnailUrl: string;
  attributes?: ProductAttribute[];
}
interface PopularProduct {
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string;
}
interface ViewedProduct {
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string;
}

// Định nghĩa các tab cho Cart Pop-up
type CartTab = 'cart' | 'popular' | 'viewed';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe], // Thêm RouterLink nếu cần
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Biến kiểm soát trạng thái menu
  isMenuOpen: boolean = false;

  // Biến kiểm soát modal/dropdown chính
  isWishlistDropdownVisible: boolean = false; // Dropdown cấp 1 (Danh sách các list)
  isWishlistDetailVisible: boolean = false; // Màn hình chi tiết list (Cấp 2)
  isShareModalVisible: boolean = false; // Modal chia sẻ

  // Biến kiểm soát popover bên trong Wishlist Detail Modal
  isMorePopoverVisible: boolean = false;
  isListDropdownVisible: boolean = false; // Dropdown chuyển list

  isCartPopupVisible: boolean = false;
  activeCartTab: CartTab = 'cart';

  showAddToCartToast: boolean = false;
  addedProductName: string = '';

  // Biến kiểm soát trạng thái cuộn của Body (Mới)
  isModalOpen: boolean = false;

  // Dữ liệu giả lập cho Cart Pop-up
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Tắm bột giặt',
      price: 35000,
      quantity: 2,
      thumbnailUrl: 'https://placehold.co/80x80/004d40/ffffff?text=BC',
      attributes: [{ name: 'Mùi', value: 'Vải lạnh tươi' }],
    },
    {
      id: 2,
      name: 'Bộ 3 ống hút cỏ bàng',
      price: 59000,
      quantity: 1,
      thumbnailUrl: 'https://placehold.co/80x80/8BC34A/ffffff?text=OH',
      attributes: [
        { name: 'Size', value: 'L' },
        { name: 'Màu', value: 'Xanh lá' },
      ],
    },
    {
      id: 3,
      name: 'Túi lưới đi chợ',
      price: 85000,
      quantity: 3,
      thumbnailUrl: 'https://placehold.co/80x80/FFC107/333333?text=TL',
      attributes: [{ name: 'Size', value: 'L' }],
    },
  ];

  // List 5 sản phẩm bán chạy (Hình 2)
  popularProducts: PopularProduct[] = [
    {
      id: 10,
      name: 'Túi Canvas đa năng (M)',
      price: 120000,
      thumbnailUrl: 'https://placehold.co/60x60/F44336/ffffff?text=TC',
    },
    {
      id: 11,
      name: 'Cọ rửa chai lọ sợi xơ mướp',
      price: 45000,
      thumbnailUrl: 'https://placehold.co/60x60/2196F3/ffffff?text=CR',
    },
    {
      id: 12,
      name: 'Xà phòng rửa chén hữu cơ',
      price: 70000,
      thumbnailUrl: 'https://placehold.co/60x60/FF9800/333333?text=XP',
    },
    {
      id: 13,
      name: 'Bông tẩy trang tái sử dụng',
      price: 90000,
      thumbnailUrl: 'https://placehold.co/60x60/9C27B0/ffffff?text=TT',
    },
    {
      id: 14,
      name: 'Hộp cơm lúa mạch 3 ngăn',
      price: 150000,
      thumbnailUrl: 'https://placehold.co/60x60/00BCD4/333333?text=HC',
    },
  ];

  // List các sản phẩm đã xem gần đây (Hình 3)
  viewedProducts: ViewedProduct[] = [
    {
      id: 20,
      name: 'Dầu gội khô chiết xuất bưởi',
      price: 180000,
      thumbnailUrl: 'https://placehold.co/60x60/E91E63/ffffff?text=DG',
    },
    {
      id: 21,
      name: 'Kem đánh răng thảo dược (lớn)',
      price: 65000,
      thumbnailUrl: 'https://placehold.co/60x60/CDDC39/333333?text=KR',
    },
    {
      id: 22,
      name: 'Túi đựng thực phẩm silicon',
      price: 95000,
      thumbnailUrl: 'https://placehold.co/60x60/607D8B/ffffff?text=TP',
    },
  ];

  listSearchTerm: string = '';
  wishlists: Wishlist[] = [];
  filteredWishlists: Wishlist[] = [];
  selectedWishlist: Wishlist | null = null;
  selectedProductDetail: Product | null = null;
  username: string = FAKE_USERNAME;

  // Giả định liên kết chia sẻ
  shareLink: string = 'https://www.zerowasteshop.vn/wishlist/my-wishlist-slug';

  constructor(
    private wishlistService: WishlistService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Đăng ký theo dõi danh sách wishlist từ Service
    this.wishlistService.wishlists$.subscribe((lists) => {
      this.wishlists = lists;
      this.selectedWishlist = lists.length > 0 ? lists[0] : null;
      this.filteredWishlists = lists;
    });
  }

  // Đảm bảo cuộn được bật lại khi component bị hủy
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.isModalOpen) {
      this.renderer.removeClass(document.body, 'modal-open');
    }
  }

  getProductInfo(productId: number): Product | undefined {
    return this.wishlistService.getProductById(productId);
  }

  // Hàm QUAN TRỌNG: Quản lý trạng thái khóa cuộn (Mới)
  private setModalState(forceState?: boolean) {
    if (!isPlatformBrowser(this.platformId)) return;

    let newState: boolean;

    if (typeof forceState === 'boolean') {
      newState = forceState;
    } else {
      newState =
        this.isCartPopupVisible ||
        this.isWishlistDropdownVisible ||
        this.isWishlistDetailVisible ||
        this.isShareModalVisible;
    }

    if (this.isModalOpen !== newState) {
      this.isModalOpen = newState;
      if (newState) {
        this.renderer.addClass(document.body, 'modal-open');
      } else {
        this.renderer.removeClass(document.body, 'modal-open');
      }
    }
  }

  // Hàm mở/đóng menu
  toggleSideMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // 👈 WISHLIST MODAL METHODS
  // Hàm đóng tất cả modal (Sử dụng cho nút X và các sự kiện đóng chính) (Mới)
  closeAllWishlistModals() {
    this.isWishlistDropdownVisible = false;
    this.isWishlistDetailVisible = false;
    this.isShareModalVisible = false;
    this.isMorePopoverVisible = false;
    this.isListDropdownVisible = false;
    this.selectedWishlist = null;
    this.selectedProductDetail = null;

    // Tắt khóa cuộn (sẽ được setModalState xử lý nếu Cart cũng đóng)
    this.setModalState(); // Gọi không tham số
  }

  // Toggle Wishlist Dropdown cấp 1
  toggleWishlistDropdown(): void {
    // Đóng các modal khác trước (nếu cần)
    this.isWishlistDropdownVisible = !this.isWishlistDropdownVisible;
    this.isWishlistDetailVisible = false;
    this.isShareModalVisible = false;
    this.isCartPopupVisible = false; // Đóng Cart Pop-up
    this.updateBodyScrollState();
  }

  viewWishlistDetail(list: Wishlist) {
    this.selectedWishlist = list;

    // Logic lấy chi tiết sản phẩm...
    const firstItemId = list.items.length > 0 ? list.items[0] : null;
    if (firstItemId) {
      this.selectedProductDetail =
        this.wishlistService.getProductById(firstItemId) || null;
    } else {
      this.selectedProductDetail = null;
    }

    this.isWishlistDropdownVisible = false;
    this.isWishlistDetailVisible = true;

    this.setModalState(); // Vẫn mở modal, vẫn khóa cuộn
  }

  backToWishlistDropdown(): void {
    this.isWishlistDetailVisible = false;
    this.isShareModalVisible = false;
    this.updateBodyScrollState();
  }

  openWishlistDetail(list: Wishlist): void {
    this.selectedWishlist = list;
    this.isWishlistDetailVisible = true;
    this.isWishlistDropdownVisible = false;
    this.updateBodyScrollState();
  }

  removeItemFromWishlistDetail(productId: number): void {
    if (this.selectedWishlist) {
      const isConfirmed = confirm(
        'Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách?'
      );
      if (isConfirmed) {
        this.wishlistService.updateList(
          this.selectedWishlist.id,
          productId,
          false
        );
        // Sau khi xóa, cập nhật lại selectedWishlist để UI refresh
        this.selectedWishlist =
          this.wishlists.find((l) => l.id === this.selectedWishlist!.id) ||
          null;
      }
    }
  }

  openShareModal(): void {
    this.isShareModalVisible = true;
    this.updateBodyScrollState();
  }

  closeShareModal(): void {
    this.isShareModalVisible = false;
    this.updateBodyScrollState();
  }

  copyLink(): void {
    // Kiểm tra xem có đang chạy trên browser không
    if (isPlatformBrowser(this.platformId)) {
      const linkInput = document.querySelector(
        '.share-link-input'
      ) as HTMLInputElement;
      if (linkInput) {
        linkInput.select();

        // Sử dụng Clipboard API hiện đại với fallback
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(this.shareLink)
            .then(() => {
              alert('Đã sao chép link chia sẻ!');
            })
            .catch(() => {
              // Fallback về execCommand
              document.execCommand('copy');
              alert('Đã sao chép link chia sẻ!');
            });
        } else {
          // Fallback cho trình duyệt cũ
          document.execCommand('copy');
          alert('Đã sao chép link chia sẻ!');
        }
      }
    } else {
      // Nếu chạy trên server, chỉ log
      console.log('Copy function not available on server');
    }
  }

  toggleMorePopover(event: Event): void {
    event.stopPropagation();
    this.isMorePopoverVisible = !this.isMorePopoverVisible;
    this.isListDropdownVisible = false; // Đóng cái kia
  }

  // HÀM XỬ LÝ: SAO CHÉP DANH SÁCH
  duplicateList() {
    if (this.selectedWishlist) {
      const newListName = `${this.selectedWishlist.name} (Copy)`;
      console.log(
        `Duplicating list: ${this.selectedWishlist.name} to ${newListName}`
      );
      // Sửa lỗi alert
      // alert(`Đã sao chép danh sách: ${newListName}`);
      this.isMorePopoverVisible = false;
    }
  }

  // HÀM XỬ LÝ: XÓA DANH SÁCH
  deleteList() {
    if (this.selectedWishlist) {
      // Sửa lỗi confirm: Thay thế bằng console.log hoặc modal tùy chỉnh
      console.log(`Deleting list: ${this.selectedWishlist.name}`);
      this.isMorePopoverVisible = false;
      this.backToWishlistDropdown();
    }
  }

  toggleListDropdown(event: Event): void {
    event.stopPropagation();
    this.isListDropdownVisible = !this.isListDropdownVisible;
    this.isMorePopoverVisible = false; // Đóng cái kia
  }

  get totalCartItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  get totalCartPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  get totalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTitle(): string {
    switch (this.activeCartTab) {
      case 'cart':
        return 'GIỎ HÀNG';
      case 'popular':
        return 'SẢN PHẨM BÁN CHẠY';
      case 'viewed':
        return 'SẢN PHẨM ĐÃ XEM';
      default:
        return 'GIỎ HÀNG';
    }
  }

  setActiveTab(tab: CartTab): void {
    this.activeCartTab = tab;
  }

  removeFromCart(productId: number): void {
    const itemIndex = this.cartItems.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      const item = this.cartItems[itemIndex];
      const confirmMessage = `Bạn có chắc chắn muốn xóa "${item.name}" khỏi giỏ hàng?`;

      if (confirm(confirmMessage)) {
        this.cartItems.splice(itemIndex, 1);
        console.log('Đã xóa sản phẩm', productId, 'khỏi giỏ hàng.');
      }
    }
  }

  // Thêm sản phẩm từ wishlist vào giỏ hàng
  addToCartFromWishlist(product: Product): void {
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newCartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        thumbnailUrl: product.thumbnailUrl,
        attributes: [],
      };

      this.cartItems.push(newCartItem);
    }

    // Hiển thị toast
    this.addedProductName = product.name;
    this.showAddToCartToast = true;

    // Đóng wishlist và mở cart popup sau 1 giây
    setTimeout(() => {
      this.showAddToCartToast = false;
      this.closeAllWishlistModals();
      this.toggleCartPopup('cart');
    }, 1000);
  }

  // Tăng số lượng sản phẩm
  increaseQuantity(productId: number): void {
    const item = this.cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity++;
    }
  }

  // Giảm số lượng sản phẩm
  decreaseQuantity(productId: number): void {
    const item = this.cartItems.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else if (item && item.quantity === 1) {
      // Tùy chọn: Hỏi xác nhận xóa khi giảm xuống 0
      this.removeFromCart(productId);
    }
  }

  // Cập nhật số lượng trực tiếp từ input
  updateQuantity(productId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value);

    if (newQuantity && newQuantity > 0) {
      const item = this.cartItems.find((item) => item.id === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    } else {
      // Reset về 1 nếu input không hợp lệ
      input.value = '1';
    }
  }

  getFreeShippingRemaining(): number {
    const freeShippingThreshold = 500000;
    const remaining = freeShippingThreshold - this.totalCartPrice;
    return remaining > 0 ? remaining : 0;
  }

  // Tính % progress bar
  getShippingProgressPercentage(): number {
    const freeShippingThreshold = 500000;
    const percentage = (this.totalCartPrice / freeShippingThreshold) * 100;
    return percentage > 100 ? 100 : percentage;
  }

  // Hàm quan trọng: Đóng/Mở Cart Pop-up và điều chỉnh scroll
  toggleCartPopup(defaultTab: CartTab = 'cart'): void {
    this.isCartPopupVisible = !this.isCartPopupVisible;

    if (this.isCartPopupVisible) {
      this.activeCartTab = defaultTab; // Đặt tab mặc định
      // Đóng các modal khác
      this.isWishlistDropdownVisible = false;
      this.isWishlistDetailVisible = false;
      this.isShareModalVisible = false;
    }

    this.updateBodyScrollState();
  }

  closeCartPopup(): void {
    this.isCartPopupVisible = false;
    this.updateBodyScrollState();
  }

  // Cập nhật trạng thái khóa cuộn (no-scroll)
  private updateBodyScrollState(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isModalOpen =
        this.isCartPopupVisible ||
        this.isWishlistDropdownVisible ||
        this.isWishlistDetailVisible ||
        this.isShareModalVisible;

      if (this.isModalOpen) {
        this.renderer.addClass(document.body, 'modal-open');
      } else {
        this.renderer.removeClass(document.body, 'modal-open');
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Chỉ xử lý khi có modal/dropdown mở
    if (
      this.isCartPopupVisible ||
      this.isWishlistDropdownVisible ||
      this.isWishlistDetailVisible ||
      this.isShareModalVisible
    ) {
      // Logic đóng Popover bên trong Wishlist Detail
      if (this.isListDropdownVisible) {
        this.isListDropdownVisible = false;
      }
      if (this.isMorePopoverVisible) {
        this.isMorePopoverVisible = false;
      }
    }
  }

  // HÀM XỬ LÝ: TÌM KIẾM DANH SÁCH
  onListSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.listSearchTerm = term;

    if (!term) {
      this.filteredWishlists = this.wishlists;
    } else {
      this.filteredWishlists = this.wishlists.filter((list) =>
        list.name.toLowerCase().includes(term)
      );
    }
  }

  // HÀM XỬ LÝ: CHUYỂN SANG XEM WISHLIST KHÁC
  selectAnotherWishlist(list: Wishlist) {
    this.selectedWishlist = list;
    this.isListDropdownVisible = false;

    // THÊM PHẦN NÀY: Cập nhật lại selectedProductDetail khi chuyển list
    const firstItemId = list.items.length > 0 ? list.items[0] : null;
    if (firstItemId) {
      this.selectedProductDetail =
        this.wishlistService.getProductById(firstItemId) || null;
    } else {
      this.selectedProductDetail = null; // Quan trọng: Set null nếu list trống
    }
  }

  // Dùng trong HTML để lấy thumbnail của sản phẩm đầu tiên
  getFirstProductThumbnail(list: Wishlist): string {
    const firstItemId = list.items.length > 0 ? list.items[0] : null;
    if (firstItemId) {
      return (
        this.wishlistService.getProductById(firstItemId)?.thumbnailUrl || ''
      );
    }
    return '';
  }
}
