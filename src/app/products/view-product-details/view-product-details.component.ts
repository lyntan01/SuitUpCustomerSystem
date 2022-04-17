import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService, MenuItem } from 'primeng/api';

import { SessionService } from '../../services/session.service';
import { StandardProductService } from '../../services/standard-product.service';
import { StandardProduct } from '../../models/standard-product';
import { Category } from '../../models/category';
import { Tag } from '../../models/tag';
import { OrderLineItem } from '../../models/order-line-item';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css'],
  providers: [MessageService],
})
export class ViewProductDetailsComponent implements OnInit {
  standardProductId: string | null;
  standardProductToView: StandardProduct;
  retrieveStandardProductError: boolean;

  resultSuccess: boolean;
  resultError: boolean;

  items: MenuItem[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private messageService: MessageService,
    private standardProductService: StandardProductService
  ) {
    this.standardProductId = null;
    this.standardProductToView = new StandardProduct();
    this.retrieveStandardProductError = false;
    this.resultSuccess = false;
    this.resultError = false;
    this.items = [];
  }

  ngOnInit(): void {
    this.standardProductId =
      this.activatedRoute.snapshot.paramMap.get('standardProductId');
    console.log(this.standardProductId);

    if (this.standardProductId != null) {
      this.standardProductService
        .getStandardProductById(parseInt(this.standardProductId))
        .subscribe((response) => {
          this.standardProductToView = response;
          console.log(this.standardProductToView);
          console.log(this.standardProductToView.image);

          this.items = [
            {
              label: 'Standard Products',
              routerLink: '/viewAllProducts',
            },
            {
              label: this.standardProductToView.name,
            },
          ];

          if (
            this.standardProductToView.quantityInStock &&
            this.standardProductToView.quantityInStock > 0
          ) {
            return true;
          } else return false;

          
        });
    }

    
  }

  addToCart(addToCartForm: NgForm) {
    console.log('ADD TO CART FUNCTION');
    if (addToCartForm.valid) {
      let cart: OrderLineItem[] | undefined = this.sessionService.getCart();
      console.log('CART:' + cart);

      let newStandardProductOrderItem = true;

      cart?.forEach((item) => {
        if (item.product?.productId === this.standardProductToView.productId) {
          newStandardProductOrderItem = false;
          if (item.quantity) {
            item.quantity += 1;
          } else {
            item.quantity = 1;
          }
          if (item.subTotal && this.standardProductToView.unitPrice) {
            item.subTotal += this.standardProductToView.unitPrice;
          } else {
            item.subTotal = this.standardProductToView.unitPrice;
          }
        }
      });

      console.log('newStandardProductOrderItem:' + newStandardProductOrderItem);

      if (newStandardProductOrderItem) {
        let orderItemNumber;
        if (cart) {
          orderItemNumber = cart.length + 1;
          console.log('orderItemNumber:' + orderItemNumber);
        } else {
          orderItemNumber = 1;
        }

        const orderItem: OrderLineItem = new OrderLineItem(
          orderItemNumber,
          1,
          this.standardProductToView.unitPrice
        );
        console.log('orderItem:' + orderItem);

        orderItem.product = this.standardProductToView;

        if (cart) {
          cart.push(orderItem);
        } else {
          cart = [orderItem];
        }
      }

      this.sessionService.setCart(cart!);

      this.resultSuccess = true;
      this.resultError = false;
      this.messageService.add({
        severity: 'success',
        summary:
          'standardProduct ' +
          this.standardProductToView.name +
          ' added to cart',
      });
    } else {
      this.resultError = true;
      this.resultSuccess = false;
      this.messageService.add({
        severity: 'error',
        summary:
          'An error has occurred while adding to cart: Cart form is invalid',
      });

      console.log('********** ViewstandardProductDetailsComponent.ts: ');
    }
  }
}
