import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { db } from '../../../../firebase'
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore"
import employeeRoutes from '../../Routes/employeeRoutes'
import { Alert } from 'react-bootstrap'
import { UserAuth } from '../../../../context/AuthContext'

export default function Employee() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [position, setPosition] = useState('')
    const [message, setMessage] = useState({error: false, msg: ''})
    const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '700px',
    width: '500px'
  }
}
const {user} = UserAuth()
const [isOpen, setIsOpen] = useState(false)

function openModal() {
    setIsOpen(true)
  }
function closeModal() {
    setIsOpen(false)
  }

  async function handleSubmit(e){
        e.preventDefault()
        setMessage('')
        if (firstName === '' || lastName === '' || position === ''){
            setMessage({error: true, msg: 'All fields must be filled'})
            return;
        }
        const newEmp = {
            firstName,
            lastName,
            position
        }
        const pk = user.uid
        console.log(pk)
        try {
            await employeeRoutes.addEmp(pk, newEmp)
            setMessage({error: false, msg: "New Employee Registered!"})
            console.log('sent')
        } catch (error) {
            setMessage({error: true, msg: error.message})
            console.log(error.message)
        }

     setFirstName('')
     setLastName('')
     setPosition('')

  }

  return (
    <div className='employee'>
        {message?.msg && (<Alert
        variant={message?.error ? 'danger' : 'success'}
        dismissible
        onClose={() => setMessage('')}
        ></Alert>)}
        <button onClick={openModal}>Create</button>
        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
            />
            <input type="text" 
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            />
            <select name="position" 
            id=""
            onChange={(e) => setPosition(e.target.value)}
            >
                <option>Driver</option>
                <option>Monitor</option>
            </select>
            <button type='submit'>Register</button>
        </form>
      </Modal>
      <h1>hi</h1>
    </div>
  )
}
