import React, { useEffect, useState } from "react";
import { FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import ax from "../../config/ax";
import ActCard from "../act_card";
import NotLogPopup from "./NotLogPopup";
import axios from "axios";
import config from "../../config";

function NotLogDisplayArea(){

    const [popup, setPopup] = React.useState(false);
    const [userResultList, setUserResultList] = useState([]);
    const [selectedUserResult, setSelectedUserResult] = useState(null);
    const [filter, setFilter] = useState({favorite: ""});

    const handleChangeFilter = (event) => {
        let f = {...filter}
        f[event.target.name] = event.target.value
        setFilter(f)
    };
    const handleOpenPopup = (userResult) => {
        setPopup(true);
        setSelectedUserResult(userResult);
    };

    const handleClosePopup = () => {
        setPopup(false);
    };

    const handleAcknowledge = async () => {
        let targetIdx = userResultList.findIndex(it => it.id === selectedUserResult.id)
        if(targetIdx >= 0){
            let list = [...userResultList]
            setSelectedUserResult(list[targetIdx])
            setUserResultList(list)
        }
    };

    useEffect(async () => {
        setUserResultList([])
        let result = await axios.get(`${config.serverUrlPrefix}/api/activity/`)
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
                {(userResultList.map(r => <ActCard handleOpenPopup={handleOpenPopup} cardDetail={r} key={r.id}/>))}
            </Grid>
            <NotLogPopup handleClosePopup={handleClosePopup} popup={popup}
                            userResult={selectedUserResult} handleAcknowledge={handleAcknowledge}/>
        </div>
    );
}


export default NotLogDisplayArea;