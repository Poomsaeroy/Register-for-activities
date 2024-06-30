import React from "react";
import { useNavigate } from "react-router-dom";
import ax from "./config/ax";
import { useEffect } from "react";
import config from "./config";
import axios from "axios";

const appAuthProvider = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user_name: null,
    google_image: null,
    email: null,
    defaults: null,

    async signin(token, callback) {
      appAuthProvider.isAuthenticated = true;
      console.log(token)
      let result = await axios.post(`https://wd0101.coe.psu.ac.th/api/token/`,{
        token
      })
      console.log(result.data)
      console.log(result.data.access)
      if(result.status == 200 && result.data){
          appAuthProvider.accessToken = result.data.access
          appAuthProvider.refreshToken = result.data.refresh
          appAuthProvider.user_name = result.data.username
          appAuthProvider.google_image = result.data.picture
          appAuthProvider.email = result.data.email
          appAuthProvider.defaults = result.data.defaults
          saveData(appAuthProvider);
          let user_result = await axios.get(`https://wd0101.coe.psu.ac.th/api/whoami/`,
          {
              headers: {
                  'Authorization': `Bearer ${result.data.access}`
              }
          }
        )
          callback(user_result.data)
      } else {
          callback(null)
      }
    },

    
    signout(callback) {
      localStorage.removeItem('UserDetail');
      localStorage.removeItem('myAuth');
      appAuthProvider.isAuthenticated = false;
      appAuthProvider.accessToken = null;
      appAuthProvider.refreshToken = null;
      appAuthProvider.user_name = null;
      appAuthProvider.google_image = null;
      appAuthProvider.email = null;
      appAuthProvider.defaults = null;
      setTimeout(callback, 100);
      saveData(appAuthProvider);
    },
  };

// axios.interceptors.request.use(config => {
//     if(appAuthProvider.accessToken){
//         config.headers.authorization = `Bearer ${appAuthProvider.accessToken}`
//     }
//     return config
// });


let AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (token, callback) => {
    return appAuthProvider.signin(token ,(newUser) => {
      setUser(newUser);
      callback(newUser);
    });
  };

  let signout = (callback) => {
    return appAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function saveData(tokenDetail){
  localStorage.setItem('UserDetail', JSON.stringify(tokenDetail));
}

function setDefault(){
  let appAuth = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user_name: null,
    google_image: null,
    email: null,
    defaults: null,
  }
  saveData(appAuth)
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthGuard({children}){
    let auth = useAuth()
    let navigate = useNavigate();

    if (auth==null || !auth.user) {
      auth = JSON.parse(localStorage.getItem("myAuth"))
    }
    
    localStorage.setItem('myAuth', JSON.stringify(auth))

    console.log(auth)
    if(auth==null || !auth.user){
      navigate('/all_activity')
    }
    return children
}
  
export { appAuthProvider, AuthProvider, AuthContext, useAuth, AuthGuard, setDefault};

// useEffect(() => {
//   const previous_auth = localStorage.getItem("my-token");
//   console.log(auth)
//   if (previous_auth) {
//     auth = JSON.parse(previous_auth);
//   }
// }, []);

// useEffect(() => {
//   localStorage.setItem('my-token', JSON.stringify(auth));
// });