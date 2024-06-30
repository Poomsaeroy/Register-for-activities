import { Box, Button, Card, CardMedia, Dialog, DialogContent, DialogTitle, Grid, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config";
import ax from "../../config/ax";
import styles from '../CSS/popup.css';

function ActCheckPopup(props){


    const [activity, setActivity] = useState(null);

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    useEffect(async () => {
        if(props.userResult){
            console.log('loading announcement')
            let result = await axios.get(`https://wd0101.coe.psu.ac.th/api/activity/${props.userResult.id}/`)
            setActivity(result.data)
        }
    },[props.userResult ? props.userResult.id:null])


    if (activity) {
        return(
        <div>
            <BootstrapDialog
                onClose={props.handleClosePopup}
                aria-labelledby="customized-dialog-title"
                open={props.popup}
                maxWidth='lg'>
                    <DialogTitle sx={{ m:0,p:2, color:'#FFF8DC'}}style={{backgroundColor: "#303394"}} >
                        {activity.topic}
                    </DialogTitle>
                    <DialogContent dividers style={{backgroundColor: "#bb3347"}}>
                            <Grid container>
                                <Grid item xs={7}>
                                    <Box sx={{ color: '#ffff' }} style={{backgroundColor: "#303394"}}>
                                        <Typography>
                                            วันลงทะเบียน : {activity.start_regis} - {activity.end_regis}
                                        </Typography>
                                        <Typography>
                                            วันจัดกิจกรรม : {activity.start_act} - {activity.end_act}
                                        </Typography>
                                        <Typography>
                                            สถานที่จัดกิจกรรม : {activity.act_place}
                                        </Typography>
                                        <Typography>
                                            - - - - - - - - - - - - - - - - - - - - - - -
                                        </Typography>
                                        <Typography>
                                            รายละเอียด : {activity.description}
                                        </Typography>
                                        <Typography>
                                            - - - - - - - - - - - - - - - - - - - - - - -
                                        </Typography>
                                        <Typography>
                                            รูปแบบการจัดกิจกรรม : {activity.regis_type}
                                        </Typography>
                                        <Typography>
                                            จำนวนผู้สมัคร : 0/{activity.member_limit}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={1}>

                                </Grid>
                                <Grid item xs={4}>
                                    <Card
                                    sx={{
                                        // height:'auto',
                                        // width:'100px',
                                        objectFit:'contin'
                                        // maxHeight:'100px',
                                        // maxHeight:'100px',
                                        }}
                                        >
                                            <CardMedia component="img"
                                                        image={activity.acti_image}
                                                        alt="Loading"/>
                                    </Card>
                                    <Button
                                        href={activity.feedback_link}
                                        variant="contained" 
                                        className="submit"
                                        target="_blank"
                                        sx={{m:1.5}}>
                                            แบบประเมิน
                                    </Button>
                                </Grid>
                            </Grid>
                    </DialogContent>
            </BootstrapDialog>
        </div>
    );
    }else{
        return(
            <BootstrapDialog>
                <DialogContent dividers>
                    Loading...
                </DialogContent>
            </BootstrapDialog>
        );
    }


    
}

export default ActCheckPopup