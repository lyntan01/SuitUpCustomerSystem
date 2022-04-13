import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css'],
})
export class AccountMenuComponent implements OnInit {
  accountItems: MenuItem[];
  appointmentItems: MenuItem[];
  orderItems: MenuItem[];

  constructor(private router: Router) {
    this.accountItems = new Array();
    this.appointmentItems = new Array();
    this.orderItems = new Array();
  }

  ngOnInit(): void {
    this.accountItems = [
      {
        label: 'My Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: '/profile',
      },
      {
        label: 'Change Password',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '/changePassword',
      },
      {
        label: 'View All Credit Cards',
        icon: 'pi pi-fw pi-id-card',
        routerLink: '/viewAllCreditCards',
      },
      {
        label: 'View All Addresses',
        icon: 'pi pi-fw pi-home',
        routerLink: '/viewAllAddresses',
      },
    ];
    this.appointmentItems = [
      {
        label: 'My Appointments',
        icon: 'pi pi-fw pi-user',
        routerLink: '/viewAllAppointments',
      },
    ];

    this.orderItems = [
      {
        label: 'My Orders',
        icon: 'pi pi-fw pi-user',
        routerLink: '/viewAllOrders',
      },
    ];
  }
}
