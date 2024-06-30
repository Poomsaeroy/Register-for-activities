import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Grid, Avatar, createTheme, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import styles from '../components/CSS/menu_dis.css'
import ActDrawer from './act_drawer';
import { makeStyles } from '@material-ui/core';
import 'aos/dist/aos.css';
import Aos from 'aos';
import '../components/CSS/animate_card.css'
import { setDefault } from '../auth';


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
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

const themes = createTheme();

const useStyles = makeStyles({
  button: {
    backgroundColor: '#5558b6',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#a34040',
      color: '#fff',
    },
    '&.active': {
      backgroundColor: '#dd5757',
      color: '#fff',
    },
    fontSize:'1.2rem',
    '@media (min-width:600px)': {
      fontSize: '0.95rem',
    },
    [themes.breakpoints.up('md')]: {
      fontSize: '1.25rem',
    },
    borderRadius: 0,
}})


export default function ActMenuBar() {

  useEffect(() => {
    Aos.init();
  }, [])

  const classes = useStyles();
  const theme = useTheme();
  const appAuthProvider = JSON.parse(localStorage.getItem("UserDetail"))

  if (appAuthProvider == null){
    setDefault()
    appAuthProvider = JSON.parse(localStorage.getItem("UserDetail"))
  }

  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid data-aos='fade-down' container spacing={2}>
      <AppBar position="static" elevation={0}>
        <Toolbar style={{background:'#5558b6'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2,ml:2, mt:1.5 }}
          >
            <EmojiEmotionsIcon />
          </IconButton>

          {isMatch ? (
            <>
              <ActDrawer/>
            </>            
          ) : (
            <>
              <Button
                className={classes.button}
                disableRipple
                component={NavLink} to="/home/"
                sx={{ flexGrow: 1, pt:2 }}
                style={{maxWidth: '10em', maxHeight: '5em', minWidth: '10em', minHeight: '5em'}}>
                  <div className='textmenubar'>
                    Home
                  </div>
                  </Button>    
              <Button
                  className={classes.button}
                  disableRipple
                  component={NavLink} to="/check/"
                  sx={{ flexGrow: 1, pt:2 }}
                  style={{maxWidth: '10em', maxHeight: '5em', minWidth: '10em', minHeight: '5em'}}>
                    <div className='textmenubar'>
                      Check
                    </div>  
                  </Button>
              <Button
                className={classes.button}
                disableRipple
                component={NavLink} to="/contact/"
                sx={{ flexGrow: 1, pt:2}}
                style={{maxWidth: '10em', maxHeight: '5em', minWidth: '10em', minHeight: '5em'}}>
                <div className='textmenubar'>
                  Contact
                </div>
              </Button>

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
            </>
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
}