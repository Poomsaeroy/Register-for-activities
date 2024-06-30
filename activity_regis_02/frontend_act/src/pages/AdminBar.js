import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Card, CardContent, CardHeader, FormControl, Grid, IconButton, MenuItem, Paper, Select, Toolbar, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import ax from '../config/ax';
import UserCard from '../components/adminList/UserCard';
import axios from 'axios';
import 'aos/dist/aos.css';
import Aos from 'aos';

function ActAdminBar(){

    const [activitysdata, setActivitysdata] = useState([])
    const id = window.location.href.slice(-1)
    const Act_Get = async () => {
        const response = await axios.get("https://wd0101.coe.psu.ac.th/api/activity/")
        console.log('test res',response.data.results[id])
        setActivitysdata(response.data.results[id-1])
        console.log('test id',window.location.href.slice(-1))
    }

    useEffect(() => {
      Aos.init();
    })

    useEffect(() => {
      Act_Get()
    }, []);
    
    const act_admin_bar = (
      <>
        <Card data-aos='fade-up' key={activitysdata.id} sx={{width:'100%'}}>
              <CardHeader title="หัวข้อกิจกรรม" titleTypographyProps={{variant:'h4' }} style={{backgroundColor: "#fabca4" ,textAlign: 'center' }}/>
              <Typography variant='h5' align='center' style={{backgroundColor: "#fabca4"}}>
                  {activitysdata.topic}
              </Typography>
              <CardContent style={{backgroundColor: "#fabca4"}} >
                <Grid container>
                  <Grid item xs>
                    <Typography sx={{ml:'2%'}}>
                      วันลงทะเบียน : {activitysdata.start_regis}
                    </Typography>
                    <Typography sx={{ml:'2%'}}>
                      วันจัดกิจกรรม : {activitysdata.start_act}
                    </Typography>
                    <Typography sx={{ml:'2%'}}>
                      สถานที่จัด : {activitysdata.act_place}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography sx={{ml:'2%'}}>
                      รายละเอียดกิจกรรม : {activitysdata.description}
                    </Typography>
                    <Typography sx={{ml:'2%'}}>
                      รูปแบบการจัดกิจกรรม : {activitysdata.regis_type}
                    </Typography>
                    <Typography sx={{ml:'2%'}}>
                      จำนวนผู้ลงทะเบียน : {activitysdata.registered} / {activitysdata.member_limit}
                    </Typography>  
                  </Grid>
                </Grid>
              </CardContent>
          </Card>
      </>
    );

  return (
    <>
        {act_admin_bar}
    </>
    )
}


export default ActAdminBar