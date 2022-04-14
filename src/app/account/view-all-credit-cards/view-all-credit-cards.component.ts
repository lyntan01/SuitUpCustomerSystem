import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { Customer } from 'src/app/models/customer';
import { CreditCard } from 'src/app/models/credit-card';
import { CustomerService } from 'src/app/services/customer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-all-credit-cards',
  templateUrl: './view-all-credit-cards.component.html',
  styleUrls: ['./view-all-credit-cards.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ViewAllCreditCardsComponent implements OnInit {
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
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
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
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'An error has occurred while attempting to retrieve credit cards: ' +
            error,
        });
      },
    });
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

  showBasicDialog() {
    this.displayBasic = true;
  }

  clear() {
    this.submitted = false;
    this.newCreditCard = new CreditCard();
  }

  createNewCreditCard(createCreditCardForm: NgForm) {
    // this.displayBasic = false;
    // this.submitted = true;
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
          this.displayBasic = false;
          this.submitted = true;
          this.newCreditCard = new CreditCard();
          this.ngOnInit();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New credit card successfully created.',
          });

          createCreditCardForm.form.markAsPristine();
          createCreditCardForm.form.markAsUntouched();
          createCreditCardForm.form.updateValueAndValidity();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error has occurred while saving credit card: ' + error,
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

  deleteCreditCard(creditCard: CreditCard) {
    console.log(creditCard);
    this.confirmationService.confirm({
      message:
        'Are you sure you would like to delete this Credit Card : ' +
        creditCard.cardNumber +
        '?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.creditCardService
          .deleteCreditCard(creditCard.creditCardId)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Credit card deleted!',
              });
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error,
              });
            },
          });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled.',
            });
            break;
        }
      },
    });
  }
}
