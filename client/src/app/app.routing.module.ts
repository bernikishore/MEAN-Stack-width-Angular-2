import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [   
     {
        path: '', 
        redirectTo: '/home', pathMatch: 'full',
        data: { title: 'Home' }
     },
     { 
        path: 'home', 
        component: HomeComponent,
        data: { title: 'Home' }
     },
     { 
        path: 'dashboard', 
        component: DashboardComponent 
     },
     { 
        path: 'register', 
        component: RegisterComponent 
     },
     { 
        path: '**', 
        component: PagenotfoundComponent,
        data: { title: '404' }
     }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }