import { Grid } from '@mui/material';
import * as React from 'react';
import ActDisplayArea from '../components/act_display_area';
import ActMenuBar from '../components/act_menu_bar';
import styles from '../components/CSS/home.css'

function Home(){
    return(
        <div>    
            <ActMenuBar/>
            <div className='center'>
                <div className='home'>
                    <h1>กิจกรรมทั้งหมด</h1>  
                </div>  
            </div>
            <ActDisplayArea/>          
        </div>
    )
}

export default Home;