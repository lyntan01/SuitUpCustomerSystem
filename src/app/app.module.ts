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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccessRightErrorComponent } from './admin/access-right-error/access-right-error.component';
import { LoginComponent } from './admin/login/login.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    AccessRightErrorComponent,
    LoginComponent,
    SignUpComponent
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
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
