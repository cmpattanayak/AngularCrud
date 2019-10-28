using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCrudWebApi.Data
{
    public class EmployeeModel
    {
        public int EmpId { get; set; }
        public string EmpName { get; set; }
        public string EmailId { get; set; }
        public string Gender { get; set; }
        public int DeptId { get; set; }
    }
}
