import { Component } from '@angular/core';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';

@Component({
  selector: 'app-favorite-products',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './favorite_products.component.html',
})
export class FavoriteProductsComponent {}
