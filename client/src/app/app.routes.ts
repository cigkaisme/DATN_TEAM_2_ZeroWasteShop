import { Routes } from '@angular/router';
// Giả sử đường dẫn trang chi tiết: import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './pages/Home/home.component';
import { AllProductsComponent } from './pages/AllProducts/all_products.component';
import { BestSellerProductsComponent } from './pages/BestSellerProducts/best_seller_products.component';
import { FavoriteProductsComponent } from './pages/FavoriteProducts/favorite_products.component';
/*import { LoginComponent } from '@pages/Auth/Login/login.component';
import { RegisterComponent } from '@pages/Auth/Register/register.component';*/
import { AccountComponent } from '@pages/Account/account.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Giả sử đường dẫn định nghĩa routes:
  // { path: 'product/:slug', component: ProductDetailComponent },
  // { path: 'product/:id', component: ProductDetailComponent },
  {
    path: '',
    redirectTo: 'trang-chu',
    pathMatch: 'full',
  },
  {
    path: 'trang-chu',
    component: HomeComponent,
    title: 'Trang Chủ',
  },
  {
    path: 'san-pham',
    component: AllProductsComponent,
    title: 'Tất Cả Sản Phẩm',
  },
  {
    path: 'san-pham-ban-chay',
    component: BestSellerProductsComponent,
    title: 'Sản Phẩm Bán Chạy',
  },
  {
    path: 'san-pham-duoc-yeu-thich',
    component: FavoriteProductsComponent,
    title: 'Sản Phẩm Được Yêu Thích',
  },
  {
    path: 'tai-khoan',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  // 404 Page
  {
    path: '**',
    loadComponent: () => import('./pages/NotFound/not-found.component').then(m => m.NotFoundComponent)
  }
];
