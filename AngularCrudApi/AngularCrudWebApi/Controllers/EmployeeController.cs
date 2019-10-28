using AngularCrudWebApi.Data;
using AngularCrudWebApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularCrudWebApi.Controllers
{
    [RoutePrefix("api/employee")]
    public class EmployeeController : ApiController
    {

        private static string jsonPath = @"C:\Chinmaya\PoC\cpdevtfs\AngularCrud\AngularCrudApi\AngularCrudWebApi\Data\EmployeeData.json";

        [Route("employees")]
        [HttpGet]
        public List<EmployeeModel> GetEmployees()
        {
            var employees = new List<EmployeeModel>();

            using (StreamReader r = new StreamReader(jsonPath))
            {
                var j = r.ReadToEnd();
                employees = JsonConvert.DeserializeObject<List<EmployeeModel>>(j);
            }

            return employees.OrderBy(p=>p.EmpId).ToList();
        }

        [Route("new-employee")]
        [HttpPost]
        public void AddEmployee(EmployeeModel model)
        {
            var employees = new List<EmployeeModel>();

            using (StreamReader r = new StreamReader(jsonPath))
            {
                var j = r.ReadToEnd();
                employees = JsonConvert.DeserializeObject<List<EmployeeModel>>(j);
            }

            employees.Add(model);

            string json = JsonConvert.SerializeObject(employees);

            System.IO.File.WriteAllText(jsonPath, string.Empty);
            System.IO.File.WriteAllText(jsonPath, json);
        }

        [Route("employee-by-id/{employeeId}")]
        [HttpGet]
        public EmployeeModel GetEmployeeById(int employeeId)
        {
            var employees = new List<EmployeeModel>();

            using (StreamReader r = new StreamReader(jsonPath))
            {
                var j = r.ReadToEnd();
                employees = JsonConvert.DeserializeObject<List<EmployeeModel>>(j);
            }

            return employees.FirstOrDefault(p => p.EmpId == employeeId);
        }

        [Route("delete-employee/{employeeId}")]
        [HttpDelete]
        public void DeleteEmployee(int employeeId)
        {
            var employees = new List<EmployeeModel>();

            using (StreamReader r = new StreamReader(jsonPath))
            {
                var j = r.ReadToEnd();
                employees = JsonConvert.DeserializeObject<List<EmployeeModel>>(j);
            }

            employees.Remove(employees.FirstOrDefault(p => p.EmpId == employeeId));

            string json = JsonConvert.SerializeObject(employees);

            System.IO.File.WriteAllText(jsonPath, string.Empty);
            System.IO.File.WriteAllText(jsonPath, json);
        }

        [Route("save-employee")]
        [HttpPut]
        public void UpdateEmployee(EmployeeModel model)
        {
            var employees = new List<EmployeeModel>();

            using (StreamReader r = new StreamReader(jsonPath))
            {
                var j = r.ReadToEnd();
                employees = JsonConvert.DeserializeObject<List<EmployeeModel>>(j);
            }

            employees.Remove(employees.FirstOrDefault(p => p.EmpId == model.EmpId));
            employees.Add(model);

            string json = JsonConvert.SerializeObject(employees);

            System.IO.File.WriteAllText(jsonPath, string.Empty);
            System.IO.File.WriteAllText(jsonPath, json);
        }

        [Route("departments")]
        [HttpGet]
        public List<Department> GetDepartments()
        {
            List<Department> depts = new List<Department>
            {
                new Department{DeptId=1,DeptName="HR" },
                new Department{DeptId=2,DeptName="Payroll" },
                new Department{DeptId=3,DeptName="Sales"},
                new Department{DeptId=4,DeptName="Marketing"},
            };

            return depts;
        }
    }
}
