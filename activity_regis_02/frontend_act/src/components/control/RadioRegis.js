import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react'

export default function RadioRegis(props) {

const {name, label, value, onChange, items} = props;

  return (
    <div>
        <FormControl>
            <FormLabel>{label}</FormLabel>
                <RadioGroup row
                        name={name}
                        value={value}
                        onChange={onChange}>

                            {items.map((item, index)=>(<FormControlLabel key={item.id} value={item.id} control={<Radio/>} label={item.title}/>))}
                </RadioGroup>
        </FormControl>
    </div>
  )
}
