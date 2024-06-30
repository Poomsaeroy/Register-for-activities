import { Button, makeStyles } from '@material-ui/core'
import { Grid } from '@mui/material';
import React from 'react'

function AdminButton(props) {

    const useStyles = makeStyles(theme =>({
        root : {
            margin: theme.spacing(0.75)
        },
        label : {
            textTransform: 'None'
        }
    }))

    const {text, size, color, variant, onClick, ...other} = props;
    const classes = useStyles();

    return (
        <Grid>
            <Button
                classes={{root:classes.root, label:classes.label}}
                variant={variant || "contained"}
                size={size || "large"}
                color={color || "primary"}
                onClick={onClick}
                {...other}>
                    {text}
            </Button>
        </Grid>
    
    )
}

export default AdminButton