import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  loginItems: MenuItem[];
  login: boolean;
  userButton: string = '';

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.items = [];
    this.loginItems = [];
    this.login = false;
  }

  ngOnInit(): void {
    if (this.sessionService.getIsLogin()) {
      this.userButton =
        this.sessionService.getCurrentCustomer()?.fullName ?? '';
    } else {
      this.userButton = '';
    }

    this.login = this.sessionService.getIsLogin();

    this.items = [
      {
        label: 'Home',
        routerLink: '/index',
      },
      {
        label: 'Suits',
        routerLink: '/createNewCustomizedSuit',
      },
      {
        label: 'Products',
        routerLink: '/viewAllProducts',
      },
      {
        label: 'Appointments',
        routerLink: '/createNewAppointment',
      },
      {
        label: 'Stores',
        routerLink: '/viewAllStores',
      },
    ];

    this.loginItems = [
      {
        visible: !this.login,
        items: [
          {
            label: 'Login',
            icon: 'pi pi-sign-in',
            routerLink: '/login',
          },
          {
            label: 'Sign Up',
            icon: 'pi pi-user',
            routerLink: '/signup',
          },
        ],
      },
      {
        visible: this.login,
        items: [
          {
            label: 'My Account',
            icon: 'pi pi-user',
            routerLink: '/profile',
          },
          {
            label: 'My Measurements',
            icon: 'pi pi-pencil',
            routerLink: '/viewMyMeasurements',
          },
          {
            label: 'My Appointments',
            icon: 'pi pi-calendar',
            routerLink: '/viewAllAppointments',
          },
          {
            label: 'My Support Tickets',
            icon: 'pi pi-ticket',
            routerLink: '/viewAllSupportTickets',
          },
          {
            label: 'My Orders',
            icon: 'pi pi-copy',
            routerLink: '/viewAllOrders',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: (event) => {
              this.customerLogout();
            },
          },
        ],
      },
    ];
  }

  customerLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentCustomer(null);
    this.router.navigate(['/index']).then(() => {
      window.location.reload();
    });
  }
}
