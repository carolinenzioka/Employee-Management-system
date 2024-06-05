import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        username: "",
        phone_number: "",
        password_: "",
        ssn: "",
        birth_date: "",
        position_name: "",
        department_id: "",
    });
    const [department, setDepartment] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/department")
            .then((result) => {
                if (result.data.Status) {
                    setDepartment(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_employee', employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>


                    <div className="col-12">
                        <label for="inputFirstName" className="form-label"> First Name </label>
                        <input type="text" className="form-control rounded-0" id="inputFirstName" placeholder="First Name" onChange={(e) =>
                            setEmployee({ ...employee, first_name: e.target.value })
                        } />
                    </div>

                    <div className="col-12">
                        <label for="inputMiddleName" className="form-label"> Middle Name </label>
                        <input type="text" className="form-control rounded-0" id="inputMiddleName" placeholder="Middle Name" onChange={(e) =>
                            setEmployee({ ...employee, middle_name: e.target.value })
                        } />
                    </div>

                    <div className="col-12">
                        <label for="inputLastName" className="form-label"> Last Name </label>
                        <input type="text" className="form-control rounded-0" id="inputLastName" placeholder="Last Name" onChange={(e) =>
                            setEmployee({ ...employee, last_name: e.target.value })
                        } />
                    </div>

                    <div className="col-12">
                        <label for="inputEmail4" className="form-label"> Email </label>
                        <input type="email" className="form-control rounded-0" id="inputEmail4" placeholder="Enter Email" autoComplete="off" onChange={(e) =>
                            setEmployee({ ...employee, email: e.target.value })
                        }
                        />
                    </div>

                    <div className="col-12">
                        <label for="inputUsername" className="form-label"> Username </label>
                        <input type="text" className="form-control rounded-0" id="inputUsername" placeholder="Username" onChange={(e) =>
                            setEmployee({ ...employee, username: e.target.value })
                        } />
                    </div>

                    <div className="col-12">
                        <label for="inputPhone_number" className="form-label"> Phone Number </label>
                        <input type="text" className="form-control rounded-0" id="inputPhone_number" placeholder="Phone Number" onChange={(e) =>
                            setEmployee({ ...employee, phone_number: e.target.value })
                        } />
                    </div>

                    <div className="col-12">
                        <label for="inputPassword4" className="form-label"> Password </label>
                        <input type="password" className="form-control rounded-0" id="inputPassword4" placeholder="Enter Password" onChange={(e) =>
                            setEmployee({ ...employee, password_: e.target.value })
                        } />
                    </div>

                    <div className="col-12">
                        <label for="inputSsn" className="form-label"> Ssn </label>
                        <input type="text" className="form-control rounded-0" id="inputSsn" placeholder="Enter SSN" autoComplete="off" onChange={(e) =>
                            setEmployee({ ...employee, ssn: e.target.value })
                        } />
                    </div>

                    <div className="col-12">
                        <label for="inputBirth_date" className="form-label"> Birth Date </label>
                        <input type="date" className="form-control rounded-0" id="inputBirthDate" placeholder="Birth Date" onChange={(e) =>
                            setEmployee({ ...employee, birth_date: e.target.value })
                        } />
                    </div>

                    <div className="col-12">
                        <label for="inputPositionName" className="form-label"> Position Name </label>
                        <input type="text" className="form-control rounded-0" id="inputPositionname" placeholder="Position Name" onChange={(e) =>
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
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddEmployee;






