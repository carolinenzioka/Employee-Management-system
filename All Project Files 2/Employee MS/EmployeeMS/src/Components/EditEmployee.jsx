import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditEmployee = () => {
    const {emp_id} = useParams()

    const [employee, setEmployee] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        username: "",
        phone_number: "",
        position_name: "",
        department_id: "",
    });

    const [department, setDepartment] = useState([])
    const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/department')
      .then(result => {
        if (result.data.Status) {
          setDepartment(result.data.Result);
        } else {
          alert(result.data.Error)
        }

      }).catch(err => console.log(err))

      axios.get('http://localhost:3000/auth/employee/'+emp_id)
        .then(result => {
            setEmployee({
                ...employee,
                first_name: result.data.Result[0].first_name,
                middle_name: result.data.Result[0].middle_name,
                last_name: result.data.Result[0].last_name,
                email: result.data.Result[0].email,
                username: result.data.Result[0].username,
                phone_number: result.data.Result[0].phone_number,
                position_name: result.data.Result[0].position_name,
                department_id: result.data.Result[0].department_id,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/'+emp_id, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }



  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>


            <div className="col-12">
                <label for="inputFirstName" className="form-label"> First Name </label>
                <input type="text" className="form-control rounded-0" id="inputFirstName" placeholder="First Name" value={employee.first_name} onChange={(e) =>
                    setEmployee({ ...employee, first_name: e.target.value })
                } />
            </div>

            <div className="col-12">
                <label for="inputMiddleName" className="form-label"> Middle Name </label>
                <input type="text" className="form-control rounded-0" id="inputMiddleName" placeholder="Middle Name" value={employee.middle_name} onChange={(e) =>
                    setEmployee({ ...employee, middle_name: e.target.value })
                } />
            </div>

            <div className="col-12">
                <label for="inputLastName" className="form-label"> Last Name </label>
                <input type="text" className="form-control rounded-0" id="inputLastName" placeholder="Last Name" value={employee.last_name}onChange={(e) =>
                    setEmployee({ ...employee, last_name: e.target.value })
                } />
            </div>

            <div className="col-12">
                <label for="inputEmail4" className="form-label"> Email </label>
                <input type="email" className="form-control rounded-0" id="inputEmail4" placeholder="Enter Email" autoComplete="off" value={employee.email} onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                }
                />
            </div>

            <div className="col-12">
                <label for="inputUsername" className="form-label"> Username </label>
                <input type="text" className="form-control rounded-0" id="inputUsername" placeholder="username" value={employee.username} onChange={(e) =>
                    setEmployee({ ...employee, username: e.target.value })
                } />
            </div>

            <div className="col-12">
                <label for="inputPhone_number" className="form-label"> Phone Number </label>
                <input type="text" className="form-control rounded-0" id="inputPhone_number" placeholder="Phone Number" value={employee.phone_number} onChange={(e) =>
                    setEmployee({ ...employee, phone_number: e.target.value })
                } />
            </div>

            <div className="col-12">
                <label for="inputPosition_name" className="form-label"> Position Name </label>
                <input type="text" className="form-control rounded-0" id="inputPosition_name" placeholder="Position Name" value={employee.position_name} onChange={(e) =>
                    setEmployee({ ...employee, position_name: e.target.value })
                } />
            </div>

            <div className="col-12">
                <label htmlFor="department" className="form-label"> Department </label>
                <select name="department" id="department" className="form-select"
                    onChange={(e) => setEmployee({ ...employee, department_id: e.target.value })}>
                    {department.map((d) => {
                        return <option value={d.department_id}>{d.department_name}</option>;
                    })}
                </select>
            </div>


            <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</div>
  )
}

export default EditEmployee