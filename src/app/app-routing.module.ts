import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewAddressComponent } from './account/add-new-address/add-new-address.component';
import { AddNewCreditCardComponent } from './account/add-new-credit-card/add-new-credit-card.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { ViewAllAddressesComponent } from './account/view-all-addresses/view-all-addresses.component';
import { ViewAllAppointmentsComponent } from './account/view-all-appointments/view-all-appointments.component';
import { ViewAllCreditCardsComponent } from './account/view-all-credit-cards/view-all-credit-cards.component';
import { ViewAllOrdersComponent } from './account/view-all-orders/view-all-orders.component';
import { ViewMyMeasurementsComponent } from './account/view-my-measurements/view-my-measurements.component';
import { ViewOrderItemDetailsComponent } from './account/view-order-item-details/view-order-item-details.component';
import { ViewProfileComponent } from './account/view-profile/view-profile.component';
import { AccessRightErrorComponent } from './admin/access-right-error/access-right-error.component';
import { LoginComponent } from './admin/login/login.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { CreateNewAppointmentComponent } from './appointments/create-new-appointment/create-new-appointment.component';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutConfirmationComponent } from './cart/checkout-confirmation/checkout-confirmation.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { DeliveryAddressComponent } from './cart/delivery-address/delivery-address.component';
import { OrderSummaryComponent } from './cart/order-summary/order-summary.component';
import { PaymentMethodComponent } from './cart/payment-method/payment-method.component';
import { CustomizedMainComponent } from './suits/customized-main/customized-main.component';

import { IndexComponent } from './index/index.component';
import { ViewAllProductsComponent } from './products/view-all-products/view-all-products.component';
import { ViewProductDetailsComponent } from './products/view-product-details/view-product-details.component';
import { ViewAllStoresComponent } from './stores/view-all-stores/view-all-stores.component';
import { ViewAllSupportTicketsComponent } from './account/view-all-support-tickets/view-all-support-tickets.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'accessRightError', component: AccessRightErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'cart', component: CartComponent },
  { path: 'addNewAddress', component: AddNewAddressComponent },
  { path: 'addNewCreditCard', component: AddNewCreditCardComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'profile', component: ViewProfileComponent },
  { path: 'viewAllAddresses', component: ViewAllAddressesComponent },
  { path: 'viewAllCreditCards', component: ViewAllCreditCardsComponent },
  { path: 'viewAllOrders', component: ViewAllOrdersComponent },
  { path: 'viewAllAppointments', component: ViewAllAppointmentsComponent },
  { path: 'viewAllStores', component: ViewAllStoresComponent },
  { path: 'viewOrderItemDetails', component: ViewOrderItemDetailsComponent },
  { path: 'createNewAppointment', component: CreateNewAppointmentComponent },
  { path: 'viewAllProducts', component: ViewAllProductsComponent },
  { path: 'viewProductDetails', component: ViewProductDetailsComponent },
  { path: 'viewProductDetails', component: ViewProductDetailsComponent },
  { path: 'createNewCustomizedSuit', component: CustomizedMainComponent },
  {
    path: 'viewProductDetails/:standardProductId',
    component: ViewProductDetailsComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      { path: '', redirectTo: 'deliveryAddress', pathMatch: 'full' },
      { path: 'deliveryAddress', component: DeliveryAddressComponent },
      { path: 'paymentMethod', component: PaymentMethodComponent },
      { path: 'orderSummary', component: OrderSummaryComponent },
    ],
  },
  { path: 'viewMyMeasurements', component: ViewMyMeasurementsComponent },
  { path: 'checkoutConfirmation', component: CheckoutConfirmationComponent },
  { path: 'viewAllSupportTickets', component: ViewAllSupportTicketsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
