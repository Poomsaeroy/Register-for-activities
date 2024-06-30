import * as React from 'react';
import ActMenuBar from '../components/act_menu_bar';
import App from '../App.css';
import ActCheckDisplay from '../components/act_check_display/ActCheckDisplay';

function Check(){
    return(
        <div>
            <ActMenuBar/>
            <div className='home'>
                <h1>ตรวจสอบสิทธิ์กิจกรรมที่ได้ลงทะเบียน</h1>
            </div>
            <ActCheckDisplay/>
        </div>
    )
}

export default Check;