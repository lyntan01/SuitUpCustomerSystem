import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { StandardProduct } from 'src/app/models/standard-product';
import { StandardProductService } from 'src/app/services/standard-product.service';
import { Category } from 'src/app/models/category';
import { Tag } from 'src/app/models/tag';
@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css'],
})
export class ViewAllProductsComponent implements OnInit {
  standardProducts: StandardProduct[];
  sortOptions: SelectItem[];
  sortKey: string = '';
  sortField: string = '';
  sortOrder: number = 0;

  constructor(
    private standardProductService: StandardProductService,
    private primengConfig: PrimeNGConfig,
    private activatedRoute: ActivatedRoute
  ) {
    this.standardProducts = new Array();
    this.sortOptions = [
      { label: 'Price High to Low', value: '!unitPrice' },
      { label: 'Price Low to High', value: 'unitPrice' },
    ];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);

      let keyword: String | undefined = params['keyword'];
      let categoryIds: number[] | undefined = params['category'];
      let tagIds: number[] | undefined = params['tag'];
      let priceMin: number | undefined = params['priceMin'];
      let priceMax: number | undefined = params['priceMax'];

      if (categoryIds && !Array.isArray(categoryIds)) {
        categoryIds = new Array(categoryIds);
      }
      if (tagIds && !Array.isArray(tagIds)) {
        tagIds = new Array(tagIds);
      }

      this.fetchProducts(keyword, categoryIds, tagIds, priceMin, priceMax);
      console.log('catid count = ' + categoryIds);
    });
  }

  fetchProducts(
    keyword?: String,
    categoryIds?: number[],
    tagIds?: number[],
    priceMin?: number,
    priceMax?: number
  ) {
    // console.log('********** ViewAllProductsComponent.ts: FETCH');
    this.standardProductService.getStandardProducts().subscribe((response) => {
      this.standardProducts = response.filter((standardProduct) => {
        if (
          standardProduct.quantityInStock &&
          standardProduct.quantityInStock > 0
        ) {
          console.log(
            '********** ViewAllProductsComponent.ts: FIRST FILTER ' +
              standardProduct.productId
          );
          return true;
        } else {
          return false;
        }
      });

      this.standardProducts = this.standardProducts.filter(
        (standardProduct) => {
          let categoryShow: boolean | undefined = true;
          let tagShow: boolean | undefined = true;
          let priceShow: boolean | undefined = true;
          //   if (keyword) {
          //     searchShow = standardProduct.name
          //       ?.toLowerCase()
          //       .includes(keyword?.toLowerCase());
          //   }

          if (categoryIds) {
            for (let categoryId of categoryIds) {
              console.log('Catid = ' + categoryId);
              categoryShow = standardProduct.category?.categoryId == categoryId;
              if (categoryShow) {
                console.log(
                  '********** ViewAllProductsComponent.ts: SECOND FILTER ' +
                    standardProduct.productId
                );
                break;
              }
            }
          } else if (categoryIds == undefined) {
            categoryShow = true;
          }

          if (priceMin && priceMax && standardProduct.unitPrice) {
            if (
              standardProduct.unitPrice >= priceMin &&
              standardProduct.unitPrice <= priceMax
            )
              priceShow = true;
            else priceShow = false;
          } else if (
            priceMin == standardProduct.unitPrice &&
            priceMax == standardProduct.unitPrice
          ) {
            priceShow = true;
          }
          if (priceMin == undefined && priceMax == undefined) {
            priceShow = true;
          }

          if (standardProduct.tags && tagIds) {
            for (let tag of standardProduct.tags) {
              for (let tagId of tagIds) {
                tagShow = tag.tagId == tagId;
                if (tagShow) {
                  break;
                }
              }
            }
          } else if (tagIds == undefined) tagShow = true;

          if (categoryShow && tagShow && priceShow) {
            return true;
          }
          return false;
        }
      );
      // );
      // );
    });
  }
  // }
  // };

  //           if (tagIds) {
  //             for (let tagId of tagIds) {
  //               if (standardProduct.tags) {
  //                 for (let tag of standardProduct.tags) {
  //                   tagShow = tag.tagId == tagId;
  //                   if (tagShow) break;
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       );

  //       // });
  //     },
  //     (error) => {
  //       console.log('********** ViewAllProductsComponent.ts: ' + error);
  //     }
  //   );
  // }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
