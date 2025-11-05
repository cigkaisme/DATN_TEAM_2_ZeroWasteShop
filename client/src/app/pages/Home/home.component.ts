import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCategoryListComponent } from '../HomeCategoryList/home-category-list.component';
import { HomeIntroComponent } from '../HomeIntro/home-intro.component';
import { FeaturedProductsComponent } from '../FeaturedProducts/featured-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeCategoryListComponent, HomeIntroComponent, FeaturedProductsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
