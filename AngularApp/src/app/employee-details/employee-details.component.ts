import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../employeemodel';
import { EmployeeService } from '../employee.service';
import { debug } from 'util';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  Employee: any;
  _employeeService;
  empId: Number;
  DepartmentList: any;
  DeptName: string;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {
      this._employeeService = employeeService;
   }

  ngOnInit() {
    debugger;
    this.route.paramMap.subscribe(params => {
      this.empId = parseInt(params.get('employeeId'));
    });

    this._employeeService.getEmployeeById(this.empId).subscribe(result => 
    { 
        this.Employee = result;
        this._employeeService.getDepartments().subscribe(result => { 
            this.DepartmentList = result;
            this.DeptName = this.DepartmentList.find(p=>p.DeptId == this.Employee.DeptId).DeptName;
        }); 
    });   
  }
}
