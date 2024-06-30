import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import ax from "../../config/ax";
import ActCard from "../act_card";
import AdminDetailPopup from "./admin_detail_popup";
import NewCreateCard from "./NewCreateCard";
import { useMediaQuery, useTheme, FormControl, TextField } from '@mui/material';
import AdminShowDetail from "./AdminShowDetail";
import AdminCard from "./AdminCard";
import DeleteAct from "./DeleteAct";
import axios from "axios";
import config from "../../config";


function AdminDisplayArea(){
    const [delete_popup, setDelete_Popup] = useState(false);
    const [new_popup, setNew_Popup] = useState(false);
    const [activityList, setActivityList] = useState([]);
    const [popup, setPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);


    const handleOpenNewPopup = () => {
        setNew_Popup(true);
    };

    const handleOpenDeletePopup = (cardDetail) => {
        setDelete_Popup(true);
        setSelectedCard(cardDetail)
    };

    const handleOpenPopup = (cardDetail) => {
        setPopup(true);
        setSelectedCard(cardDetail)
    };

    const handleCloseNewPopup = () => {
        setNew_Popup(false);
    };

    const handleCloseDeletePopup = () => {
        setDelete_Popup(false);
    };

    const handleClosePopup = () => {
        setPopup(false);
    };

    const [filter, setFilter] = useState({favorite: ""});

    useEffect(async () => {
        setActivityList([])
        let result = await axios.get(`https://wd0101.coe.psu.ac.th/api/activity/`)
        let search = []
        for (let index = 0; index < result.data.results.length; index++){
            if (result.data.results[index].topic == filter.textSearch){
                search.push(result.data.results[index])
                return(
                    setActivityList(search)
                )
            }
            setActivityList(result.data.results)
        }
    }, [filter]);

    const handleChangeFilter = (event) => {
        let f = {...filter}
        f[event.target.name] = event.target.value
        setFilter(f)
    }

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))


    return(
        <>
            {isMatch ? (
                <>
                    <Grid container spacing={{xs:2,sm:2,md:1,lg:1}}
                        columns={{xs:12,sm:12,md:4,lg:4}}
                        alignItems="center"
                        justifyContent="center"
                        >
                            <NewCreateCard handleOpenNewPopup={handleOpenNewPopup}/>
                            {(activityList.map(r => <AdminCard handleOpenPopup={handleOpenPopup} handleOpenDeletePopup={handleOpenDeletePopup} cardDetail={r} key={r.id}/>))}
                    </Grid>
                    <AdminDetailPopup handleCloseNewPopup={handleCloseNewPopup} popup={new_popup}/>
                    <AdminShowDetail handleClosePopup={handleClosePopup} popup={popup} cardDetail={selectedCard} />
                    <DeleteAct userResult={selectedCard} handleClosePopup={handleCloseDeletePopup} popup={delete_popup}/>
                </>
            ) : (
                <>
                    <div>
                        <FormControl sx={{ m: 2, minWidth: 120 }}>
                            <TextField	name="textSearch"	id="outlined-basic" 	label="ค้นหา"
                                variant="outlined" value={filter.textSearch} onChange={handleChangeFilter} />
                        </FormControl>
                    </div>
                    <Grid container spacing={{xs:2,sm:2,md:1,lg:1}}
                        columns={{xs:12,sm:12,md:4,lg:4}}
                        alignItems="center"
                        >
                            <NewCreateCard handleOpenNewPopup={handleOpenNewPopup}/>
                            {(activityList.map(r => <AdminCard handleOpenPopup={handleOpenPopup} handleOpenDeletePopup={handleOpenDeletePopup} cardDetail={r} key={r.id}/>))}
                    </Grid>
                    <AdminDetailPopup handleCloseNewPopup={handleCloseNewPopup} popup={new_popup}/>
                    <AdminShowDetail handleClosePopup={handleClosePopup} popup={popup} cardDetail={selectedCard}/>
                    <DeleteAct userResult={selectedCard} handleClosePopup={handleCloseDeletePopup} popup={delete_popup}/>
                </>
            )}
        </>
    );
};

export default AdminDisplayArea