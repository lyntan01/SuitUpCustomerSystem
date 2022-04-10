import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
// import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  username: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;
  loginError: boolean;

  constructor(
    private router: Router,
    public sessionService: SessionService,
    // private customerService: CustomerService
  ) {
    this.loginError = false;
  }

  ngOnInit(): void {}

  customerLogin(): void {
    
  }
}
