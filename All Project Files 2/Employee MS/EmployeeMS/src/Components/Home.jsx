import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [departmentTotal, setDepartmentTotal] = useState(0);
  const [payrollTotal, setPayrollTotal] = useState(0);
  const [time_offTotal, setTime_offTotal] = useState(0);

  useEffect(() => {
    adminCount();
    employeeCount();
    departmentCount();
    payrollCount();
    time_offCount();
  }, []);

  

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      });
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      });
  };

  const payrollCount = () => {
    axios.get('http://localhost:3000/auth/payroll_count')
      .then(result => {
        if (result.data.Status) {
          setPayrollTotal(result.data.Result[0].payroll);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const time_offCount = () => {
    axios.get('http://localhost:3000/auth/time_off_count')
      .then(result => {
        if (result.data.Status) {
          setTime_offTotal(result.data.Result[0].time_off);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const departmentCount = () => {
    axios.get('http://localhost:3000/auth/department_count')
      .then(result => {
        if (result.data.Status) {
          setDepartmentTotal(result.data.Result[0].department);
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
  
    <div >
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-primary text-white'>
          <div className='text-center pb-1'>
            <h4>Admins</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-primary text-white'>
          <div className='text-center pb-1'>
            <h4>Employees</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-primary text-white'>
          <div className='text-center pb-1'>
            <h4>Departments</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{departmentTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-primary text-white'>
          <div className='text-center pb-1'>
            <h4>This weeks Payroll</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{payrollTotal}</h5>
          </div>
        </div>
      </div>

      <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-primary text-white'>
        <div className='text-center pb-1'>
          <h4>Pending Time Off</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{time_offTotal}</h5>
        </div>
      </div>

     
    </div>
  );
};

export default Home;
