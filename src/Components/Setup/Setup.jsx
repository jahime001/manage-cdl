import React, { useState } from 'react'

export default function Setup() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [companyName, setCompanyName] = useState()
    const [companyEmail, setCompanyEmail] = useState()

  return (
    <div className='Setup'>
        <div className='setup-header'>
            <h1>Welcome</h1>
        </div>
    </div>
    )
}                                                                                                                                                                           