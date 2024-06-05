import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Employee = () => {
  const [employee, setEmployee] = useState([])
  const navigate = useNavigate()
  useEffect(() => {

    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error)
        }

      }).catch(err => console.log(err))

  }, [])
  const handleDelete = (emp_id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/' + emp_id)
    .then(result => {
      if (result.data.Status) {
        window.location.reload()
      } else {
        alert(result.data.Error)
      }


    })


  }

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-success'> Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Action</th>


            </tr>
          </thead>
          <tbody>
            {
              employee.map((e) => (
                <tr>
                  <td>{e.first_name}</td>
                  <td>{e.middle_name}</td>
                  <td>{e.last_name}</td>
                  <td>{e.email}</td>
                  <td>{e.username}</td>
                  <td>{e.phone_number}</td>
                  <td>{e.position_name}</td>

                  <td>
                    <Link to={`/dashboard/edit_employee/` + e.emp_id} className="btn btn-info btn-sm me-2">Edit</ Link>
                    <button className="btn btn-warning btn-sm" onClick={() => handleDelete(e.emp_id)}>Delete</button>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Employee