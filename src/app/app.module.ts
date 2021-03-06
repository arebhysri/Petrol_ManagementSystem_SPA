import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule,HttpResponse} from '@angular/common/http';

//import primng libraries
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {PaginatorModule} from 'primeng/paginator';

//import components
import { LoginPageComponent } from './component/login-page/login-page.component';
import { PetrolSubmissionFormComponent } from './component/petrol-submission-form/petrol-submission-form.component';
import { ViewAllFualDetailsComponent } from './component/popup/view-all-fual-details/view-all-fual-details.component';
import { AllFualRecordDetailsComponent } from './component/all-fual-record-details/all-fual-record-details.component';
import { HeaderPageComponent } from './component/header-page/header-page.component';
import { FooterPageComponent } from './component/footer-page/footer-page.component';
import { ViewSingleInventoryComponent } from './component/popup/view-single-inventory/view-single-inventory.component';
import { FuelManagementComponent } from './component/fuel-management/fuel-management.component';
import { CreateFuelManagementComponent } from './component/create-fuel-management/create-fuel-management.component';
import { CreatePumperComponent } from './component/create-pumper/create-pumper.component';
import { PumberManagementComponent } from './component/pumber-management/pumber-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PetrolSubmissionFormComponent,
    ViewAllFualDetailsComponent,
    AllFualRecordDetailsComponent,
    HeaderPageComponent,
    FooterPageComponent,
    ViewSingleInventoryComponent,
    FuelManagementComponent,
    CreateFuelManagementComponent,
    CreatePumperComponent,
    PumberManagementComponent
  ],
  imports: [
    PaginatorModule,
    TooltipModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    ViewAllFualDetailsComponent,
    ViewSingleInventoryComponent
  ]
})
export class AppModule { }
