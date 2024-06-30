import * as React from 'react';
import FacebookSocialAuth from '../components/Login/facebook_login';
import GoogleSocialAuth from '../components/Login/google_login';
import LoginBox from '../components/Login/loginbox';

function Login(){
    return(
        <div className='login'>
            <LoginBox/>
        </div>
    );
}

export default Login;
