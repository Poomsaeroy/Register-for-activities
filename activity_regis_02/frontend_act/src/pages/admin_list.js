import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import ActList from '../components/adminList/ActList';
import AdminActMenuBar from '../components/admin_com/admin_menu';
import styles from '../components/CSS/home.css'
import ax from '../config/ax';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import 'aos/dist/aos.css';
import Aos from 'aos';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Athiti',
      'sans-serif',
    ].join(','),
  },});

function AdminList(){
    useEffect(() => {
        Aos.init();
    }, [])

    const [activityList, setActivityList] = React.useState([]);

    React.useEffect(async () => {
        let result = await ax.get('api/activity/')
        setActivityList(result.data.results)
    }, []);


    console.log(activityList)

    return(
        <div>
            <AdminActMenuBar/>
            <div className='home'>
              <Typography sx={{mt:1.5,ml:4,mb:1.75}} variant="h4" >
                  กิจกรรมที่มี
              </Typography>
            </div>
          <div data-aos="fade-right">
            <Grid
                classes={styles.root}
                container
                spacing={{xs:2,sm:2,md:1,lg:1}}
                columns={{xs:12,sm:12,md:4,lg:4}}>
                    {(activityList.map(r => <ActList userResult={r}/>))}
            </Grid>
          </div>
        </div>
    )
}

export default AdminList;