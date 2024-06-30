import * as React from "react";
import { useEffect } from "react";
import ActMenuBar from "../components/act_menu_bar";
import "../components/CSS/contact.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import 'aos/dist/aos.css';
import Aos from 'aos';

function Contact() {
    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <div>
            <ActMenuBar/>
        <div className="contact">
            <h1> ผู้ดูแลเว็บไซต์ </h1>
        </div>
            <div class="colum">
                <div>
                    <div className='text'>
                        <Card data-aos='fade-up' sx={{ mx:'auto', my:3 ,maxWidth: 700 }}>
                            <CardMedia 
                            component="img"
                            height="450"
                            image="/img/056.jpg"
                            
                            />
                            <CardContent style={{backgroundColor: "#fff08e"}} >
                                <Typography gutterBottom variant="h5" component="div">
                                    นางสาวคุณัญญา ศรีนงค์นุช 
                                </Typography>
                                <Typography variant="body2" >
                                    <p>Line : muk2900  </p>
                                    <p>Facebook : คุณัญญา ศรีนงค์นุช</p>
                                    <p>เบอร์ติดต่อ : 092-228-1036</p>
                                </Typography>
                                <CardActions>
                                
                                </CardActions>
                            </CardContent>  
                        </Card>
                    <Card data-aos='fade-up' sx={{ mx:'auto', my:3 ,maxWidth: 700 }}>
                        <CardMedia 
                          component="img"
                          height="450"
                          image="/img/110.jpg"
                          
                        />
                        <CardContent style={{backgroundColor: "#fff08e"}}>
                            <Typography gutterBottom variant="h5" component="div">
                                นายโชคกันตวิชญ์ เภรี
                            </Typography>
                            <Typography variant="body2" >
                                <p>Line : 0952588848</p>
                                <p>Facebook : Chokkantawich Pheree</p>
                                <p>เบอร์ติดต่อ :  095-258-8848</p>
                            </Typography>
                            <CardActions>
                               
                            </CardActions>
                        </CardContent>  
                    </Card>

                    <Card data-aos='fade-up' sx={{ mx:'auto', my:3 ,maxWidth: 700 }}>
                        <CardMedia 
                          component="img"
                          height="450"
                          image="/img/325.jpg"
                          
                        />
                        <CardContent style={{backgroundColor: "#fff08e"}} >
                            <Typography gutterBottom variant="h5" component="div">
                                นายปาณัทพงษ์ จรประดิษฐ
                            </Typography>
                            <Typography variant="body2" >
                                <p>Line : aofstopper</p>
                                <p>Facebook : Panatthapong Jornpradit</p>
                                <p>เบอร์ติดต่อ : 093-629-1671</p>
                            </Typography>
                            <CardActions>
                               
                            </CardActions>
                        </CardContent>  
                    </Card>

                    <Card data-aos='fade-up' sx={{ mx:'auto', my:3 ,maxWidth: 700 }}>
                            <CardMedia 
                            component="img"
                            height="450"
                            image="/img/338.jpg"
                            
                            />
                            <CardContent style={{backgroundColor: "#fff08e"}} >
                                <Typography gutterBottom variant="h5" component="div">
                                    นายพงศภัค จุนณศักดิ์ศรี
                                </Typography>
                                <Typography variant="body2" >
                                    <p>Line : pong_au123</p>
                                    <p>Facebook : Pongsapak JS</p>
                                    <p>เบอร์ติดต่อ :  098-025-0895</p>
                                </Typography>
                                <CardActions>
                                
                                </CardActions>
                            </CardContent>  
                        </Card>

                        <Card data-aos='fade-up' sx={{ mx:'auto', my:3 ,maxWidth: 700 }}>
                            <CardMedia 
                            component="img"
                            height="450"
                            image="/img/399.jpg"
                            
                            />
                            <CardContent style={{backgroundColor: "#fff08e"}} >
                                <Typography gutterBottom variant="h5" component="div">
                                    นายภูมิ พรหมเสนา
                                </Typography>
                                <Typography variant="body2" >
                                    <p>Line : poompromsena</p>
                                    <p>Facebook : Poom Promsena</p>
                                    <p>เบอร์ติดต่อ : 095-015-9134</p>
                                </Typography>
                                <CardActions>
                                
                                </CardActions>
                            </CardContent>  
                        </Card>

                        <Card data-aos='fade-up' sx={{ mx:'auto', my:3 ,maxWidth: 700 }}>
                            <CardMedia 
                            component="img"
                            height="450"
                            image="/img/518.jpg"
                            
                            />
                            <CardContent style={{backgroundColor: "#fff08e"}} >
                                <Typography gutterBottom variant="h5" component="div">
                                    นายสรทรัพย์ ลีลาตังวัฒน์
                                </Typography>
                                <Typography variant="body2" >
                                    <p>Line : poohpoohbra</p>
                                    <p>Facebook : สรทรัพย์ ลีลาตังวัฒน์</p>
                                    <p>เบอร์ติดต่อ : 092-616-6651</p>
                                </Typography>
                                <CardActions>
                                
                                </CardActions>
                            </CardContent>  
                        </Card>
                    
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Contact;