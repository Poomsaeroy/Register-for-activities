import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import "../../components/CSS/drawer.css"
import Login from '../Login/google_login';


const NotLogDrawer = () => {

    const [openDrawer, setOpenDrawer] = useState(false);

    return(
    <>
        <Drawer
            anchor='left'
            onClose={()=>setOpenDrawer(false)}
            open={openDrawer}
        >
            <List>
                <ListItem divider button component={Link} to="/all_activity/">
                    <ListItemIcon>
                        <ListItemText>
                            Home
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>

                <ListItem divider button component={Link} to="/for_contact/">
                    <ListItemIcon>
                        <ListItemText>
                            Contact
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>

                <ListItem divider>
                        <ListItemText>
                            <Login/>
                        </ListItemText>
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

export default NotLogDrawer