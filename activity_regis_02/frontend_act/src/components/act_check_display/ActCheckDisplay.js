import React, { useEffect, useState } from "react";
import { FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import ActCheckCard from "./ActCheckCard";
import ax from "../../config/ax";
import { appAuthProvider } from "../../auth";
import ActCheckPopup from "./ActCheckPopup";
import CancelAct from "./CancelAct";
import config from "../../config";
import axios from "axios";

function ActCheckDisplay() {
    const [popup, setPopup] = React.useState(false);
    const [cancel_popup, setCancel_Popup] = useState(false);
    const [userResultList, setUserResultList] = useState([]);
    const [selectedUserResult, setSelectedUserResult] = useState(null);
    const [filter, setFilter] = useState({favorite: ""});
    const handleChangeFilter = (event) => {
        let f = {...filter}
        f[event.target.name] = event.target.value
        setFilter(f)
    };

    const handleOpenCancelPopup = (userResult) => {
        setCancel_Popup(true);
        setSelectedUserResult(userResult);
    };

    const handleCloseCancelPopup = () => {
        setCancel_Popup(false);
    };

    const handleOpenPopup = (userResult) => {
        setPopup(true);
        setSelectedUserResult(userResult);
    };

    const handleClosePopup = () => {
        setPopup(false);
    };

    useEffect(async () => {
        let result = await axios.get(`https://wd0101.coe.psu.ac.th/api/whoami/`,
            {
                headers: {
                    'Authorization': `Bearer ${appAuthProvider.accessToken}`
                }
            }
        ) //? ทำยังไงให้ เราดึง id ของ RegisterUser มาแสดงผล
        console.log("Activity :", result.data.activity_set)
        setUserResultList(result.data.activity_set)
    }, []);

    const theme = useTheme();

    return(
        <div>
            <FormControl sx={{ m: 2, minWidth: 120 }}>
                <Select value={filter.favorite}
                    onChange={handleChangeFilter}
                    displayEmpty>
                        <MenuItem value="">ทั้งหมด</MenuItem>
                        <MenuItem value={10}>มีสิทธิ์เข้าร่วม</MenuItem>
                        <MenuItem value={20}>ไม่มีสิทธิ์เข้าร่วม</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 120 }}>
                <TextField	name="textSearch"	id="outlined-basic" 	label="ค้นหา"
                    variant="outlined" value={filter.textSearch} onChange={handleChangeFilter} />
            </FormControl>
            <Grid container spacing={{xs:2,sm:2,md:1,lg:1}}
                  columns={{xs:12,sm:12,md:4,lg:4}}>
                {(userResultList.map(r => <ActCheckCard handleOpenPopup={handleOpenPopup} userResult={r} handleOpenCancelPopup={handleOpenCancelPopup}/>))}
            </Grid>
            <ActCheckPopup handleClosePopup={handleClosePopup} popup={popup}
                            userResult={selectedUserResult}/>
            <CancelAct userResult={selectedUserResult} handleClosePopup={handleCloseCancelPopup} popup={cancel_popup}/>
        </div>
    );
}


export default ActCheckDisplay