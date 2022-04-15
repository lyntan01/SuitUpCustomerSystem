import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { SupportTicket } from 'src/app/models/support-ticket';
import { SupportTicketService } from 'src/app/services/support-ticket.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-all-support-tickets',
  templateUrl: './view-all-support-tickets.component.html',
  styleUrls: ['./view-all-support-tickets.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ViewAllSupportTicketsComponent implements OnInit {
  supportTickets: SupportTicket[];
  displayBasic: boolean;
  newSupportTicket: SupportTicket;
  submitted: boolean;
  displaySupportTicket: boolean;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private supportTicketService: SupportTicketService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.supportTickets = new Array();
    this.displayBasic = false;
    this.newSupportTicket = new SupportTicket();
    this.submitted = false;
    this.displaySupportTicket = false;
  }

  ngOnInit(): void {
    this.checkLogin();

    this.supportTicketService.getSupportTicketsByCustomer().subscribe({
      next: (response: SupportTicket[]) => {
        this.supportTickets = response;
        this.sessionService.getCurrentCustomer().supportTickets =
          this.supportTickets;
      },
      error: (error: String) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'An error has occurred while retrieving support tickets: ' + error,
        });
      },
    });
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  showSupportTicketDialog() {
    this.displaySupportTicket = true;
  }

  clear() {
    this.submitted = false;
    this.newSupportTicket = new SupportTicket();
  }

  createNewSupportTicket(createSupportTicketForm: NgForm) {
    this.displayBasic = false;
    this.submitted = true;

    let tempSupportTicket: SupportTicket = Object.assign(
      {},
      this.newSupportTicket
    );

    if (createSupportTicketForm.valid) {
      this.supportTicketService
        .createSupportTicket(tempSupportTicket)
        .subscribe(
          (response) => {
            let newSupportTicketId: number = response;

            this.newSupportTicket = new SupportTicket();
            this.ngOnInit();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Support Ticket successfully created!',
            });

            createSupportTicketForm.form.markAsUntouched();
            createSupportTicketForm.form.markAsPristine();
            createSupportTicketForm.form.updateValueAndValidity();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'An error has occurred while creating support ticket: ' + error,
            });
          }
        );
    }
  }

  deleteSupportTicket(supportTicket: SupportTicket) {
    console.log(supportTicket);
    this.confirmationService.confirm({
      message:
        'Are you sure that you want to delete this Support Ticket : "' +
        supportTicket.name +
        '" ?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.supportTicketService
          .deleteSupportTicket(supportTicket.ticketId)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Support Ticket deleted!',
              });
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail:
                  'An error has occured while attempting to delete support ticket: ' +
                  error,
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
