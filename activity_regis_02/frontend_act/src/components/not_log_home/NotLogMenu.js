import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Grid, Avatar, createTheme } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import styles from '../../components/CSS/menu_dis.css'
import { makeStyles } from '@material-ui/core';
import Login from '../Login/google_login';
import NotLogDrawer from './NotLogDrawer';
import 'aos/dist/aos.css';
import Aos from 'aos';
import '../CSS/animate_card.css'

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

export default function NotLogMenu() {

  useEffect(() => {
    Aos.init();
  }, [])

  const classes = useStyles();
  const theme = useTheme();
  // console.log("Menu Bar : ",theme);


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
              <NotLogDrawer/>
            </>            
          ) : (
            <>
              <Button
                className={classes.button}
                disableRipple
                component={NavLink} to="/"
                sx={{ flexGrow: 1, pt:2 }}
                style={{maxWidth: '10em', maxHeight: '5em', minWidth: '10em', minHeight: '5em'}}>
                <div className='textmenubar'>
                  Home
                </div>
              </Button>    

              <Button
                className={classes.button}
                disableRipple
                component={NavLink} to="/for_contact/"
                sx={{ flexGrow: 1, pt:2}}
                style={{maxWidth: '10em', maxHeight: '5em', minWidth: '10em', minHeight: '5em'}}>
                <div className='textmenubar'>
                  Contact
                </div>
              </Button>

              <div style={{flexGrow:1}}>

              </div>

              <Login sx/>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
}