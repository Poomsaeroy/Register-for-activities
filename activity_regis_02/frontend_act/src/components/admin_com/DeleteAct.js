import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardMedia, Dialog, DialogContent, DialogTitle, Grid, styled, Typography } from "@mui/material";
import styles from '../CSS/popup.css';
import ax from '../../config/ax';
import { appAuthProvider } from '../../auth';
import axios from 'axios';
import config from '../../config';


function DeleteAct(props) {

    if(props.userResult){
        console.log("DATA DELETE",props.userResult.id)
    }


    const handleDelete = async () => {
        await axios.get(`https://wd0101.coe.psu.ac.th/api/delete/${props.userResult.id}/`)
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
                    ยืนยันการลบกิจกรรม
                </DialogTitle>
                <DialogContent dividers style={{backgroundColor: "#bb3347"}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box sx={{ color: '#ffff' }} style={{backgroundColor: "#303394"}}>
                                    <Typography>
                                        การลบกิจกรรมเป็นการกระทำที่ร้ายแรง
                                    </Typography>
                                    <Typography>
                                        Admin ควรมีสติก่อนใช้งาน
                                    </Typography>
                                </Box>
                            </Grid>
                            <Button
                                onClick={handleDelete}
                                variant="contained" 
                                sx={{
                                    mr:5, mt:2.5,
                                    backgroundColor:'#FF4A4A',
                                    ':hover': {
                                        bgcolor: '#C62929',
                                        color: 'white',
                                    },}}
                                >
                                    ยืนยันการลบกิจกรรม
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
                                    },}}                                >
                                    ยกเลิก
                            </Button>
                        </Grid>
                </DialogContent>
        </BootstrapDialog>
    </div>
  )
}

export default DeleteAct;