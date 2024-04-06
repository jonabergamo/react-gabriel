import React from 'react'
import './style.css'


export default function Button({ children, ...props }) {
  return (
    <button {...props} className='styled-button'>{children}</button>
  )
}
