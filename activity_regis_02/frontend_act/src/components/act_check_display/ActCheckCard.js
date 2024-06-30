import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import config from '../../config';

function ActCheckCard(props) {
    useEffect(() => {
        Aos.init();
    }, [])

    function handleOpenPopup(){
        props.handleOpenPopup(props.userResult);
    }

    function handleOpenCancelPopup(){
        props.handleOpenCancelPopup(props.userResult);
    }

    console.log("CHECK CARD DATA",props.userResult)

    const card = (
        <React.Fragment>
            <CardActionArea onClick={handleOpenPopup}>
            <CardMedia
                component="img"
                height="180"
                image={`https://wd0101.coe.psu.ac.th`+props.userResult.acti_image}
                alt="Loading"
            />
                <CardContent sx={{height:180,width:300,backgroundColor:'#7B68EE'}}>
                    <Typography gutterBottom variant="h5" component="div" style={{color:"#FFD700"}}>
                        {props.userResult.topic}
                    </Typography>
                    <Typography variant="body2"
                                color="text.secondary"
                                sx={{mb:3}}
                                noWrap="false"
                                style={{color:"#ffffff"}}
                                >
                    รายละเอียด : {props.userResult.description}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" style={{color:"#ffffff"}}>
                        ผลการลงทะเบียน
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        คุณมีสิทธิ์เข้าร่วม !!
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div 
                style={{
                    backgroundColor:'#7B68EE',
                    padding:'5px 0px 8px 200px',
                    }}>
                    <Button
                        onClick={handleOpenCancelPopup}
                        sx={{
                            backgroundColor:'#FF4A4A',
                            ':hover': {
                                bgcolor: '#C62929',
                                color: 'white',
                            },}}
                        variant="contained"
                        size="large">
                        สละสิทธิ์
                    </Button>
            </div>
        </React.Fragment>
    );

  return (
    <div className='card'>
        <div data-aos="flip-right" data-aos-anchor-placement="center-bottom">
            <div data-aos="zoom-out-down" data-aos-anchor-placement="center-bottom">
                <Card className='card_inner'
                    sx={{
                        minHeight: 100,
                        minWidth:100,
                        mt:3, mb:3, mr:3,ml:3}}>
                            {card}
                </Card>
            </div>
        </div>
    </div>
  )
}

export default ActCheckCard