import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from 'src/app/models/category';
import { Tag } from 'src/app/models/tag';
import { StandardProductService } from 'src/app/services/standard-product.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  categories: Category[];
  selectedCategories: Category[] = new Array();
  selectedPriceRange: number[];
  tags: Tag[];
  selectedTags: Tag[] = new Array();

  constructor(
    private standardProductService: StandardProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.categories = new Array();
    this.selectedPriceRange = [0, 1000];
    this.tags = new Array();
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchTags();
    // this.setPriceRange();
  }

  fetchCategories() {
    this.standardProductService.getCategories().subscribe((respond) => {
      console.log('CATEGORY: ' + respond);
      this.categories = respond;
      // this.activatedRoute.queryParams.subscribe((params) => {
      //   this.selectedCategories = new Array();
      //   let urlCategoryIds: number[] | undefined = params['category'];
      //   console.log('URL CATEGORY: ' + urlCategoryIds);
      //   if (urlCategoryIds != undefined && !Array.isArray(urlCategoryIds)) {
      //     urlCategoryIds = new Array(urlCategoryIds);
      //   }
      //   urlCategoryIds?.forEach((categoryId) => {
      //     const temp: Category[] = this.categories.filter(
      //       (cat) => cat.categoryId == +categoryId
      //     );
      //     this.selectedCategories = this.selectedCategories.concat(temp);
      //     console.log('SELECTED CATEGORY: ' + this.selectedCategories);
      //   });
      // });
    });
  }

  onCategoryChange(event: any, category?: Category) {
    let extractedCategoryIds = this.selectedCategories.map((a) => a.categoryId);
    this.router.navigate(['/viewAllProducts'], {
      queryParams: {
        category: extractedCategoryIds,
      },
      queryParamsHandling: 'merge',
    });
  }

  fetchTags() {
    this.standardProductService.getTags().subscribe((response) => {
      // console.log('TAGS: ' + respond);
      for (let object of response) {
        this.tags.push(object as Tag);
      }
      this.tags = response;
      // console.log('TAGS: ' + this.tags);
      // let selectedTagIds =
      //   this.activatedRoute.snapshot.queryParamMap.getAll('tag');

      // if (selectedTagIds) {
      //   selectedTagIds.forEach((tagId) => {
      //     const temp: Tag[] = this.tags.filter((b) => b.tagId == +tagId);
      //     this.selectedTags = this.selectedTags.concat(temp);
      //   });
      // }
    });
  }

  onTagChange(event: any) {
    let extractedTagIds = event.value.map((tag: Tag) => tag.tagId);
    this.router.navigate(['/viewAllProducts'], {
      queryParams: {
        tag: extractedTagIds,
      },
      queryParamsHandling: 'merge',
    });
  }

  // onPriceChange(event: any) {
  //   console.log(event.values);
  //   console.log(this.selectedPriceRange);
  //   this.router.navigate(['/viewAllProducts'], {
  //     queryParams: {
  //       priceMin: event.values[0],
  //       priceMax: event.values[1],
  //     },
  //     queryParamsHandling: 'merge',
  //   });
  // }

  // setPriceRange() {
  //   let min = this.activatedRoute.snapshot.queryParamMap.get('priceMin');
  //   let max = this.activatedRoute.snapshot.queryParamMap.get('priceMax');

  //   if (min && max) {
  //     this.selectedPriceRange = [0, 1500];
  //     this.selectedPriceRange = [+min, +max];
  //   }
  // }
}
