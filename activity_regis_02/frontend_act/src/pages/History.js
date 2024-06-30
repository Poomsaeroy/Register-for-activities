import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function History() {
    return (
        
            <div>
                <Card sx= {{
                    color:"#fbd5c0",
                    minHeight: 600,
                    minWidth:200,
                    height:300,
                     width:300,
                    pt:1.5,
                    mt:1.5, mb:1.5, mr:1.5,ml:1.5,mx:'auto', my:3 }}
                    
                    style={{ backgroundColor: "#bb3347" }}
                    >
      <CardMedia
        component="img"
        image="/img/3.png"
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">กิจกรรมเข้าพรรษา</Typography>
        <Typography gutterBottom variant="h7" component="div">วันลงทะเบียน: 19 มกราคม 2565 - 30 มกราคม 2565 </Typography>
        <Typography gutterBottom variant="h7" component="div">วันลงทะเบียน: 4 กุมพาพันธ์ 2565 </Typography>
        <Typography gutterBottom variant="h7" component="div">เวลา: 9.00 น. -15.00 น.  </Typography>
        <Typography gutterBottom variant="h7" component="div"> สถานที่จัด:มอ. </Typography>
        <Typography gutterBottom variant="h7" component="div"> รายละเอียดของกิจกรรม: -  </Typography>
        --------------------------------------
        <Typography gutterBottom variant="h7" component="div"> จำนวนคนลงทะเบียน: 98   </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to="/Profile/" variant="contained" sx={{mx: "auto"}}>แบบประเมินกิจกรรม</Button>
        <Button component={Link} to="/Profile/" variant="contained" sx={{mx: "auto"}}>ย้อนกลับ</Button>
      </CardActions>
    </Card>
            
    </div>
     )
}