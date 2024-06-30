import { Avatar, Button, Card, CardContent, Checkbox, FormControl, Grid, Typography } from '@mui/material'
import React from 'react'

function UserCard(props) {

    let UserData = props.userData.fields

    const card = (
        <>
            <CardContent sx={{height:'4vh',width:'96.4vw'}} style={{backgroundColor: "#5558b6"}}>
                <Grid container>
                    <Grid item sx={{mr:'3%'}}>
                        <FormControl>
                            <Checkbox/>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{mr:'2.5%'}}>
                        <Avatar src={UserData.google_image} referrerpolicy="no-referrer">Loading...</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography>
                            {UserData.username}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography>
                            {UserData.date_joined}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Button variant='text'sx={{color:'#eec124'}}>
                            รายละเอียด
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )

  return (
    <Card sx={{ml:'11%',mb:0.5,width:'90%'}}>
        {card}
    </Card>
  )
}

export default UserCard