import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCategoryListComponent } from '../HomeCategoryList/home-category-list.component';
import { HomeIntroComponent } from '../HomeIntro/home-intro.component';
import { FeaturedProductsComponent } from '../FeaturedProducts/featured-products.component';
import { CoreValuesComponent } from '../CoreValues/core-values.component';
import { CategorySectionComponent } from '../CategorySection/category-section.component';
import { StarterKitSectionComponent } from '../StarterKitSection/starter-kit-section.component';
import { HeroCommitmentBlockComponent } from '../HeroCommitmentBlock/hero-commitment-block.component';
import { ChallengeBannerComponent } from '../ChallengeBanner/challenge-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
            HomeCategoryListComponent,
            HomeIntroComponent,
            FeaturedProductsComponent,
            CoreValuesComponent,
            CategorySectionComponent,
            StarterKitSectionComponent,
            HeroCommitmentBlockComponent,
            ChallengeBannerComponent
           ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
