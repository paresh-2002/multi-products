import React from 'react'

const Input = ({
    type='',
    placeholder='',
    onChange= () => {},
    value='',
    isRequired=true
}) => {
  return (
      <input className='w-full mt-3 border-2 outline-none p-2 rounded-md' type={type} placeholder={placeholder} onChange={onChange} value={value} required={isRequired}/>
  )
}

export default Input