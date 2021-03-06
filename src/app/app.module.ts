import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepsModule } from 'primeng/steps';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataViewModule } from 'primeng/dataview';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccessRightErrorComponent } from './admin/access-right-error/access-right-error.component';
import { LoginComponent } from './admin/login/login.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { ImageModule } from 'primeng/image';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { ViewProfileComponent } from './account/view-profile/view-profile.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { ViewAllOrdersComponent } from './account/view-all-orders/view-all-orders.component';
import { ViewAllAppointmentsComponent } from './account/view-all-appointments/view-all-appointments.component';
import { ViewAllCreditCardsComponent } from './account/view-all-credit-cards/view-all-credit-cards.component';
import { ViewOrderItemDetailsComponent } from './account/view-order-item-details/view-order-item-details.component';
import { AddNewAddressComponent } from './account/add-new-address/add-new-address.component';
import { AddNewCreditCardComponent } from './account/add-new-credit-card/add-new-credit-card.component';
import { ViewAllAddressesComponent } from './account/view-all-addresses/view-all-addresses.component';
import { CreateNewAppointmentComponent } from './appointments/create-new-appointment/create-new-appointment.component';
import { ViewAllProductsComponent } from './products/view-all-products/view-all-products.component';
import { ViewProductDetailsComponent } from './products/view-product-details/view-product-details.component';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { CheckoutConfirmationComponent } from './cart/checkout-confirmation/checkout-confirmation.component';
import { DeliveryAddressComponent } from './cart/delivery-address/delivery-address.component';
import { PaymentMethodComponent } from './cart/payment-method/payment-method.component';
import { OrderSummaryComponent } from './cart/order-summary/order-summary.component';
import { ViewAllStoresComponent } from './stores/view-all-stores/view-all-stores.component';
import { ViewMyMeasurementsComponent } from './account/view-my-measurements/view-my-measurements.component';
import { ViewAllSupportTicketsComponent } from './account/view-all-support-tickets/view-all-support-tickets.component';
import { CustomizedMainComponent } from './suits/customized-main/customized-main.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    AccessRightErrorComponent,
    LoginComponent,
    SignUpComponent,
    FilterBarComponent,
    AccountMenuComponent,
    ViewProfileComponent,
    ChangePasswordComponent,
    ViewAllOrdersComponent,
    ViewAllAppointmentsComponent,
    ViewAllCreditCardsComponent,
    ViewOrderItemDetailsComponent,
    AddNewAddressComponent,
    AddNewCreditCardComponent,
    ViewAllAddressesComponent,
    CreateNewAppointmentComponent,
    ViewAllProductsComponent,
    ViewProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    CheckoutConfirmationComponent,
    DeliveryAddressComponent,
    PaymentMethodComponent,
    OrderSummaryComponent,
    ViewAllStoresComponent,
    ViewMyMeasurementsComponent,
    ViewAllSupportTicketsComponent,
    CustomizedMainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    CardModule,
    ImageModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    PasswordModule,
    ToastModule,
    ConfirmDialogModule,
    InputNumberModule,
    StepsModule,
    DividerModule,
    DropdownModule,
    ToolbarModule,
    DialogModule,
    PanelModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule,
    InputNumberModule,
    CheckboxModule,
    SliderModule,
    MultiSelectModule,
    DataViewModule,
    AccordionModule,
    FieldsetModule,
    ListboxModule,
    SelectButtonModule,
    RadioButtonModule,
    TabViewModule,
    TagModule,
    BreadcrumbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
