import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './employee-list/employee-list.component';


const routes: Routes = [
                          { path: '', component: EmployeeListComponent },
                          { path: 'employeedetail/:employeeId', component: EmployeeDetailsComponent }
                       ];

@NgModule({
  imports: [
            BrowserModule,
            ReactiveFormsModule,
            RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
