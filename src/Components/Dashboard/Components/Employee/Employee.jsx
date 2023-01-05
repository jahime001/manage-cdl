import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { db } from '../../../../firebase'
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore"
import employeeRoutes from '../../Routes/employeeRoutes'
import  Alert  from 'react-bootstrap/Alert'
import { UserAuth } from '../../../../context/AuthContext'
import './Employee.css'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'

export default function Employee() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [position, setPosition] = useState('Driver')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pay, setPay] = useState('')
    const [employees, SetEmployees] = useState()
    const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '700px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}
const {user} = UserAuth()
const [isOpen, setIsOpen] = useState(false)
const pk = user.uid

function openModal() {
    setIsOpen(true)
  }
function closeModal() {
    setIsOpen(false)
  }
  useEffect(() => {
    async  function getEmp(){
        const data = await employeeRoutes.getAllEmp(pk)
        console.log(data.docs)
        SetEmployees(data.docs.map((doc) => ({...doc.data(),id: doc.id})))
      }
      getEmp()
  },[firstName])

  async function handleSubmit(e){
        e.preventDefault()
        if (firstName === '' || lastName === '' || position === '' || phone < 0 || email === '' || address === '' || city === '' ){
            toast.warn('All fields must be filled', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            return;
        }
        const newEmp = {
            firstName,
            lastName,
            position,
            phone,
            email,
            address,
            city,
            state,
            phone,
            pay
        }
        const pk = user.uid
        console.log(pk)
        try {
            await employeeRoutes.addEmp(pk, newEmp)
            toast.success('New Employee Registered!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            closeModal()
            console.log('sent')
        } catch (error) {
            toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            console.log(error.message)
        }

     setFirstName('')
     setLastName('')
     setPosition('Driver')
  
  }

  async function deleteEmp(id){
    await employeeRoutes.deleteEmp(pk,id)
    toast.success('Employee Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
  }


  return (
    <div className='employee'>
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className='employee-form-header'>
          <h1>Register a New Employee</h1>
        </div>
        <form onSubmit={handleSubmit} className='employee-form'>
          <div className='field-div'>
            <input type="text" 
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
            />
            <input type="text" 
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            />
            </div>
            <div className='field-div'>
            <input type="email" 
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            />
            <input type="tel" 
            placeholder='Phone Number'
            onChange={(e) => setPhone(e.target.value)}
            />
            </div>
            
            <input type="text" 
            placeholder='Street Address'
            onChange={(e) => setAddress(e.target.value)}
            />
            <div className='field-div'>
            <input type="text" 
            placeholder='City'
            onChange={(e) => setCity(e.target.value)}
            />
            <select >
            placeholder='State'
            onChange={(e) => setState(e.target.value)}
            	<option value="AL">Alabama</option>
	<option value="AK">Alaska</option>
	<option value="AZ">Arizona</option>
	<option value="AR">Arkansas</option>
	<option value="CA">California</option>
	<option value="CO">Colorado</option>
	<option value="CT">Connecticut</option>
	<option value="DE">Delaware</option>
	<option value="DC">District Of Columbia</option>
	<option value="FL">Florida</option>
	<option value="GA">Georgia</option>
	<option value="HI">Hawaii</option>
	<option value="ID">Idaho</option>
	<option value="IL">Illinois</option>
	<option value="IN">Indiana</option>
	<option value="IA">Iowa</option>
	<option value="KS">Kansas</option>
	<option value="KY">Kentucky</option>
	<option value="LA">Louisiana</option>
	<option value="ME">Maine</option>
	<option value="MD">Maryland</option>
	<option value="MA">Massachusetts</option>
	<option value="MI">Michigan</option>
	<option value="MN">Minnesota</option>
	<option value="MS">Mississippi</option>
	<option value="MO">Missouri</option>
	<option value="MT">Montana</option>
	<option value="NE">Nebraska</option>
	<option value="NV">Nevada</option>
	<option value="NH">New Hampshire</option>
	<option value="NJ">New Jersey</option>
	<option value="NM">New Mexico</option>
	<option value="NY">New York</option>
	<option value="NC">North Carolina</option>
	<option value="ND">North Dakota</option>
	<option value="OH">Ohio</option>
	<option value="OK">Oklahoma</option>
	<option value="OR">Oregon</option>
	<option value="PA">Pennsylvania</option>
	<option value="RI">Rhode Island</option>
	<option value="SC">South Carolina</option>
	<option value="SD">South Dakota</option>
	<option value="TN">Tennessee</option>
	<option value="TX">Texas</option>
	<option value="UT">Utah</option>
	<option value="VT">Vermont</option>
	<option value="VA">Virginia</option>
	<option value="WA">Washington</option>
	<option value="WV">West Virginia</option>
	<option value="WI">Wisconsin</option>
	<option value="WY">Wyoming</option>
            </select>
            </div>
            <div className='field-div'>
            <input type="text" 
            placeholder='Pay(per day)'
            onChange={(e) => setPay(e.target.value)}
            />
            <select name="position" 
            id=""
            onChange={(e) => setPosition(e.target.value)}
            >
                <option>Driver</option>
                <option>Monitor</option>
            </select>
            </div>
            <button type='submit' className='register-button'>Register</button>
        </form>
      </Modal>
      
      <div className='employee-upper'>
        <button onClick={openModal}>Create</button>
      </div>
      <div className='employee-lower'>
        <div className='emp-list-container'>
        <div></div>
        <div className='mini-nav'>
          <h4 className='column'>Name</h4>
          <h4 className='column'>Email</h4>
          <h4 className='column'>Pay</h4>
          <h4>Actions</h4>
        </div>
      
          {employees && employees.map((emp) => {
        return(
          <div className='employee-row' key={emp.id}>
              <p className='column'>{emp.firstName} {emp.lastName}</p>
            <p className='column'>{emp.email}</p>
            <p className='column'>${emp.pay}</p>
            <div className='actions'>
                <div className='edit-button'>
                  <AiOutlineEdit className='edit'/>
                </div>
                <div className='edit-button' onClick={(e) => deleteEmp(emp.id)}>
                  <AiOutlineDelete className='edit'/>
                </div>
            </div>
          </div>
        )
      })}
      </div>
      </div>
    </div>
  )
}
