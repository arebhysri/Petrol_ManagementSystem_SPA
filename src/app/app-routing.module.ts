import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import component
import { LoginPageComponent } from './component/login-page/login-page.component';
import { PetrolSubmissionFormComponent } from './component/petrol-submission-form/petrol-submission-form.component';
import { AllFualRecordDetailsComponent } from './component/all-fual-record-details/all-fual-record-details.component';
import { FuelManagementComponent } from './component/fuel-management/fuel-management.component';
import { CreateFuelManagementComponent } from './component/create-fuel-management/create-fuel-management.component';
import { CreatePumperComponent } from './component/create-pumper/create-pumper.component';
import { PumberManagementComponent } from './component/pumber-management/pumber-management.component';

const routes: Routes = [
  { path : '',component : LoginPageComponent },
  { path : 'login',component : LoginPageComponent },
  { path : 'petrolSubmission', component:PetrolSubmissionFormComponent },
  { path : 'editPetrolSubmission/:id', component:PetrolSubmissionFormComponent },
  { path : 'allFualRecord', component:AllFualRecordDetailsComponent },
  { path : 'allPumberRecord', component:PumberManagementComponent },
  { path : 'allPumberRecordByFuelCode/:fuelCode', component:PumberManagementComponent },
  { path : 'fuelInventory', component:FuelManagementComponent },
  { path : 'createFuelInventory', component:CreateFuelManagementComponent },
  { path : 'createPumberInventory', component:CreatePumperComponent },
  { path : 'editPumberInventory/:id', component:CreatePumperComponent },
  { path : 'editFuelInventory/:id', component:CreateFuelManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
