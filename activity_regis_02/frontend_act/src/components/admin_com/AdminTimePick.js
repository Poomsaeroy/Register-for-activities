import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import { useMediaQuery, useTheme } from '@material-ui/core';

export default function ResponsiveTimePickers(props) {

    const theme = useTheme();

    const [value, setValue] = React.useState(new Date('2018-01-01T00:00:00.000Z'));

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        {isMatch ? (
            <MobileTimePicker
                name={props.name}
                label={props.label}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}/>
        ) : (
            <DesktopTimePicker
                name={props.name}
                label={props.label}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}/> 
        )}
      </Stack>
    </LocalizationProvider>
  );
}