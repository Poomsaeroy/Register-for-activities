import { TextField } from '@mui/material'
import React from 'react'

function Input(props) {

const {name, label, value, onChange, defaultValue} = props

  return (
    <div>
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}/>
            
    </div>
  )
}

export default Input