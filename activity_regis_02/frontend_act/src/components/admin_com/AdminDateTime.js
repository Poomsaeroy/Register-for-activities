import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Box } from '@mui/material';

export default function ResponsiveDateTimeRange(props) {

    const theme = useTheme();

    const [value, setValue] = React.useState([null, null]);

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
            {isMatch ? (
                <>
                    <MobileDateRangePicker
                        name={props.name}
                        startText={props.startText}
                        endText={props.endText}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>)}/>
                </>
            ) : (
                <>
                    <DesktopDateRangePicker
                        name={props.name}
                        startText={props.startText}
                        endText={props.endText}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>)}/>
                </>
            )}
        </Stack>
    </LocalizationProvider>
  );
}