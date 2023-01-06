import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { UserAuth } from '../../../../context/AuthContext'
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import VanRoutes from '../../Routes/VanRoutes';

export default function Vans() {
const [vans, setVans] = useState()
const [make, setMake] = useState()
const [model, setModel] = useState()
const [year, setYear] = useState()
const [number, setNumber] = useState()
const [plate, setPlate] = useState()
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
    async  function getVan(){
        const data = await VanRoutes.getAllVan(pk)
        console.log(data.docs)
        setVans(data.docs.map((doc) => ({...doc.data(),id: doc.id})))
      }
      getVan()
  },[make])

async function handleSubmit(e){
        e.preventDefault()
        if (make === '' || model === '' ){
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
        const newVan = {
            make,
            model,
            year,
            number,
            plate
        }
        const pk = user.uid
        console.log(pk)
        try {
            await VanRoutes.addVan(pk, newVan)
            toast.success('New Van Added!', {
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

     setMake('')
     setModel('')
     setYear('')
     setNumber('')
     setPlate('')
  
  }
  

  return (
    <div>Vans</div>
  )
}
