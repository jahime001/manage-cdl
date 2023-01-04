import React, { useEffect, useState } from 'react'
import Home from './Components/Home/Home'
import Sidenav from './Components/Sidenav/Sidenav'
import Employee from './Components/Employee/Employee'
import './Dashboard.css'
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from '../../context/AuthContext';
import { UserAuth } from '../../context/AuthContext';
import { doc, getDoc, collection} from 'firebase/firestore'
import { db } from '../../firebase';
import employeeRoutes from './Routes/employeeRoutes'
export default function Dashboard() {
   const [userInfo, setUserInfo] = useState()
    const {user, logout} = UserAuth()
    // const docRef = doc(db, 'users', user.uid)

    useEffect(() => {
        async function getUsers(){
                
                const docSnap = await getDoc(doc(db, 'users', user.uid, 'userInfo', 'info'))
                console.log(docSnap.data())
                setUserInfo(docSnap.data())

        }
        getUsers()
    },[])
  return (
    <div className='Dashboard'>
      <AuthContextProvider>
        <Sidenav/>
        <Routes>
        <Route path='/' element={<Home userInfo={userInfo}/>} />
        <Route path='/employees' element={<Employee/>} />
      </Routes>
      </AuthContextProvider>
    </div>
  )
}
