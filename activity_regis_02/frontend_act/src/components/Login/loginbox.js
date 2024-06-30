import * as React from 'react';
import { Grid, Paper, Button, ButtonGroup, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import styles from '../CSS/login.css';
import { useState } from 'react';
import { createTheme } from '@mui/system';

const themes = createTheme();

// const useStyles = makeStyles({
//     login:
// })

export default function LoginBox() {
    var [loginwith, setLoginwith] = useState(0) // 0 = user, 1 = admin
    var [coloruser, setColoruser] = useState('primary')
    var [coloradmin, setColoradmin] = useState('secondary')
    var [Logstate, setLogstate] = useState('/login/')
    const ClickUser = () => {
        setLoginwith(0)
        setColoruser('primary')
        setColoradmin('secondary')
        setLogstate('/home/')
    }

    const ClickAdmin = () => {
        setLoginwith(1)
        setColoruser('secondary')
        setColoradmin('primary')
        setLogstate('/adminHome/')        
    }

    const inputcheck = () => {
        let inputuser = false
        let inputpass = false
        let user = document.getElementById('username').value
        let pass = document.getElementById('password').value
        if (user === '' || user == null){
            document.getElementById('userempty').innerHTML = 'Please, enter your username'
        }else{
            document.getElementById('userempty').innerHTML = ''
            inputuser = true
        }
        if (pass === '' || pass == null){
            document.getElementById('passempty').innerHTML = 'Please, enter your password'
        }else{
            document.getElementById('passempty').innerHTML = ''
            inputpass = true
        }
        if (inputuser == false || inputpass == false){
            setLogstate('/login/')
        }else{
            if (loginwith == 0){
                setLogstate('/home/')
            }else if (loginwith == 1){
                setLogstate('/adminHome/')
            }
        }
    }   

    const authCheck = () => {
        let user = document.getElementById('username').value
        let pass = document.getElementById('password').value
        if (user == 'user' && pass == 'pass'){
            alert('Login successed')
        }else{
            alert('Login Failed')
        }
    }

    

    return (
        <Grid>
            <Paper elevation={10} style={{
                padding :30,
                height :"60vh",
                width :400,
                margin :"75px auto",
                background: blue
            }}>
                <Grid className='center'>
                    <h3 className='ActivityRE'>Activity Registration<br/>ระบบการสมัครเข้าร่วมกิจกรรม</h3>
                    <ButtonGroup size='large' disableElevation variant="contained" fullWidth>
                        <Button id='admin' color={coloradmin} onClick={ClickAdmin} href="#admin_login">
                            Admin Login
                        </Button>
                        <Button id='user' color={coloruser} onClick={ClickUser} href="#user_login">
                            User Login
                        </Button>
                    </ButtonGroup>
                </Grid><br/>
                <Grid align='center'>
                    <div className='errormessage' id='userempty'></div>
                    <TextField placeholder='Enter Username' id="username" label="Username" variant="filled" fullWidth onKeyUp={inputcheck}/>
                    <div className='errormessage' id='passempty'></div>
                    <TextField placeholder='Enter Password' id="password" label="Password" type='password' variant="filled" fullWidth onKeyUp={inputcheck}/><br/>
                    <br/><Button id='Login_button' component={Link} to={Logstate} class='btn-submit ' disableElevation variant="contained" onClick={authCheck} disableRipple>Log in</Button>
                </Grid>
            </Paper>
        </Grid>
    );
}