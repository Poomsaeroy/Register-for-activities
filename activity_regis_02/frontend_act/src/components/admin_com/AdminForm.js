import { Button, Card, CardActionArea, CardMedia, createTheme, Grid, Typography, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Control } from '../control/Control'; 
import { useForm, Form } from './admin_use_form';
import {  useMediaQuery } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import ResponsiveTimePickers from './AdminTimePick';
import ResponsiveDateTimeRange from './AdminDateTime';
import { makeStyles } from '@material-ui/core';
import ax from '../../config/ax';
import axios from 'axios';
import config from '../../config';


const initialFValues = {
    topic:'',
    description:'',
    act_place:'',

    regis_type:'1',
    regis_date:'',
    act_date:'',

    member_limit:'0',
    feedback_link:'',
}

const themes = createTheme();

const RegisType = [
    { id: 1, title: 'First Come First Serve'},
    { id: 2, title: 'Candidate'},
]

function AdminForm(props) {


    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSubmitValue = async () => {
        await axios.post(`https://wd0101.coe.psu.ac.th/api/activity/`,values)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            if (error.response){
                console.log("RESPONSE ERROR",error.response)
            }else if(error.request){
                console.log("REQUEST ERROR",error.request)
            }else if(error.message){
                console.log("MESSAGE ERROR",error.message)
                }
        })
        props.handleClosePopup();
        alert("Submit ข้อมูลเรียบร้อย");
    };
    const handleUpdateValue = async () => {
        await axios.put(`${config.serverUrlPrefix}/api/activity/${props.activity.id}/`,values)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            if (error.response){
                console.log("RESPONSE ERROR",error.response)
            }else if(error.request){
                console.log("REQUEST ERROR",error.request)
            }else if(error.message){
                console.log("MESSAGE ERROR",error.message)
                }
        })
        props.handleClosePopup();
        alert("Update ข้อมูลเรียบร้อย");
    }

    class UpLoadImage extends React.Component{

    }

    const [images, setImages] = useState([])
    const [imageURL, setImageURL] = useState([])

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURL(newImageUrls);
        values.acti_image = images
        if (props.activity){
            props.activity.acti_image = imageURL[0]
        }
    }, [images]);

    const imgChange = (event) => {
        setImages([...event.target.files]);
    }

    const{
        values,
        setValues,
        handleInputChange,
        topic_valid,
        des_valid,
        place_valid,
        num_valid,
        regis_valid,
        act_valid
    } = useForm(initialFValues);

    let form_valid = topic_valid && des_valid && place_valid && num_valid && regis_valid && act_valid


    console.log("VALUES :",values)

    if (props.activity){
        return(
            <>
                <Form >
                    {isMatch ? (


                        //!! สำหรับโทศับ


                    <Grid item xs={12}
                        alignItems="center">
                        <Control.Input
                            name="topic"
                            label="หัวข้อกิจกรรม"
                            defaultValue={props.activity.topic}
                            onChange = {handleInputChange}/>
                        <TextField
                            variant="outlined"
                            label="รายละเอียดกิจกรรม"
                            name="description"
                            defaultValue={props.activity.description}
                            onChange={handleInputChange}
                            multiline
                            rows={8}/>
                        <Control.Input
                            name="act_place"
                            label="สถานที่จัดกิจกรรม"
                            defaultValue={props.activity.act_place}
                            onChange = {handleInputChange}/>
                        <Typography sx={{ml:2}}>
                                แบบฟอร์มรายละเอียดเวลา
                        </Typography>
                        <TextField
                            variant="outlined"
                            label="วันเริ่มต้น-สิ้นสุดกิจกรรม"
                            name="act_date"
                            defaultValue={props.activity.act_date}
                            onChange={handleInputChange}/>
                        <TextField
                            variant="outlined"
                            label="วันเริ่มต้น - สิ้นสุดลงทะเบียน"
                            name="regis_date"
                            defaultValue={props.activity.regis_date}
                            onChange={handleInputChange}/>
                            <div>
                                <Card
                                    sx={{
                                        mt:'10px',
                                        ml:'25%',
                                        mb:'10px',
                                        height:'50%',
                                        width:'50%',
                                        minHeight:'100px',
                                        minWidth:'100px'}}>
                                    <CardActionArea>
                                        <CardMedia
                                            name='acti_image'
                                            component="img"
                                            image={props.activity.acti_image}
                                            onChange={handleInputChange}
                                            value={values.acti_image}
                                            alt="Loading">
                                        </CardMedia>
                                    </CardActionArea>
                                </Card>
                                <input accept="image/*" type='file' id='pre_image' onChange={imgChange}/>
                                <Control.Input
                                    name="feedback_link"
                                    label="แนบแบบประเมิน"
                                    value={values.feedback_link}
                                    onChange = {handleInputChange}/>
                                <Control.RadioRegis
                                    label="รูปแบบการจัดกิจกรรม"
                                    name="regis_type"
                                    value={values.regis_type}
                                    onChange={handleInputChange}
                                    items={RegisType}/>
                                <TextField
                                    id="outlined-number"
                                    name="member_limit"
                                    label="จำนวนผู้สมัครสูงสุด"
                                    type="number"
                                    defaultValue={props.activity.member_limit}
                                    onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}/>
                                {form_valid ? (
                                    <Button
                                        sx={{ml:1,mr:2,mt:4,
                                            backgroundColor:'#6A5ACD',
                                            ':hover': {
                                                bgcolor: '#4B0082',
                                                color: 'white',
                                            },}}
                                        variant="contained"
                                        onClick={handleUpdateValue}
                                        size="large">
                                        Submit
                                    </Button>
                                ) : (
                                    <Button
                                        sx={{ml:1,mr:2,mt:4,
                                            backgroundColor:'#6A5ACD',
                                            ':hover': {
                                                bgcolor: '#4B0082',
                                                color: 'white',
                                            },}}
                                        variant="contained"
                                        size="large"
                                        disabled>
                                        Submit
                                    </Button>
                                )}
                                <Button
                                    sx={{mt:4}}
                                    onClick={props.handleClosePopup}
                                    variant="outlined"
                                    size="large">
                                    Cancel
                                </Button>
                                {topic_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:2}} color="red">
                                        * กรุณากรอกชื่อกิจกรรม
                                    </Typography>
                                )}
                                {des_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกรายละเอียดกิจกรรม
                                    </Typography>
                                )}
                                {place_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกสถานที่จัดกิจกรรม
                                    </Typography>
                                )}
                                {regis_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณาระบุเวลาลงทะเบียนกิจกรรม
                                    </Typography>
                                )}
                                {act_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณาระบุเวลาเริ่มต้น-สิ้นสุดกิจกรรม
                                    </Typography>
                                )}
                                {num_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกเลขจำนวนเต็มบวกในช่องสมาชิก
                                    </Typography>
                                )}
                            </div>
                    </Grid>
                    ) : (


                        //!! สำหรับคอม



                    <Grid container>
                        <Grid item xs={6}>
                            <Control.Input
                                name="topic"
                                label="หัวข้อกิจกรรม"
                                defaultValue={props.activity.topic}
                                onChange = {handleInputChange}/>
                            <TextField
                                variant="outlined"
                                label="รายละเอียดกิจกรรม"
                                name="description"
                                onChange={handleInputChange}
                                defaultValue={props.activity.description}
                                multiline
                                rows={8}/>
                            <Control.Input
                                name="act_place"
                                label="สถานที่จัดกิจกรรม"
                                defaultValue={props.activity.act_place}
                                onChange = {handleInputChange}/>
                                <Control.RadioRegis
                                    label="รูปแบบการจัดกิจกรรม"
                                    name="regis_type"
                                    defaultValue={props.activity.regis_type}
                                    onChange={handleInputChange}
                                    items={RegisType}/>
                                <TextField
                                    id="outlined-number"
                                    name="member_limit"
                                    label="จำนวนผู้สมัครสูงสุด"
                                    type="number"
                                    defaultValue={props.activity.member_limit}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}/>
                        </Grid>
                        <Grid item xs={6}>
                            <div>
                                <Card
                                    sx={{
                                        mt:'10px',
                                        ml:'25%',
                                        mb:'10px',
                                        height:'50%',
                                        width:'50%',
                                        minHeight:'100px',
                                        minWidth:'100px'}}>
                                    <CardActionArea>
                                        <CardMedia
                                            name='acti_image'
                                            component="img"
                                            image={props.activity.acti_image}
                                            onChange={handleInputChange}
                                            value={values.acti_image}
                                            alt="Loading">
                                        </CardMedia>
                                    </CardActionArea>
                                </Card>
                                <input accept="image/*" type='file' id='pre_image' onChange={imgChange}/>
                                <Typography sx={{ml:2}}>
                                    แบบฟอร์มรายละเอียดเวลา
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    label="วันเริ่มต้น-สิ้นสุดกิจกรรม"
                                    name="act_date"
                                    defaultValue={props.activity.act_date}
                                    onChange={handleInputChange}/>
                                <TextField
                                    variant="outlined"
                                    label="วันเริ่มต้น - สิ้นสุดลงทะเบียน"
                                    name="regis_date"
                                    defaultValue={props.activity.regis_date}
                                    onChange={handleInputChange}/>
                                <Control.Input
                                    name="feedback_link"
                                    label="แนบแบบประเมิน"
                                    defaultValue={props.activity.feedback_link}
                                    onChange = {handleInputChange}/>
                                {form_valid ? (
                                    <Button
                                        sx={{ml:1,mr:2,mt:4,
                                            backgroundColor:'#6A5ACD',
                                            ':hover': {
                                                bgcolor: '#4B0082',
                                                color: 'white',
                                            },}}
                                        variant="contained"
                                        onClick={handleUpdateValue}
                                        size="large">
                                        UPDATE
                                    </Button>
                                ) : (
                                    <Button
                                        sx={{ml:1,mr:2,mt:4,
                                            backgroundColor:'#6A5ACD',
                                            ':hover': {
                                                bgcolor: '#4B0082',
                                                color: 'white',
                                            },}}
                                        variant="contained"
                                        size="large"
                                        disabled>
                                        UPDATE
                                    </Button>
                                )}
                                <Button
                                    sx = {{mt:4,
                                        "&.MuiButton-text": { color: "#DC143C" },
                                    }}
                                    onClick={props.handleClosePopup}
                                    variant="text"
                                    size="large">
                                    Cancel
                                </Button>
                                {topic_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:2}} color="red">
                                        * กรุณากรอกชื่อกิจกรรม
                                    </Typography>
                                )}
                                {des_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกรายละเอียดกิจกรรม
                                    </Typography>
                                )}
                                {place_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกสถานที่จัดกิจกรรม
                                    </Typography>
                                )}
                                {regis_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณาระบุเวลาลงทะเบียนกิจกรรม
                                    </Typography>
                                )}
                                {act_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณาระบุเวลาเริ่มต้น-สิ้นสุดกิจกรรม
                                    </Typography>
                                )}
                                {num_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกเลขจำนวนเต็มบวกในช่องสมาชิก
                                    </Typography>
                                )}                      
                            </div>
                        </Grid>
                    </Grid>
                    )}
                </Form>
            </>
        )
    } else {
        return (



            //! ไม่พบข้อมูล


            <>
                <Form >
                    {isMatch ? (
                    <Grid item xs={12}
                        alignItems="center">
                        <Control.Input
                            name="topic"
                            label="หัวข้อกิจกรรม"
                            value={values.topic}
                            onChange = {handleInputChange}/>
                        <TextField
                            variant="outlined"
                            label="รายละเอียดกิจกรรม"
                            name="description"
                            value={values.description}
                            onChange={handleInputChange}
                            multiline
                            rows={8}/>
                        <Control.Input
                            name="act_place"
                            label="สถานที่จัดกิจกรรม"
                            value={values.act_place}
                            onChange = {handleInputChange}/>
                            <Typography sx={{ml:2}}>
                                    แบบฟอร์มรายละเอียดเวลา
                            </Typography>
                            <TextField
                                variant="outlined"
                                label="วันเริ่มต้น-สิ้นสุดกิจกรรม"
                                name="act_date"
                                defaultValue={values.act_date}
                                onChange={handleInputChange}/>
                            <TextField
                                variant="outlined"
                                label="วันเริ่มต้น - สิ้นสุดลงทะเบียน"
                                name="regis_date"
                                defaultValue={values.regis_date}
                                onChange={handleInputChange}/>
                            {/* <ResponsiveDateTimeRange
                                name="start_act"
                                startText="วันเริ่มต้นกิจกรรม"
                                endText="วันสิ้นสุดกิจกรรม"
                                value={values.start_act}
                                onChange={handleInputChange}/>
                            <ResponsiveTimePickers
                                name="start_act_time"
                                label="เวลาเริ่มกิจกรรม"
                                value={values.start_act_time}
                                onChange={handleInputChange}/>
                            <ResponsiveTimePickers 
                                name="end_act_time"
                                label="เวลาสิ้นสุดกิจกรรม"
                                value={values.end_act_time}
                                onChange={handleInputChange}/>                        */}
                            <div>
                                <Card
                                    sx={{
                                        mt:'10px',
                                        ml:'25%',
                                        mb:'10px',
                                        height:'50%',
                                        width:'50%',
                                        minHeight:'100px',
                                        minWidth:'100px'}}>
                                    <CardActionArea>
                                        <CardMedia
                                            name='acti_image'
                                            component="img"
                                            image={imageURL}
                                            onChange={handleInputChange}
                                            value={values.acti_image}
                                            // image="../../media/clickHereToUP.jpg"
                                            alt="Loading">
                                        </CardMedia>
                                    </CardActionArea>
                                </Card>
                                <input accept="image/*" type='file' id='pre_image' onChange={imgChange}/>
                                {/* <ResponsiveDateTimeRange
                                    name="start_regis"
                                    startText="วันเริ่มต้นลงทะเบียน"
                                    endText="วันสิ้นสุดลงทะเบียน"
                                    value={values.start_regis}/>
                                    onChange={handleInputChange}/>
                                <ResponsiveTimePickers
                                    name="start_regis_time"
                                    label="เวลาเริ่มลงทะเบียน"
                                    value={values.start_regis_time}
                                    onChange={handleInputChange}/>
                                <ResponsiveTimePickers 
                                    name="end_regis_time"
                                    label="เวลาสิ้นสุดลงทะเบียน"
                                    value={values.end_regis_time}
                                    onChange={handleInputChange}/>  */}
                                <Control.Input
                                    name="feedback_link"
                                    label="แนบแบบประเมิน"
                                    value={values.feedback_link}
                                    onChange = {handleInputChange}/>
                                <Control.RadioRegis
                                    label="รูปแบบการจัดกิจกรรม"
                                    name="regis_type"
                                    value={values.regis_type}
                                    onChange={handleInputChange}
                                    items={RegisType}/>
                                <TextField
                                    id="outlined-number"
                                    name="member_limit"
                                    label="จำนวนผู้สมัครสูงสุด"
                                    type="number"
                                    value={values.member_limit}
                                    onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}/>
                                {form_valid ? (
                                    <Button
                                        sx={{ml:1,mr:2,mt:4,
                                            backgroundColor:'#6A5ACD',
                                            ':hover': {
                                                bgcolor: '#4B0082',
                                                color: 'white',
                                            },}}
                                        variant="contained"
                                        onClick={handleSubmitValue}
                                        size="large">
                                        Submit
                                    </Button>
                                ) : (
                                    <Button
                                        sx={{ml:1,mr:2,mt:4,
                                            backgroundColor:'#6A5ACD',
                                            ':hover': {
                                                bgcolor: '#4B0082',
                                                color: 'white',
                                            },}}
                                        variant="contained"
                                        onClick={handleSubmitValue}
                                        size="large"
                                        disabled>
                                        Submit
                                    </Button>
                                )}
                                <Button
                                    sx={{mt:4}}
                                    onClick={props.handleCloseNewPopup}
                                    variant="outlined"
                                    size="large">
                                    Cancel
                                </Button>
                                {topic_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:2}} color="red">
                                        * กรุณากรอกชื่อกิจกรรม
                                    </Typography>
                                )}
                                {des_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกรายละเอียดกิจกรรม
                                    </Typography>
                                )}
                                {place_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกสถานที่จัดกิจกรรม
                                    </Typography>
                                )}
                                {regis_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณาระบุเวลาลงทะเบียนกิจกรรม
                                    </Typography>
                                )}
                                {act_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณาระบุเวลาเริ่มต้น-สิ้นสุดกิจกรรม
                                    </Typography>
                                )}
                                {/* {pic_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณา Upload รูปกิจกรรม
                                    </Typography>
                                )} */}
                                {num_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกเลขจำนวนเต็มบวกในช่องสมาชิก
                                    </Typography>
                                )}
                            </div>
                    </Grid>
                    ) : (
                    <Grid container>
                        <Grid item xs={6}>
                            <Control.Input
                                name="topic"
                                label="หัวข้อกิจกรรม"
                                value={values.topic}
                                onChange = {handleInputChange}/>
                            <TextField
                                variant="outlined"
                                label="รายละเอียดกิจกรรม"
                                name="description"
                                value={values.description}
                                onChange={handleInputChange}
                                multiline
                                rows={8}/>
                            <Control.Input
                                name="act_place"
                                label="สถานที่จัดกิจกรรม"
                                value={values.act_place}
                                onChange = {handleInputChange}/>
                                {/* <ResponsiveDateTimeRange
                                    name="start_act"
                                    startText="วันเริ่มต้นกิจกรรม"
                                    endText="วันสิ้นสุดกิจกรรม"
                                    value={values.start_act}/>
                                    onChange={handleInputChange}/>
                                <ResponsiveTimePickers
                                    name="start_act_time"
                                    label="เวลาเริ่มกิจกรรม"
                                    value={values.start_act_time}
                                    onChange={handleInputChange}/>
                                <ResponsiveTimePickers 
                                    name="end_act_time"
                                    label="เวลาสิ้นสุดกิจกรรม"
                                    value={values.end_act_time}
                                    onChange={handleInputChange}/>                        */}
                                <Control.RadioRegis
                                    label="รูปแบบการจัดกิจกรรม"
                                    name="regis_type"
                                    value={values.regis_type}
                                    onChange={handleInputChange}
                                    items={RegisType}/>
                                <TextField
                                    id="outlined-number"
                                    name="member_limit"
                                    label="จำนวนผู้สมัครสูงสุด"
                                    type="number"
                                    value={values.member_limit}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}/>
                        </Grid>
                        <Grid item xs={6}>
                            <div>
                                <Card
                                    sx={{
                                        mt:'10px',
                                        ml:'25%',
                                        mb:'10px',
                                        height:'50%',
                                        width:'50%',
                                        minHeight:'100px',
                                        minWidth:'100px'}}>
                                    <CardActionArea>
                                        <CardMedia
                                            name='acti_image'
                                            component="img"
                                            src={imageURL}
                                            value={values.acti_image}
                                            onChange={handleInputChange}
                                            // image="../../media/clickHereToUP.jpg"
                                            alt="Loading...">
                                        </CardMedia>
                                    </CardActionArea>
                                </Card>
                                <input accept="image/*" type='file' id='pre_image' onChange={imgChange}/>
                                <Typography sx={{ml:2}}>
                                    แบบฟอร์มรายละเอียดเวลา
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    label="วันเริ่มต้น-สิ้นสุดกิจกรรม"
                                    name="act_date"
                                    defaultValue={values.act_date}
                                    onChange={handleInputChange}/>
                                <TextField
                                    variant="outlined"
                                    label="วันเริ่มต้น - สิ้นสุดลงทะเบียน"
                                    name="regis_date"
                                    defaultValue={values.regis_date}
                                    onChange={handleInputChange}/>
                                {/* <ResponsiveDateTimeRange
                                    name="start_act"
                                    startText="วันเริ่มต้นลงทะเบียน"
                                    endText="วันสิ้นสุดลงทะเบียน"
                                    value={values.start_act}
                                    onChange={handleInputChange}/>
                                <ResponsiveTimePickers
                                    name="start_regis_time"
                                    label="เวลาเริ่มลงทะเบียน"
                                    value={values.start_regis_time}
                                    onChange={handleInputChange}/>
                                <ResponsiveTimePickers 
                                    name="end_regis_time"
                                    label="เวลาสิ้นสุดลงทะเบียน"
                                    value={values.end_regis_time}
                                    onChange={handleInputChange}/>  */}
                                <Control.Input
                                    name="feedback_link"
                                    label="แนบแบบประเมิน"
                                    value={values.feedback_link}
                                    onChange = {handleInputChange}/>
                                {/* <Button
                                    sx={{ml:1,mr:2,mt:4,
                                        backgroundColor:'#6A5ACD',
                                        ':hover': {
                                            bgcolor: '#4B0082',
                                            color: 'white',
                                        },}}
                                    variant="contained"
                                    onClick={handleSubmitValue}
                                    size="large">
                                    Submit
                                </Button> */}
                                {form_valid ? (
                                    <Button
                                        sx={{ml:1,mr:2,mt:4,
                                            backgroundColor:'#6A5ACD',
                                            ':hover': {
                                                bgcolor: '#4B0082',
                                                color: 'white',
                                            },}}
                                        variant="contained"
                                        onClick={handleSubmitValue}
                                        size="large">
                                        Submit
                                    </Button>
                                ) : (
                                    <Button
                                        sx={{ml:1,mr:2,mt:4,
                                            backgroundColor:'#6A5ACD',
                                            ':hover': {
                                                bgcolor: '#4B0082',
                                                color: 'white',
                                            },}}
                                        variant="contained"
                                        onClick={handleSubmitValue}
                                        size="large"
                                        disabled>
                                        Submit
                                    </Button>
                                )}
                                <Button
                                    sx = {{mt:4,
                                        "&.MuiButton-text": { color: "#DC143C" },
                                    }}
                                    onClick={props.handleClosePopup}
                                    variant="text"
                                    size="large">
                                    Cancel
                                </Button>
                                {topic_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:2}} color="red">
                                        * กรุณากรอกชื่อกิจกรรม
                                    </Typography>
                                )}
                                {des_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกรายละเอียดกิจกรรม
                                    </Typography>
                                )}
                                {place_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกสถานที่จัดกิจกรรม
                                    </Typography>
                                )}
                                {regis_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณาระบุเวลาลงทะเบียนกิจกรรม
                                    </Typography>
                                )}
                                {act_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณาระบุเวลาเริ่มต้น-สิ้นสุดกิจกรรม
                                    </Typography>
                                )}
                                {/* {pic_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณา Upload รูปกิจกรรม
                                    </Typography>
                                )} */}
                                {num_valid ? (
                                    <div></div>
                                ) : (
                                    <Typography variant='subtitle1' sx={{ml:2,mt:0.5}} color="red">
                                        * กรุณากรอกเลขจำนวนเต็มบวกในช่องสมาชิก
                                    </Typography>
                                )}                      
                            </div>
                        </Grid>
                    </Grid>
                    )}
                </Form>
            </>
        )
    }
}

export default AdminForm