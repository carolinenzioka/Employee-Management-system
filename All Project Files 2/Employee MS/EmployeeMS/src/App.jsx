import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Department from './Components/Department'
import AddDepartment from './Components/AddDepartment'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'

function App() {


  return (
   <BrowserRouter>
   <Routes>
    <Route path= '/adminlogin' element = {<Login />}></Route>
    <Route path= '/dashboard' element = {<Dashboard />}>
    <Route path= '' element = {<Home />}></Route>
    <Route path= '/dashboard/employee' element = {<Employee />}></Route>
    <Route path= '/dashboard/department' element = {<Department />}></Route>
    <Route path= '/dashboard/add_department' element = {<AddDepartment />}></Route>
    <Route path= '/dashboard/add_employee' element = {<AddEmployee />}></Route>
    <Route path= '/dashboard/edit_employee/:emp_id' element = {<EditEmployee />}></Route>
   </Route>
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
