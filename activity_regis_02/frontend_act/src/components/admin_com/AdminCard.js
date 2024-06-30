import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import '../../components/CSS/animate_card.css'

function AdminCard(props){
    useEffect(() => {
        Aos.init();
    }, [])

    function handleOpenPopup(){
        props.handleOpenPopup(props.cardDetail);
    }

    function handleOpenDeletePopup(){
        props.handleOpenDeletePopup(props.cardDetail);
    }

    const card = (
        <React.Fragment>
            <CardMedia
                component="img"
                height="190"
                image={props.cardDetail.acti_image}
                alt="Loading"
            />
            <CardActionArea onClick={handleOpenPopup}>
                <CardContent sx={{height:170,width:300, backgroundColor:'#6A5ACD'}}>
                    <Typography gutterBottom variant="h5" component="div" style={{color:"#ffffff"}}>
                        {props.cardDetail.topic}
                    </Typography>
                    <Typography variant="body2"
                                color="text.secondary"
                                sx={{mb:6.5}}
                                noWrap="false"
                                style={{color:"#ffffff"}}
                                >
                    รายละเอียด : {props.cardDetail.description}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Registered Number : {props.cardDetail.registered}/{props.cardDetail.member_limit}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div 
                style={{
                    backgroundColor:'#6A5ACD',
                    padding:'5px 0px 8px 200px',
                    }}>
                    <Button
                        onClick={handleOpenDeletePopup}
                        sx={{
                            backgroundColor:'#FF4A4A',
                            ':hover': {
                                bgcolor: '#C62929',
                                color: 'white',
                            },}}
                        variant="contained"
                        size="large">
                        ลบกิจกรรม
                    </Button>
            </div>
        </React.Fragment>
    );



    return(
        <>
        <div className='card'>
            <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div data-aos="flip-left" data-aos-anchor-placement="center-bottom">
                    <Card className='card_inner' 
                    sx={{
                        minHeight: 100,
                        minWidth:100,
                        width:332,
                        mt:3, mb:3, mr:3,ml:3}}>
                            {card}
                    </Card>
                </div>
            </div>
        </div>
        </>
    );
}
export default AdminCard