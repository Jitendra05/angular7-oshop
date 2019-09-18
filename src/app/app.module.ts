import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular7-data-table';

import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    LoginComponent,
    CheckOutComponent,
    ProductFormComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTableModule.forRoot(),
    CustomFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path:'', component:ProductsComponent},
      {path:'products', component:ProductsComponent},
      {path:'shopping-cart', component:ShoppingCartComponent},
      {path:'login', component:LoginComponent},

      {path:'check-out', component:CheckOutComponent, canActivate:[AuthGuard]},
      {path:'order-success', component:OrderSuccessComponent, canActivate:[AuthGuard]},
      {path:'my/orders', component:MyOrdersComponent, canActivate:[AuthGuard]},

      {
        path:'admin/orders', 
        component:AdminOrdersComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      },
      {
        path:'admin/products/new', 
        component:AddProductComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      },
      {
        path:'admin/products/:id', 
        component:EditProductComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      },
      {
        path:'admin/products', 
        component:AdminProductsComponent, 
        canActivate:[AuthGuard, AdminAuthGuard]
      },
    ])
  ],
  providers: [
    AuthGuard,
    AdminAuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
