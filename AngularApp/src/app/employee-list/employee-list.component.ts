import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeModel } from '../employeemodel';
import { EmployeeService } from '../employee.service';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';

import { Observable } from 'rxjs';
import { Department } from '../employee.dept';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  _employeeService;
  dataSaved = false;
  employeeForm: any;
  Employees: any;
  employeeIdUpdate = null;
  massage = null;
  isReadOnly = false;
  departmentList: Array<Department>;

  empSubscribe;

  constructor(private formbuilder: FormBuilder, private employeeService: EmployeeService) { 
      this._employeeService = employeeService;
  }

  ngOnInit() {
    this.employeeForm = this.formbuilder.group({  
      EmpId: ['1000', [Validators.required]],
      EmpName: ['', [Validators.required]],  
      EmailId: ['', [Validators.required]],  
      Gender: ['', [Validators.required]],  
      DeptId: ['',[Validators.required]]
    }); 

    this.populateDepartments();
    this.Employees = this._employeeService.getEmployees();
  }

  loadAllEmployees() {
    this.Employees = this._employeeService.getEmployees();
  }

  onFormSubmit() {
    debugger;
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }

  CreateEmployee(employee: EmployeeModel) {
    if (this.employeeIdUpdate == null) {
      this._employeeService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully!';
          this.loadAllEmployees();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
          this.isReadOnly = false;
        }
      );
    } else {
      employee.Id = this.employeeIdUpdate;
      this._employeeService.updateEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully!';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
        this.isReadOnly = false;
      });
    }
  }

  loadEmployeeToEdit(employeeId: number) {
    this._employeeService.getEmployeeById(employeeId).subscribe(employee => {
      this.massage = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.EmpId;
      this.employeeForm.controls['EmpId'].setValue(employee.EmpId);
      this.employeeForm.controls['EmpName'].setValue(employee.EmpName);
      this.employeeForm.controls['EmailId'].setValue(employee.EmailId);
      this.employeeForm.controls['Gender'].setValue(employee.Gender);
      this.employeeForm.controls['DeptId'].setValue(employee.DeptId);
      this.isReadOnly = true;
    });
  }

  deleteEmployee(employeeId: number) {
      if (confirm("Are you sure you want to delete this ?")) {  
      this._employeeService.deleteEmployeeById(employeeId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Succefully';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.isReadOnly = false;
  }

  ngOnDestroy(){
      if(this.empSubscribe != null){
          this.empSubscribe.unsubscribe();
      }
  }

  populateDepartments(){
    this._employeeService.getDepartments().subscribe((result: Department[]) => { this.departmentList = result });
  }
}
