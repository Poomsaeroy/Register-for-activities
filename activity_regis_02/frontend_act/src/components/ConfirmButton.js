import { Button } from '@mui/material'
import React from 'react'

function ConfirmButton(props) {
    if (props.bool_check){
        return(
            <div
                style={{
                    backgroundColor:'#6A5ACD',
                    padding:'5px 0px 8px 200px',
                    }}>
            <Button
                onClick={props.handleOpenConfirmPopup}
                sx={{
                    backgroundColor:'#38A4D4',
                    ':hover': {
                        bgcolor: '#178EAA',
                        color: 'white',
                    },}}
                variant="contained"
                size="large"
                disabled>
                    ลงทะเบียน
                </Button>
            </div>
        )
    } else {
        return(
            <div
                style={{
                    backgroundColor:'#6A5ACD',
                    padding:'5px 0px 8px 200px',
                    }}>
            <Button
                onClick={props.handleOpenConfirmPopup}
                sx={{
                    backgroundColor:'#38A4D4',
                    ':hover': {
                        bgcolor: '#178EAA',
                        color: 'white',
                    },}}
                variant="contained"
                size="large">
                ลงทะเบียน
            </Button>
        </div>
        )
    }
}

export default ConfirmButton