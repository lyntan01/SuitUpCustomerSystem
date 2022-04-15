import { CustomizedJacket } from './../../models/customized-jacket';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { SessionService } from 'src/app/services/session.service';
import { CustomizationService } from 'src/app/services/customization.service';

import { OrderLineItem } from 'src/app/models/order-line-item';
import { CustomizedPants } from 'src/app/models/customized-pants';
import { JacketStyle } from 'src/app/models/jacket-style';
import { PocketStyle } from 'src/app/models/pocket-style';
import { PantsCutting } from 'src/app/models/pants-cutting';
import { Fabric } from 'src/app/models/fabric';
@Component({
  selector: 'app-customized-main',
  templateUrl: './customized-main.component.html',
  styleUrls: ['./customized-main.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CustomizedMainComponent implements OnInit {

  headerImg = 'assets/images/customized-main-2.jpeg';
  index: number = 0;

  newCustomizedPants: CustomizedPants;
  newCustomizedJacket: CustomizedJacket;
  cart: OrderLineItem[] = [];
  fabrics: Fabric[] = [];
  jacketStyles: JacketStyle[] = [];
  pocketStyles: PocketStyle[] = [];
  pantsCutting: PantsCutting[] = [];

  selectJacket: boolean = false;
  selectPants: boolean = true;
  totalAmount: number;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private customizationService: CustomizationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { 
    this.cart = [];
    this.totalAmount = 0;
    this.newCustomizedJacket = new CustomizedJacket();
    this.newCustomizedPants = new CustomizedPants();
  }

  ngOnInit(): void {

    let currentCart = this.sessionService.getCart();
    if (currentCart) {
      this.cart = currentCart;
    }

    this.customizationService.getFabrics().subscribe(
      (response) => {
        this.fabrics = response;
        console.log(this.fabrics);
      },
      (error) => {
        console.log('Fabrics Not Found!');
      }
    );

    this.customizationService.getJacketStyles().subscribe(
      (response) => {
        this.jacketStyles = response;
        console.log(this.jacketStyles);
      },
      (error) => {
        console.log('Jacket Styles Not Found!');
      }
    );

    this.customizationService.getPocketStyles().subscribe(
      (response) => {
        this.pocketStyles = response;
        console.log(this.pocketStyles);
      },
      (error) => {
        console.log('Pocket Styles Not Found!');
      }
    );

    this.customizationService.getPantsCuttings().subscribe(
      (response) => {
        this.pantsCutting = response;
        console.log(this.fabrics);
      },
      (error) => {
        console.log('Pants Cutting Not Found!');
      }
    );
  }

  refresh() {
    this.totalAmount = 0;
    this.newCustomizedJacket = new CustomizedJacket();
    this.newCustomizedPants = new CustomizedPants();

    let currentCart = this.sessionService.getCart();
    if (currentCart) {
      this.cart = currentCart;
    }
  }

  activateJacket() {
    this.selectJacket = true;
    this.refresh();
  }

  activatePants() {
    this.selectPants = true;
    this.refresh();
  }

  addToCart(item: string) {
    let newOrderItem = new OrderLineItem();

    newOrderItem.product = (item == 'jacket') ? this.newCustomizedJacket : this.newCustomizedPants;
    newOrderItem.quantity = 1;
    newOrderItem.subTotal = this.totalAmount;

    this.cart.push(newOrderItem);
    this.sessionService.setCart(this.cart);

    this.refresh();
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

}
