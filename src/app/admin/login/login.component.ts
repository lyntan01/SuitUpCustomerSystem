import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;
  loginError: boolean;

  constructor(
    private router: Router,
    public sessionService: SessionService,
    private customerService: CustomerService
  ) {
    this.loginError = false;
  }

  ngOnInit(): void {}

  customerLogin(): void {
    this.customerService.customerLogin(this.email, this.password).subscribe(
      (response) => {
        let customer: Customer = response;

        if (customer != null) {
          this.sessionService.setIsLogin(true);
          this.sessionService.setCurrentCustomer(customer);
          this.sessionService.setEmail(this.email ?? '');
          this.sessionService.setPassword(this.password ?? '');
          this.loginError = false;

          console.log(this.sessionService.getIsLogin());

          this.router.navigate(['/index']).then(() => {
            window.location.reload();
          });
        } else {
          this.loginError = true;
        }
      },
      (error) => {
        this.loginError = true;
        this.errorMessage = "Invalid email or password!";
      }
    );
  }
}
