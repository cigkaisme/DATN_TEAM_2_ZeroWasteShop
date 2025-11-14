import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface ProductAttribute {
  name: string;
  value: string;
  options?: string[];
}

interface Wishlist {
  id: number;
  name: string;
  items: number[]; // Lưu ID sản phẩm
}
interface Product {
  id?: number;
  slug?: string;
  name?: string;
  price?: number;
  averageRating?: number;
  reviewCount?: number;
  label?: string;
  hoverUrl?: string;
  isWished?: boolean;
  thumbnailUrl: string;
  isLargeMedia?: boolean;
  mediaUrl?: string;
  videoOverlayText?: string;
  attributes?: ProductAttribute[]; // Thêm thuộc tính động
}

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.css'],
})
export class CategorySectionComponent {
  Math = Math;

  isModalVisible: boolean = false;
  selectedProduct: Product | any = {};
  newListName: string = '';
  showNewListInput: boolean = false;

  isQuickBuyModalVisible: boolean = false;
  selectedQuickBuyProduct: Product | null = null;
  selectedAttributes: { [key: string]: string } = {};

  wishlistLists: Wishlist[] = [
    { id: 1, name: 'My Wishlist', items: [] },
    { id: 2, name: 'Quà tặng bạn bè', items: [] },
  ];

  get isAnyListSelected(): boolean {
    const productId = this.selectedProduct?.id;
    if (!productId) return false;

    return this.wishlistLists.some((list) => list.items.includes(productId));
  }

  categories = [
    {
      name: 'ĐỒ DÙNG BẾP',
      routerLink: '/danh-muc/do-dung-bep',
      products: [
        {
          thumbnailUrl: 'assets/media/do_dung_bep.gif',
          isLargeMedia: true, // Thẻ lớn
          mediaUrl: '/assets/media/do_dung_bep.gif',
          videoOverlayText:
            'Nâng tầm không gian bếp: Các sản phẩm thiết yếu, không làm hại môi trường.',
        },

        // Các sản phẩm khác giữ nguyên (thẻ ảnh tĩnh)
        {
          id: 1,
          slug: '/bo_ban_chai_chen_dia',
          name: 'Bộ Bàn Chải Chén Dĩa',
          price: 250000,
          thumbnailUrl: '/assets/images/products/bo_ban_chai_chen_dia.webp',
          hoverUrl: '/assets/images/products/bo_ban_chai_chen_dia_2.webp',
          averageRating: 5,
          reviewCount: 46,
          attributes: [{ name: 'Size', value: 'M', options: ['S', 'M', 'L'] }],
        },
        {
          id: 2,
          slug: '/pack_3_mieng_co_noi_dong',
          name: '(Pack 3 Miếng) Cọ Nồi Đồng',
          price: 45000,
          thumbnailUrl: '/assets/images/products/pack_3_mieng_co_noi_dong.webp',
          hoverUrl: '/assets/images/products/pack_3_mieng_co_noi_dong_2.webp',
          label: 'NEW',
          averageRating: 5,
          reviewCount: 10,
        },
        {
          id: 3,
          slug: '/mieng_co_rua_bang_dua',
          name: 'Tấm Lót Rửa Chén Xơ Mướp',
          price: 55000,
          thumbnailUrl: '/assets/images/products/mieng_co_rua_bang_dua_2.webp',
          hoverUrl: '/assets/images/products/mieng_co_rua_bang_dua.webp',
          averageRating: 4,
          reviewCount: 120,
        },
        {
          id: 4,
          slug: '/tui_luoi_dung_nong_san',
          name: 'Túi lưới đựng nông sản',
          price: 30000,
          thumbnailUrl: '/assets/images/products/tui_luoi_dung_nong_san.webp',
          hoverUrl: '/assets/images/products/tui_luoi_dung_nong_san_2.webp',
          averageRating: 5,
          reviewCount: 54,
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
          videoOverlayText:
            'Sự thanh lọc: Thanh lọc cơ thể, thanh lọc hành tinh.',
        },

        {
          id: 5,
          slug: '/xa_phong_goi_dau_thien_nhien',
          name: 'Xà Phòng Thảo Mộc (1 Bánh)',
          price: 50000,
          thumbnailUrl:
            '/assets/images/products/xa_phong_goi_dau_thien_nhien.webp',
          hoverUrl:
            '/assets/images/products/xa_phong_goi_dau_thien_nhien_2.webp',
          averageRating: 5,
          reviewCount: 54,
        },
        {
          id: 6,
          slug: '/ban_chai_co_rua_nha_ve_sinh',
          name: 'Bàn Chải Cọ Rửa Nhà Vệ Sinh',
          price: 100000,
          thumbnailUrl:
            '/assets/images/products/ban_chai_co_rua_nha_ve_sinh.webp',
          hoverUrl:
            '/assets/images/products/ban_chai_co_rua_nha_ve_sinh_2.webp',
          label: 'NEW',
          averageRating: 5,
          reviewCount: 54,
        },
        {
          id: 7,
          slug: '/luoc_chai_toc_bang_go',
          name: 'Lược Chải Tóc Bằng Gỗ',
          price: 42000,
          thumbnailUrl: '/assets/images/products/luoc_chai_toc_bang_go.webp',
          hoverUrl: '/assets/images/products/luoc_chai_toc_bang_go_2.webp',
          averageRating: 5,
          reviewCount: 54,
        },
        {
          id: 8,
          slug: '/dao_cao_rau_thep_brass_handle_safety_razor',
          name: 'Dao Cạo Râu Thép Brass Handle Safety Razor',
          price: 279000,
          thumbnailUrl: '/assets/images/products/dao_cao_rau_thep.jpg',
          hoverUrl: '/assets/images/products/dao_cao_rau_thep_2.jpg',
          averageRating: 4.0,
          reviewCount: 15,
        },
      ],
    },
  ];

  constructor(public router: Router) {}

  ngOnInit() {
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
    this.categories.forEach((category) => {
      category.products.forEach((product) => {
        if (product.name) {
          product.slug = this.createSlug(product.name);
        }

        const p = product as Product;

        if (p.id !== undefined && p.isWished === undefined) {
          p.isWished = false;
        }
      });
    });
  }

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

  addToCart(product: Product): void {
    if (product.id && product.name) {
      console.log(
        `Đã thêm sản phẩm: ${product.name} (ID: ${product.id}) vào giỏ hàng.`
      );
      // TODO: Triển khai logic thực tế (gọi CartService)
      // if (this.cartService) {
      //     this.cartService.addItem(product);
      // }
      alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    } else {
      console.warn('Không thể thêm sản phẩm không có ID/Name vào giỏ hàng.');
    }
  }

  toggleWishlist(product: Product): void {
    if (product.name) {
      // Đảo ngược trạng thái isWished
      product.isWished = !product.isWished;

      if (product.isWished) {
        console.log(
          `Đã thêm sản phẩm: ${product.name} vào danh sách yêu thích.`
        );
        // TODO: Triển khai logic thực tế (gọi WishlistService để lưu trữ)
        alert(`Sản phẩm ${product.name} đã được thêm vào danh sách yêu thích!`);
      } else {
        console.log(
          `Đã xóa sản phẩm: ${product.name} khỏi danh sách yêu thích.`
        );
        // TODO: Triển khai logic thực tế (gọi WishlistService để xóa)
        alert(`Sản phẩm ${product.name} đã được xóa khỏi danh sách yêu thích.`);
      }
    } else {
      console.warn(
        'Không thể thêm sản phẩm không có tên vào danh sách yêu thích.'
      );
    }
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0);
  }

  openWishlistModal(product: Product) {
    // Đảm bảo chỉ mở modal cho sản phẩm có ID (sản phẩm thường)
    if (!product.id) return;

    // Truyền dữ liệu sản phẩm được click
    this.selectedProduct = product;
    this.isModalVisible = true;
  }

  closeWishlistModal() {
    this.isModalVisible = false;
    this.newListName = ''; // Reset input
    this.selectedProduct = {};
    this.showNewListInput = false;
  }

  toggleNewListInput() {
    this.showNewListInput = true;
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
      this.newListName = ''; // Clear input

      // Cập nhật trạng thái isWished cho sản phẩm (nếu đây là list đầu tiên)
      this.selectedProduct.isWished = true;

      this.newListName = '';
      this.showNewListInput = false;
    } else if (!this.newListName.trim()) {
      alert('Vui lòng nhập tên danh sách.');
    }
  }

  addSelectedToLists() {
    if (this.isAnyListSelected) {
      this.closeWishlistModal();
    }
  }

  toggleItemInList(list: Wishlist, productId: number, isChecked: boolean) {
    const itemIndex = list.items.indexOf(productId);

    if (isChecked && itemIndex === -1) {
      // Add to list
      list.items.push(productId);
    } else if (!isChecked && itemIndex !== -1) {
      // Remove from list
      list.items.splice(itemIndex, 1);
    }

    // Kiểm tra và cập nhật trạng thái isWished chung
    this.updateProductWishStatus(productId);
  }

  updateProductWishStatus(productId: number) {
    // Kiểm tra xem sản phẩm có trong bất kỳ danh sách nào không
    const isWished = this.wishlistLists.some((list) =>
      list.items.includes(productId)
    );

    this.categories.forEach((category) => {
      category.products.forEach((product) => {
        if (product.id === productId) {
          const fullProduct = product as Product;
          fullProduct.isWished = isWished;
        }
      });
    });
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
        this.selectedAttributes[attr.name] = attr.value;
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

  // Xử lý Mua Ngay
  handleQuickBuy(): void {
    if (!this.selectedQuickBuyProduct) return;

    let attributesText = '';
    if (Object.keys(this.selectedAttributes).length > 0) {
      attributesText = Object.entries(this.selectedAttributes)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    }

    alert(
      `Đã thêm "${this.selectedQuickBuyProduct.name}" vào giỏ hàng!\n${attributesText}\n\nĐang chuyển đến trang thanh toán...`
    );

    this.closeQuickBuyModal();
  }

  // Helper để lấy mã màu từ tên màu
  getColorCode(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      Trắng: '#ffffff',
      Be: '#f5f5dc',
      Xanh: '#4a90e2',
      Đỏ: '#e74c3c',
      'Xanh lá': '#27ae60',
    };
    return colorMap[colorName] || '#cccccc';
  }
}
