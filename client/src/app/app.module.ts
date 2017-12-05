import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* import HttpModule  */

import { HttpModule } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';

/* import routing modules  */

import { AppRoutingModule } from './app.routing.module';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

/* auth service import  */

import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

 
import { FlashMessagesModule } from 'angular2-flash-messages';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    PagenotfoundComponent,
    LoginComponent,
    ProfileComponent
  ],
    imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
