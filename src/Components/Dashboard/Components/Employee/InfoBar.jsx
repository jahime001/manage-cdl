import React, { useState } from 'react'
import './InfoBar.css'
export default function InfoBar({barOpen}) {
    

  return (
      <div className={`infobar ${barOpen && 'bar-active'}`}>InfoBar</div>
  )
}
