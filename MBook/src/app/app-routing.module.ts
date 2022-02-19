import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'product', component:ProductComponent },
  { path:'login', component:SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
