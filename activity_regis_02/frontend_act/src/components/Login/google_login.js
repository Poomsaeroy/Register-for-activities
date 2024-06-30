import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';

export default function Login(){

    let auth = useAuth();

    let navigate = useNavigate();

    const googleResponse = async (response) => {
      auth.signin(response.tokenId, (newUser) => {
        console.log('Login done. user :', newUser)
        if (newUser){
          if(newUser.is_staff){
            navigate('/adminHome')
          } else {
            navigate('/home')
          }
        }
      })
    }

    return (
        <GoogleLogin
          clientId="251702408034-r3rpfvhatt0aa6r8j1u8bqag4kms9q38.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={googleResponse}
          onFailure={googleResponse}
        />
    );
}