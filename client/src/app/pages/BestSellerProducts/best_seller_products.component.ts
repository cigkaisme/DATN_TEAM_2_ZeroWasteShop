import { Component } from '@angular/core';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';

@Component({
  selector: 'app-best-seller-products',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './best_seller_products.component.html'
})
export class BestSellerProductsComponent {}
