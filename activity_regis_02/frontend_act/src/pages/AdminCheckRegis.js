import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Card, CardContent, CardHeader, FormControl, Grid, IconButton, MenuItem, Paper, Select, Toolbar, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import ax from '../config/ax';
import UserCard from '../components/adminList/UserCard';
import ActAdminBar from './AdminBar';
import { appAuthProvider } from '../auth';
import 'aos/dist/aos.css';
import Aos from 'aos';
import axios from 'axios';

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash); //hash*(2**5) - hash
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function AdminCheckRegis() {
  useEffect(() => {
    Aos.init();
  })

  const [userProfile,setUserProfile] = useState([]);

  const [filter, setFilter] = useState({favorite: ""});
  const handleChangeFilter = (event) => {
    let f = {...filter}
    f[event.target.name] = event.target.value
    setFilter(f)
};

  const id = window.location.href.slice(-1)

  useEffect(async () => {
    let result = await axios.get(`https://wd0101.coe.psu.ac.th/api/show-who-register/${id}/`)
    if(result){
      setUserProfile(result.data)
    }
  }, []);


  return (
    <div>
      <Grid container spacing={2}>
        <AppBar data-aos="fade-down" position="static">
          <Toolbar style={{background:'#5558b6'}}>
          <IconButton
              component={Link} to="/adminList/"
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2,ml:2, mt:1.5 }}
            >
              <ArrowBackIosIcon sx={{height:'8.5vh',width:'100%'}} />
            </IconButton>

            <div style={{flexGrow:1}}>

            </div>

            <Typography sx={{mt:1}}>
                Hello, {appAuthProvider.user_name}
              </Typography>

            <IconButton
              component={Link} to="/profile/"
              size="large"
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-hashpop="true"
              align='right'
              sx={{mt:1.5}}
            >
              <Avatar {...stringAvatar('User Tester')} src={appAuthProvider.google_image}></Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>


        <ActAdminBar/>



        <Grid container sx={{mt:2}}>
          <Grid data-aos="fade-right" item xs>
            <FormControl sx={{ ml: 3, minWidth: 120 }}>
                <Select value={filter.favorite}
                    onChange={handleChangeFilter}
                    displayEmpty>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={10}>ชาย</MenuItem>
                        <MenuItem value={20}>หญิง</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid data-aos="fade-up" item xs>
            <Typography variant='h4'>
              ผู้ลงทะเบียนกิจกรรม
            </Typography>
          </Grid>  
        </Grid>
        

        <Grid data-aos="fade-up" sx={{mt:'1%'}}>
            {(userProfile.map(r => <UserCard userData = {r}/>))}
        </Grid>


        <Grid data-aos="fade-up" container sx={{ml:'55%',mt:'2%'}}>
          <Grid item sx={{mr:'5%'}}>
            <Button
              variant="contained"
              sx={{
                width:'20vw'
              }}>
                บันทึก
            </Button>
          </Grid>
          <Grid item>
            <Button variant="text">
              ยกเลิก
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </div>
  )
}

export default AdminCheckRegis