import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminCheckRegis from '../../pages/AdminCheckRegis'

function ActList(props) {
        const [UserData, setUserData] = useState([])
        const [idData, setIdData] = useState([])

        useEffect(() => {
            User_Get()
        }, []);
    
        const User_Get = async () => {
            let result = await axios.get('https://wd0101.coe.psu.ac.th/api/normal_user/')
        }

        const Clicked = () => {
            let IdAct = document.getElementById(props.userResult.id).id
            console.log(IdAct)
        }

        const act_bar = (
            <>
                {/* <CardActionArea> */}
                {/* <CardMedia
                    component="img"
                    height="140"
                    image={props.userResult.acti_image}
                    alt="Loading"
                /> */}
                {/* <CardActionArea onClick={handleOpenPopup}> */}
                    <CardContent sx={{height:'9h',width:'96.4vw'}} style={{backgroundColor: "#fabca4"}}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar src={props.userResult.acti_image}>Loading</Avatar>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap>หัวข้อ : {props.userResult.topic}</Typography>
                        </Grid>
                        <Grid item xs zeroMinWidth noWrap="false">
                            <Typography noWrap>รายละเอียด : {props.userResult.description}</Typography>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography variant="subtitle2" color="text.secondary">
                                จำนวนคนสมัคร : {props.userResult.registered} / {props.userResult.member_limit}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                id={props.userResult.id}
                                component={Link}
                                variant="contained"
                                color="success"
                                onClick={Clicked}
                                to={"/adminCheckRegis/"+props.userResult.id}>
                                    ดูสมาชิก
                            </Button>
                        </Grid>

                    </Grid>
                    </CardContent>
            </>
        );

        return (
            <div>
                <Card
                sx= {{
                    minHeight: 100,
                    minWidth:100,
                    // height:380,
                    // width:300,
                    pt:1.5,
                    mt:1.5, mb:1.5, mr:1.5,ml:1.5}}>
                            {act_bar}
                </Card>
            </div>
        )
    }

    export default ActList