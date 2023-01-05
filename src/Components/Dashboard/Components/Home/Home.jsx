import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { UserAuth } from '../../../../context/AuthContext'
import Sidenav from '../Sidenav/Sidenav'
import { FaUserAlt, FaCarAlt, FaChild } from 'react-icons/fa'
import './Home.css'
import { db } from '../../../../firebase'
import { doc, getDoc, collection} from 'firebase/firestore'

export default function Home({userInfo}) {
// async function handleLogout(){
//     try {
//         await logout()
//         navigate('/signin')
//         console.log('you logged out')
//     } catch (error) {
//         console.log(error.message)
//     }
// }
console.log(userInfo)


  return (
    <div className='home'>
        <div className='home-header'>
         <h1>Welcome {userInfo && userInfo.firstName}</h1>
         </div>
         <div className='home-center'>
            <div className='employee-index' style={{backgroundColor: "#097bff"}}>
                <h1>5</h1> <FaUserAlt className='useralt home-icon'/>
            </div>
            <div className='van-index' style={{backgroundColor: "#ffc100"}}>
                <h1>2</h1> <FaCarAlt className='caralt home-icon' />
            </div>
            <div className='student-index' style={{backgroundColor: "#28a73d"}}>
                <h1>8</h1> <FaChild className='child home-icon'/>
            </div>
         </div>
    </div>
  )
}
