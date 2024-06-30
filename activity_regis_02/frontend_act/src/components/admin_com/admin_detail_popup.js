import {Dialog, DialogContent, DialogTitle, styled} from "@mui/material";
import React from "react";
import AdminForm from "./AdminForm";

function AdminDetailPopup(props){
    
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        }
    }));


    return(
        <div>
            <BootstrapDialog
                maxWidth='xl'
                onClose={props.handleCloseNewPopup}
                aria-labelledby="customized-dialog-title"
                open={props.popup}>
                    <DialogTitle style={{backgroundColor: "#bb3347"}}>
                        แบบฟอร์มจัดกิจกรรม
                    </DialogTitle>
                    <DialogContent>
                                <AdminForm handleClosePopup={props.handleCloseNewPopup}/>
                    </DialogContent>
            </BootstrapDialog>
        </div>
    );
};

export default AdminDetailPopup;