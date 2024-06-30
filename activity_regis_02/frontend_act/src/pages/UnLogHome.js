import React from 'react'
import NotLogDisplayArea from '../components/not_log_home/NotLogDisplay'
import NotLogMenu from '../components/not_log_home/NotLogMenu'

function UnLogHome() {
  return (
    <div>
        <NotLogMenu/>
        <div className='center'>
                <div className='home'>
                    <h1>กิจกรรมทั้งหมด</h1>  
                </div>  
            </div>
        <NotLogDisplayArea/>
    </div>
  )
}

export default UnLogHome