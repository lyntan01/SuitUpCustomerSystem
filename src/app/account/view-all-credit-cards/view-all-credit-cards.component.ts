import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { Customer } from 'src/app/models/customer';
import { CreditCard } from 'src/app/models/credit-card';
import { CustomerService } from 'src/app/services/customer.service';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-all-credit-cards',
  templateUrl: './view-all-credit-cards.component.html',
  styleUrls: ['./view-all-credit-cards.component.css'],
})
export class ViewAllCreditCardsComponent implements OnInit {
  deleteCreditCardError: boolean;
  createCreditCardError: boolean;
  errorMessage: string | undefined;
  creditCards: CreditCard[];
  currentCustomer: Customer;
  displayBasic: boolean;
  newCreditCard: CreditCard;
  submitted: boolean;
  yearRange: string =
    new Date().getFullYear() + ':' + (new Date().getFullYear() + 10);
  minDate: Date = new Date();

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private creditCardService: CreditCardService,
    private customerService: CustomerService
  ) {
    this.deleteCreditCardError = false;
    this.createCreditCardError = false;
    this.currentCustomer = this.sessionService.getCurrentCustomer();
    this.creditCards = new Array();
    this.displayBasic = false;
    this.newCreditCard = new CreditCard();
    this.submitted = false;
  }

  ngOnInit(): void {
    this.checkLogin();

    this.creditCardService.getCreditCards(this.currentCustomer).subscribe({
      next: (response) => {
        this.creditCards = response;
        console.log(this.creditCards);
        this.currentCustomer.creditCards = this.creditCards;
        this.sessionService.getCurrentCustomer().creditCards = this.creditCards;
        if (this.creditCards) {
          this.creditCards.forEach((cc) => {
            cc.cardNumber =
              '**** **** **** ' + cc.cardNumber?.substring(12, 16);
            console.log(cc.cardNumber);
          });
        }
      },
      error: (error) => {
        console.log('********** Retrieve all credit cards' + error);
      },
    });

    // if (this.creditCards) {
    //   this.creditCards.forEach((cc) => {
    //     cc.cardNumber = cc.cardNumber
    //       ?.replace(/.(?=.{4})/g, '*')
    //       .replace(/.{4}(?=.)/g, '$& ');
    //   });
    // }
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  formattedDate(date: Date): String {
    // console.log(date);
    return (
      date.toString().substring(5, 7) + ' / ' + date.toString().substring(2, 4)
    );
  }

  void() {
    console.log('test');
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  clear() {
    this.submitted = false;
    this.newCreditCard = new CreditCard();
  }

  createNewCreditCard(createCreditCardForm: NgForm) {
    this.displayBasic = false;
    this.submitted = true;
    let temp = this.newCreditCard.cardNumber;
    let split = temp?.split('-');
    let ccWithoutDash = '';
    if (split != undefined) {
      for (let x of split) {
        ccWithoutDash += x;
      }
    }
    this.newCreditCard.cardNumber = ccWithoutDash;

    let tempCreditCard: CreditCard = Object.assign({}, this.newCreditCard);

    if (createCreditCardForm.valid) {
      this.creditCardService.createNewCreditCard(tempCreditCard).subscribe(
        (response) => {
          let newCreditCardId: number = response;

          this.createCreditCardError = false;
          this.newCreditCard = new CreditCard();
          this.ngOnInit();
        },
        (error) => {
          this.createCreditCardError = true;
          this.submitted = false;
          this.errorMessage =
            'An error has occurred while creating apppointment: ' + error;

          console.log(error);
        }
      );
    }
  }
}
