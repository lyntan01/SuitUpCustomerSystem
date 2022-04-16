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
import { Customization } from 'src/app/models/customization';
@Component({
  selector: 'app-customized-main',
  templateUrl: './customized-main.component.html',
  styleUrls: ['./customized-main.component.css'],
  providers: [ConfirmationService, MessageService],
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

  hasFabric: boolean = false;
  hasPantsCutting: boolean = false;

  hasInnerFabric: boolean = false;
  hasOuterFabric: boolean = false;
  hasJacketStyle: boolean = false;
  hasPocketStyle: boolean = false;

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

  // mockJacketStyles = [
  //   {
  //     customizationId: 1,
  //     name: 'Test JacketStyles',
  //     description: 'Description',
  //     additionalPrice: 30,
  //     isDisabled: false,
  //     image: 'assets/images/customized-main-2.jpeg',
  //   },
  //   {
  //     customizationId: 2,
  //     name: 'Test JacketStyles 2',
  //     description: 'Description',
  //     additionalPrice: 40,
  //     isDisabled: false,
  //     image: 'assets/images/customized-main-2.jpeg',
  //   },
  // ];

  ngOnInit(): void {
    let currentCart = this.sessionService.getCart();
    if (currentCart) {
      this.cart = currentCart;
    }

    this.customizationService.getFabrics().subscribe({
      next: (response) => {
        this.fabrics = response;
        console.log(this.fabrics);
      },
      error: (error) => {
        console.log('Fabrics Not Found!');
      }
    });

    this.customizationService.getJacketStyles().subscribe({
      next: (response) => {
        this.jacketStyles = response;
        console.log(this.jacketStyles);
      },
      error: (error) => {
        console.log('Jacket Styles Not Found!');
      }
    });

    this.customizationService.getPocketStyles().subscribe({
      next: (response) => {
        this.pocketStyles = response;
        console.log(this.pocketStyles);
      },
      error: (error) => {
        console.log('Pocket Styles Not Found!');
      }
    });

    this.customizationService.getPantsCuttings().subscribe({
      next: (response) => {
        this.pantsCutting = response;
        console.log(this.fabrics);
      },
      error: (error) => {
        console.log('Pants Cutting Not Found!');
      }
    });

    // this.jacketStyles = this.mockJacketStyles;
    // console.log(this.jacketStyles);
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
    this.selectPants = false;
    this.refresh();
  }

  activatePants() {
    this.selectPants = true;
    this.selectJacket = false;
    this.refresh();
  }

  selectCustomization(
    customization: Customization,
    name: string,
    isChecked: boolean
  ) {

    if (name === 'innerFabric') {
      this.hasInnerFabric = !isChecked;
      this.newCustomizedJacket.innerFabric = this.hasInnerFabric
        ? (customization as Fabric)
        : undefined;
    } else if (name === 'outerFabric') {
      this.hasOuterFabric = !isChecked;
      this.newCustomizedJacket.outerFabric = this.hasOuterFabric
        ? (customization as Fabric)
        : undefined;
    } else if (name === 'jacketStyle') {
      this.hasJacketStyle = !isChecked;
      this.newCustomizedJacket.jacketStyle = this.hasJacketStyle
        ? (customization as JacketStyle)
        : undefined;
    } else if (name === 'pocketStyle') {
      this.hasPocketStyle = !isChecked;
      this.newCustomizedJacket.pocketStyle = this.pocketStyles
        ? (customization as PocketStyle)
        : undefined;
    } else if (name === 'fabric') {
      this.hasFabric = !isChecked;
      this.newCustomizedPants.fabric = this.hasFabric
        ? (customization as Fabric)
        : undefined;
    } else if (name === 'pantsCutting') {
      this.hasPantsCutting = !isChecked;
      this.newCustomizedPants.pantsCutting = this.hasPantsCutting
        ? (customization as PantsCutting)
        : undefined;
    }

    this.tabulateTotalPrice();
  }

  tabulateTotalPrice() {
    this.totalAmount = 0;
    if (this.selectJacket) {
      this.totalAmount += (this.newCustomizedJacket.jacketStyle === undefined) ? 0 : this.newCustomizedJacket.jacketStyle?.additionalPrice as number;
      this.totalAmount += (this.newCustomizedJacket.pocketStyle === undefined) ? 0 : this.newCustomizedJacket.pocketStyle?.additionalPrice as number;
      this.totalAmount += (this.newCustomizedJacket.innerFabric === undefined) ? 0 : this.newCustomizedJacket.innerFabric?.additionalPrice as number;
      this.totalAmount += (this.newCustomizedJacket.outerFabric === undefined) ? 0 : this.newCustomizedJacket.outerFabric?.additionalPrice as number;
    } else if (this.selectPants) {
      this.totalAmount += (this.newCustomizedPants.fabric === undefined) ? 0 : this.newCustomizedPants.fabric?.additionalPrice as number;
      this.totalAmount += (this.newCustomizedPants.pantsCutting === undefined) ? 0 : this.newCustomizedPants.pantsCutting?.additionalPrice as number;

    }
  }

  addToCart(item: string) {
    let newOrderItem = new OrderLineItem();

    newOrderItem.product =
      item == 'jacket' ? this.newCustomizedJacket : this.newCustomizedPants;
    newOrderItem.quantity = 1;
    newOrderItem.subTotal = this.totalAmount;

    this.cart.push(newOrderItem);
    this.sessionService.setCart(this.cart);

    this.refresh();
    this.router.navigate(['/cart']);
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }
}
