import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    Avatar: {
        width: 240,
        height: 240
    },
    IconButton: {
        width: 240,
        height: 240,
        margin: '24px'
    }
}))

function NewCreateCard(props) {

    function handleOpenPopup(){
        props.handleOpenNewPopup();
    }

    const classes = useStyles()

  return (
      <>
      <div style={{margin: 24, width:282,padding:25}}>
        <IconButton
            className={classes.IconButton}
            onClick={handleOpenPopup}>
                <Avatar
                        className={classes.Avatar}
                        alt="Loading"
                        src={require("../../media/addCard.png")}
                        />
        </IconButton>
        </div>
      </>
    )
}

export default NewCreateCard