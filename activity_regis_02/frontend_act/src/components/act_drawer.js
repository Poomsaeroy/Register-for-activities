import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import "../components/CSS/drawer.css"


const ActDrawer = () => {

    const [openDrawer, setOpenDrawer] = useState(false);

    return(
    <>
        <Drawer
            anchor='left'
            elevation={100}
            onClose={()=>setOpenDrawer(false)}
            open={openDrawer}
        >
            <List>
                <ListItem divider button component={Link} to="/home/">
                    <ListItemIcon>
                        <ListItemText>
                            Home
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>

                <ListItem divider button component={Link} to="/check/">
                    <ListItemIcon>
                        <ListItemText>
                            Check
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>

                <ListItem divider button component={Link} to="/contact/">
                    <ListItemIcon>
                        <ListItemText>
                            Contact
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>

                <ListItem divider button component={Link} to="/profile/">
                    <ListItemIcon>
                        <ListItemText>
                            Profile
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>
            </List>
        </Drawer>
        <IconButton
            sx={{pt:2.5}}
            onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon/>
        </IconButton>
    </>
    )
}

export default ActDrawer