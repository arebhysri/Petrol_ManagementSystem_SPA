import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import component
import { LoginPageComponent } from './component/login-page/login-page.component';
import { PetrolSubmissionFormComponent } from './component/petrol-submission-form/petrol-submission-form.component';
import { AllFualRecordDetailsComponent } from './component/all-fual-record-details/all-fual-record-details.component';

const routes: Routes = [
  { path : '',component : LoginPageComponent },
  { path : 'login',component : LoginPageComponent },
  { path : 'petrolSubmission', component:PetrolSubmissionFormComponent },
  { path : 'editPetrolSubmission/:id', component:PetrolSubmissionFormComponent },
  { path : 'allFualRecord', component:AllFualRecordDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
