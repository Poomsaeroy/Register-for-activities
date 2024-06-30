import Home from "./pages/home";
import Login from "./pages/login";
import Check from "./pages/check";
import Contact from "./pages/contact";
import Profile from "./pages/profile";
import AdminHome from "./pages/adminHome";
import History from "./pages/History";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminList from "./pages/admin_list";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AdminCheckRegis from "./pages/AdminCheckRegis";
import UnLogHome from "./pages/UnLogHome";
import NotLogContact from "./pages/NotLogContact";
import { AuthGuard, AuthProvider } from "./auth";
import ProfileAdmin from "./pages/profileadmin";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Athiti',
      'sans-serif',
    ].join(','),
    fontSize: 18
  },});

function App(){
  return(
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>


              <Route path="/" element={<Navigate replace to="/all_activity"/>}/>
              <Route path="/all_activity" element={<UnLogHome/>}/>
              <Route path="/for_contact" element={<NotLogContact/>}/>

    
              
              <Route path="/home" element={<AuthGuard> <Home/> </AuthGuard>}/>
              <Route path="/login" element={<AuthGuard> <Login/> </AuthGuard>}/>
              <Route path="/check" element={<AuthGuard> <Check/> </AuthGuard>}/>
              <Route path="/contact" element={<AuthGuard> <Contact/> </AuthGuard>}/>
              <Route path="/Profile" element={<AuthGuard> <Profile/> </AuthGuard>}/>
              <Route path="/history" element={<AuthGuard> <History/> </AuthGuard>}/>
            

              <Route path="/adminHome" element={<AuthGuard> <AdminHome/> </AuthGuard>}/>
              <Route path="/adminList" element={<AuthGuard> <AdminList/> </AuthGuard>}/>
              <Route path="/adminProfile" element={<AuthGuard> <ProfileAdmin/> </AuthGuard>}/>
              <Route path="/adminCheckRegis/:id/" element={<AuthGuard> <AdminCheckRegis/> </AuthGuard>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;