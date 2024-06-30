import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardMedia, Dialog, DialogContent, DialogTitle, Grid, styled, Typography } from "@mui/material";
import styles from './CSS/popup.css';
import ax from '../config/ax';
import { appAuthProvider } from '../auth';
import axios from 'axios';
import config from '../config';


function ConfirmAct(props) {

    const [userData,setUserData] = useState(null);

    useEffect(async () => {
        if(appAuthProvider.isAuthenticated){
            let user_result = await axios.get(`https://wd0101.coe.psu.ac.th/api/whoami/`,
            {
              headers: {
                  'Authorization': `Bearer ${appAuthProvider.accessToken}`
              }
            })
            setUserData(user_result.data)
        }
    },[])



    const handleRegister = async () => {
        await axios.get(`https://wd0101.coe.psu.ac.th/api/register/${userData.id}-${props.userResult.id}/`)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            if (error.response){
                console.log("RESPONSE ERROR",error.response)
            }else if(error.request){
                console.log("REQUEST ERROR",error.request)
            }else if(error.message){
                console.log("MESSAGE ERROR",error.message)
                }
        })
        props.handleClosePopup();
        alert("ลงทะเบียนเรียบร้อย");
    }

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

  return (
    <div>
        <BootstrapDialog
            onClose={props.handleClosePopup}
            aria-labelledby="customized-dialog-title"
            open={props.popup}
            maxWidth='sm'>
                <DialogTitle sx={{ m:0,p:2, color:'#FFF8DC'}}style={{backgroundColor: "#303394"}} >
                    ยืนยันการลงทะเบียน
                </DialogTitle>
                <DialogContent dividers style={{backgroundColor: "#bb3347"}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box sx={{ color: '#ffff' }} style={{backgroundColor: "#303394"}}>
                                    <Typography>
                                        ระบบจะทำการบันทึกรายชื่อของคุณเข้ากับกิจกรรม
                                    </Typography>
                                    <Typography>
                                        ขอให้สนุกกับกิจกรรมนะครับ ^-^
                                    </Typography>
                                </Box>
                            </Grid>
                            <Button
                                onClick={handleRegister}
                                variant="contained" 
                                sx={{
                                    mr:5, mt:2.5,
                                    backgroundColor:'#18D6B2',
                                    ':hover': {
                                        bgcolor: '#36A48F',
                                        color: 'white',
                                    },}}
                                >
                                    ยืนยันการลงทะเบียน
                            </Button>
                            <Button 
                                onClick={props.handleClosePopup}
                                variant="contained" 
                                sx={{
                                    mt:2.5,
                                    backgroundColor:'#269DDD',
                                    ':hover': {
                                        bgcolor: '#2E7093',
                                        color: 'white',
                                    },}}>
                                    ยกเลิก
                            </Button>
                        </Grid>
                </DialogContent>
        </BootstrapDialog>
    </div>
  )
}

export default ConfirmAct