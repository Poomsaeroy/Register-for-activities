import { OptionUnstyled } from '@mui/base';
import { FormControl, InputLabel, MenuItem,Select as MuiSelect } from '@material-ui/core';
import React from 'react'

export default function Select(props) {

    const {name, label, value, onChange, options} = props;

    console.log("This is option :",options)
    console.log("This is data type :",typeof(options))
    // options.map(item => console.log("From map :",item))

  return (
    <div>
        <FormControl
            variant='outlined'>
                <InputLabel>{label}</InputLabel>
                <MuiSelect
                    defaultValue = ""
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}>
                        {/* <MenuItem value="">None</MenuItem> */}
                        {options.map((item) => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>))}
                </MuiSelect>
        </FormControl>
    </div>
  )
}
