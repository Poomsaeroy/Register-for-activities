import { Grid } from '@mui/material';
import * as React from 'react';
import ActDisplayArea from '../components/act_display_area';
import ActMenuBar from '../components/act_menu_bar';
import AdminDisplayArea from '../components/admin_com/admin_display_area';
import AdminActMenuBar from '../components/admin_com/admin_menu';
import styles from '../components/CSS/home.css'

function AdminHome(){
    return(
        <div>    
            <AdminActMenuBar/>
            <div className='center'>
                <div className='home'>
                    <h1>กิจกรรมทั้งหมด (ฝั่งแอดมิน) adminHome</h1>  
                </div>  
            </div>
            <AdminDisplayArea/>
        </div>
    )
}

export default AdminHome;