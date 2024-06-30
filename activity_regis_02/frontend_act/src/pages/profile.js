/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { useState, useEffect } from "react";
import googleLogin from "../config/googleLoginService";
import ax from "../config/ax";
import { Link, useNavigate } from "react-router-dom";
import "../components/CSS/profile.css";
import { display } from "@mui/system";
import ActMenuBar from "../components/act_menu_bar";
import ActCheckDisplay from "../components/act_check_display/ActCheckDisplay";
import {
  Avatar,
  Button,
  Box,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia,
  Card,
  Grid,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { useAuth } from "../auth";
import CardHistory from "../components/CardHistory"

function profile() {
  const appAuthProvider = JSON.parse(localStorage.getItem("UserDetail"))
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [cardHistory,setCardHistory] = useState([]);
  // Student Id
  const idnumber = appAuthProvider.email;
  

  useEffect(async () => {
    let user_result = await ax.get('api/whoami/',
          {
              headers: {
                  'Authorization': `Bearer ${appAuthProvider.accessToken}`
              }
          }
    )
    console.log("TESTTTT",user_result.data.activity_set)
    setCardHistory(user_result.data.activity_set)
  },[])


  let result = idnumber.replace("@psu.ac.th", "");
  // year
  let yearresult = parseInt(result.substring(0, 2));
  function Studentyear(yearresult) {
    if (yearresult == 64) {
      return 1;
    } else if (60 >= yearresult < 64) {
      return 65 - yearresult;
    } else {
      return "ไม่ทราบ";
    }
  }

  let auth = useAuth();

  let navigate = useNavigate();

  const handleSignOut = () => {
    auth.signout(() => {
      console.log("Sign Out.....Finished");
    });
    navigate("/all_activity");
  };

  // disablad profile
  function disableTxt() {
    document.getElementById("1").disabled = false;
  }
  function undisableTxt() {
    document.getElementById("1").disabled = true;
  }
  const user_name = [appAuthProvider.user_name];
  // upload propicja
  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);
  function onImageChange(e) {
    setImages([...e.target.files]);
    document.getElementById("propicja").src = { imageURLs };
    document.getElementById("propicja").innerHTML = { imageURLs };
  }
  console.log("Images : ", images);
  console.log("imageURLs :", imageURLs);

  //api user name
  return (
    <div className="Allprotexts" id="myText">
      <ActMenuBar />
      <Card
        className="con"
        sx={{ mx: "auto", my: 4, maxWidth: 700 }}
        style={{ backgroundColor: "#fff7c0" }}
      >
        <div className="com">
          <div class="edite">
            <CardMedia
              component="img"
              className="Crop"
              image={appAuthProvider.google_image}
              leble=" "
              buttontext="Upload"
              id="propicja"
              value="pro1"
            />
          </div>
          <br />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            onChange={onImageChange}
          />
          <label htmlFor="contained-button-file">
            &nbsp; &nbsp;&nbsp; &nbsp;
            <Button
              variant="contained"
              color="primary"
              component="span"
              accept="image/*"
              name="filename"
              onChange={onImageChange}
            >
              Upload
            </Button>
            &nbsp; &nbsp;**Upload your profile image
          </label>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Profile
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="name:"
                id="1"
                defaultValue={appAuthProvider.user_name}
                classname="text"
              />
              <TextField
                label="surname:"
                id="2"
                defaultValue={appAuthProvider.defaults}
                classname="text"
              />
            </div>
            <div>
              <TextField
                label="Nickcame:"
                id="3"
                defaultValue=""
                type="input"
                classname="text"
              />
              <TextField
                label="Student ID:"
                id="4"
                defaultValue={result}
                classname="text"
                disabled={true}
              />
            </div>
            <div>
              <TextField
                label="อีเมล:6410110@***:"
                id="5"
                defaultValue={appAuthProvider.email}
                disabled
                classname="text"
              />
              <TextField
                label="ชั้นปีการศึกษา:"
                id="6"
                defaultValue={Studentyear(yearresult)}
              />
            </div>
            <div>
              <TextField label="คณะ:" id="7" defaultValue="" />
              <TextField label="เบอร์โทรศัพท์:" id="8" defaultValue="" />
              <TextField label="Facebook:" id="9" defaultValue="" />
              <TextField label="Line:" id="10" defaultValue="" />
            </div>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            onClick={undisableTxt}
            component={Link}
            to="/Profile/"
            variant="contained"
            sx={{ mx: "auto" }}
          >
            บันทึก
          </Button>
          <Button
            onClick={disableTxt}
            component={Link}
            to="/Profile/"
            variant="contained"
            sx={{ mx: "auto" }}
          >
            แก้ไข
          </Button>
          <Button
            component={Link}
            to="/Profile/"
            variant="contained"
            sx={{ mx: "auto" }}
          >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor:'#FF4A4A',
              ':hover': {
                  bgcolor: '#C62929',
                  color: 'white',
              },}}
            onClick={handleSignOut}>
              Sign out
          </Button>
        </CardActions>

        
        <div className="sos">
          <Card className="Cardhis">
            <Typography gutterBottom variant="h5" component="div">
              ----ประวัติการเข้าร่วม----
            </Typography>
          </Card>
        </div>
        {(cardHistory.map(r => <CardHistory cardDetail={r} key={r.id}/>))}
      </Card>
    </div>
  );
}

export default profile;
