import { Component } from '@angular/core';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './all_products.component.html'
})
export class AllProductsComponent {}
