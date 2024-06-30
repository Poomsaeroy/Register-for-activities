import { useTheme } from '@emotion/react';
import { Button, ButtonBase, Card, CardActionArea, CardContent, CardHeader, CardMedia, createTheme, Grid, IconButton, makeStyles, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ax from '../config/ax';
import FavoriteIcon from "@material-ui/icons/Favorite";
import 'aos/dist/aos.css';
import Aos from 'aos';
import '../components/CSS/animate_card.css'
import { setDefault } from '../auth';
import axios from 'axios';
import config from '../config';

function ActCard(props){
    const appAuthProvider = JSON.parse(localStorage.getItem("UserDetail"))
    const [actiList,setActiList] = useState(null);
    
    if (appAuthProvider == null){
        setDefault()
        appAuthProvider = JSON.parse(localStorage.getItem("UserDetail"))
    }

    useEffect(async () => {
        Aos.init();
        if(appAuthProvider.isAuthenticated){
            let user_result = await axios.get(`https://wd0101.coe.psu.ac.th/api/whoami/`,
            {
              headers: {
                  'Authorization': `Bearer ${appAuthProvider.accessToken}`
              }
            })
            setActiList(user_result.data.activity_set)
        }
    }, [])

    function handleOpenPopup(){
        props.handleOpenPopup(props.cardDetail);
    }

    function handleOpenConfirmPopup(){
        props.handleOpenConfirmPopup(props.cardDetail);
    }

    const handleAlert = () => {
        alert("กรุณา Login ก่อนลงทะเบียน");
    }

    const card = (
        <React.Fragment>
            <CardMedia
                component="img"
                height="170"
                image={props.cardDetail.acti_image}
                alt="Loading"
            />
            <div 
                style={{
                    backgroundColor:'#7B68EE',
                    padding:'0px 0px 0px 280px',
                    }}>
                    <IconButton araia-aria-label='add to favorites'>
                        <FavoriteIcon />
                    </IconButton>
            </div>
            <CardActionArea onClick={handleOpenPopup}>
                <CardContent sx={{height:150,width:300, backgroundColor:'#6A5ACD'}}>
                    <Typography gutterBottom variant="h5" component="div" style={{color:"#ffffff"}}>
                        {props.cardDetail.topic}
                    </Typography>
                    <Typography variant="body2"
                                color="text.secondary"
                                sx={{mb:6.5}}
                                noWrap="false"
                                style={{color:"#ffffff"}}
                                >
                    รายละเอียด : {props.cardDetail.description}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Registered Number : {props.cardDetail.registered}/{props.cardDetail.member_limit}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {appAuthProvider.isAuthenticated ? (
                <div
                    style={{
                        backgroundColor:'#6A5ACD',
                        padding:'5px 0px 8px 200px',
                        }}>
                        <Button
                            onClick={handleOpenConfirmPopup}
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
            ):(
                <div
                    style={{
                        backgroundColor:'#6A5ACD',
                        padding:'5px 0px 8px 200px',
                        }}>
                        <Button
                            onClick={handleAlert}
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
            )}
            
        </React.Fragment>
    );



    return(
        <>
        <div className='card'>
            <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div data-aos="flip-left" data-aos-anchor-placement="center-bottom">
                {/* <Grid item xs={8}> */}
                    {/* <Card sx={{minHeight: 100, minWidth:100,maxHeight:450,maxWidth:350, mt:3, mb:3, mr:3,ml:3}}> */}
                    <Card className='card_inner' 
                    sx={{
                        minHeight: 100,
                        minWidth:100,
                        // height:380,
                        // width:300,
                        mt:3, mb:3, mr:3,ml:3}}>
                            {card}
                    </Card>
                </div>
            </div>
        </div>
        {/* </Grid> */}
        </>
    );
}
export default ActCard