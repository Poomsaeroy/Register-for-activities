import React, { useEffect, useState } from "react";
import ax from "../config/ax";
import ActCard from "./act_card";
import ActDetailPopup from "./act_detail_popup";
import { FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import ConfirmAct from "./ConfirmAct";
import axios from "axios";
import config from "../config";

function ActDisplayArea(){

    const [popup, setPopup] = React.useState(false);
    const [confirm_popup, setConfirm_Popup] = useState(false);
    const [userResultList, setUserResultList] = useState([]);
    const [selectedUserResult, setSelectedUserResult] = useState(null);
    const [filter, setFilter] = useState({favorite: ""});

    const handleChangeFilter = (event) => {
        let f = {...filter}
        f[event.target.name] = event.target.value
        setFilter(f)
    };

    const handleOpenConfirmPopup = (userResult) => {
        setConfirm_Popup(true);
        setSelectedUserResult(userResult);
    };

    const handleCloseConfirmPopup = () => {
        setConfirm_Popup(false);
    };

    const handleOpenPopup = (userResult) => {
        setPopup(true);
        setSelectedUserResult(userResult);
    };

    const handleClosePopup = () => {
        setPopup(false);
    };

    useEffect(async () => {
        setUserResultList([])
        let result = await axios.get(`https://wd0101.coe.psu.ac.th/api/activity/`)
        let search = []
        for (let index = 0; index < result.data.results.length; index++){
            if (result.data.results[index].topic == filter.textSearch){
                search.push(result.data.results[index])
                return(
                    setUserResultList(search)
                )
            }
            setUserResultList(result.data.results)
        }  
    }, [filter]);
    
    const theme = useTheme();

    return(
        <div>
            <FormControl sx={{ m: 2, minWidth: 120 }}>
                <Select value={filter.favorite}
                    onChange={handleChangeFilter}
                    displayEmpty>
                        <MenuItem value="">ทั้งหมด</MenuItem>
                        <MenuItem value={10}>ชื่นชอบ</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 120 }}>
                <TextField	name="textSearch"	id="outlined-basic" 	label="ค้นหา"
                    variant="outlined" value={filter.textSearch} onChange={handleChangeFilter} />
            </FormControl>
            <Grid container spacing={{xs:2,sm:2,md:1,lg:1}}
                  columns={{xs:12,sm:12,md:4,lg:4}}>
                {(userResultList.map(r => <ActCard handleOpenPopup={handleOpenPopup} handleOpenConfirmPopup={handleOpenConfirmPopup} cardDetail={r} key={r.id}/>))}
            </Grid>
            <ActDetailPopup handleClosePopup={handleClosePopup} popup={popup}
                            userResult={selectedUserResult}/>
            <ConfirmAct userResult={selectedUserResult} handleClosePopup={handleCloseConfirmPopup} popup={confirm_popup}/>
        </div>
    );
}

export default ActDisplayArea;