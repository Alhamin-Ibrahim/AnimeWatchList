import React from 'react'
import { Navigate } from 'react-router-dom'
import userStore from './store/userStore'

const ProtectiveRoute = ({children}) => {
    const {token} =userStore()
  return token ? children : <Navigate to={'/'} replace />

}

export default ProtectiveRoute
