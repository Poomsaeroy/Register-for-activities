import React, { useEffect, useState } from 'react'
import {Dialog, DialogContent, DialogTitle, styled} from "@mui/material";
import AdminForm from "./AdminForm";
import ax from '../../config/ax';
import config from '../../config';
import axios from 'axios';

function AdminShowDetail(props) {

    const [activity, setActivity] = useState(null);

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        }
    }));

    useEffect(async () => {
        if(props.cardDetail){
            let result = await axios.get(`https://wd0101.coe.psu.ac.th/api/activity/${props.cardDetail.id}/`)
            setActivity(result.data)
        }
    },[props.cardDetail ? props.cardDetail.id:null])

  return (
        <div>
            <BootstrapDialog
                maxWidth='xl'
                onClose={props.handleClosePopup}
                aria-labelledby="customized-dialog-title"
                open={props.popup}>
                    <DialogTitle style={{backgroundColor: "#bb3347"}}>
                        แบบฟอร์มจัดกิจกรรม ( มีข้อมูลแล้ว )
                    </DialogTitle>
                    <DialogContent>
                                <AdminForm activity={activity} handleClosePopup={props.handleClosePopup}/>
                    </DialogContent>
            </BootstrapDialog>
        </div>
  )
}

export default AdminShowDetail