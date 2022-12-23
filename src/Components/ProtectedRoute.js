import React, { Children } from 'react'
import { Navigate } from 'react-router'
import { UserAuth } from '../context/AuthContext'

export default function ProtectedRoute( {children}) {
    const {user} = UserAuth()

    if (!user) {
        return <Navigate to= '/'/>
    }
  return children
}
