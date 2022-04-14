import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { CreditCard } from 'src/app/models/credit-card';
import { SessionService } from 'src/app/services/session.service';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
  providers: [MessageService],
})
export class PaymentMethodComponent implements OnInit {
  creditCards: CreditCard[];
  selectedCreditCard: CreditCard | undefined;
  newCreditCard: CreditCard;
  displayBasic: boolean;
  submitted: boolean;
  yearRange: string =
    new Date().getFullYear() + ':' + (new Date().getFullYear() + 10);
  minDate: Date = new Date();

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private messageService: MessageService,
    private creditCardService: CreditCardService
  ) {
    this.creditCards = new Array();
    this.selectedCreditCard = undefined;
    this.newCreditCard = new CreditCard();
    this.displayBasic = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.checkLogin();

    this.creditCardService
      .getCreditCards(this.sessionService.getCurrentCustomer())
      .subscribe({
        next: (response) => {
          this.creditCards = response;
          console.log(this.creditCards);
          this.sessionService.getCurrentCustomer().creditCards =
            this.creditCards;
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
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  prevPage(): void {
    this.router.navigate(['checkout/deliveryAddress']);
  }

  nextPage(paymentMethodForm: NgForm): void {
    this.submitted = true;
    console.log(
      'Selected credit card ID: ' + this.selectedCreditCard?.creditCardId
    );
    if (paymentMethodForm.valid && this.selectedCreditCard) {
      this.sessionService.setCreditCard(this.selectedCreditCard);
      this.router.navigate(['checkout/orderSummary']);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'No credit card selected',
      });
    }
  }

  formattedDate(date: Date): String {
    // console.log(date);
    return (
      date.toString().substring(5, 7) + ' / ' + date.toString().substring(2, 4)
    );
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  clear() {
    this.submitted = false;
    this.newCreditCard = new CreditCard();
  }

  createNewCreditCard(createCreditCardForm: NgForm) {
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

          this.newCreditCard = new CreditCard();
          this.ngOnInit();
          this.displayBasic = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail:
              'Credit Card with ID: ' +
              newCreditCardId +
              ' successfully created.',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'An error has occurred while creating credit card: ' + error,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please fill in credit card information',
      });
    }
  }
}
