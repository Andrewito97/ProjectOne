import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CardActions } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import userApi from '../../api/user.api';
import config from '../../../config';
import authenticationHelper from '../../helpers/authentication.helper';
import paletteController from '../../PaletteController';

const styles = {
  container: {
    width: 850,
    minHeight: '110vh',
    marginTop: '10%',
    marginBottom: '7%'
  },
  card: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    padding: 50
  },
  emailInput: {
    marginTop: 40,
    marginLeft: 5,
    width: '100%'
  },
  passwordInput: {
    marginTop: 30,
    marginLeft: 5,
    width: '100%'
  },
  linkContainer: {
    marginTop: 30,
    marginLeft: 8
  },
  error: {
    marginLeft: 5
  },
  buttonsContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 60
  },
  loginButton: {
    color: 'white'
  },
  googleButton: {
    position: 'absolute',
    bottom: -8,
    right: 45
  },
  facebookButton: {
    position: 'absolute',
    bottom: -8,
    right: -15,
    color: '#415E9B'
  }
};

const LoginForm = () => {
  const [ requestedEmail, setEmail ] = React.useState('');
  const [ requestedPassword, setPassword ] = React.useState('');
  const [ emailError, setEmailError ] = React.useState('');
  const [ passwordError, setPasswordError ] = React.useState('');
  const [ redirectToHomePage, setRedirectToHomePage ] = React.useState(false);

  const responseMedia = async (response) => {
    let isGoogle = response.getBasicProfile ? true : false;
    let userData;
    if(isGoogle) {
      const googleProfile = response.getBasicProfile();
      userData = {
        name: googleProfile.getName(),
        email: googleProfile.getEmail(),
        password: googleProfile.getId(),
        createdWithMedia: 'google'
      };
    } else { 
      userData = {
        name: response.name,
        email: response.email,
        password: response.id,
        createdWithMedia: 'facebook'
      };
    }
    const data = await userApi.checkIfMediaAccExists(userData);
    if(data.notExist) {
      const signInData = await userApi.create(userData);
      if(signInData.message) {
        const loginData = await userApi.login(userData);
        loginData.accessToken ? authenticationHelper
          .authenticate(loginData, () => setRedirectToHomePage(true)) : null;
      }
    }
    if(data.isGoogleAccount) {
      if(isGoogle) {
        const loginData = await userApi.login(userData);
        loginData.accessToken ? authenticationHelper
          .authenticate(loginData, () => setRedirectToHomePage(true)) : null;
      } else {
        setEmailError('Email is already registered with google !');
      }
    }
    if(data.isFacebookAccount) {
      if(!isGoogle) {
        const loginData = await userApi.login(userData);
        loginData.accessToken ? authenticationHelper
          .authenticate(loginData, () => setRedirectToHomePage(true)) : null;
      } else {
        setEmailError('Email is already registered with facebook !');
      }
    }
    if(data.isNotMediaAccount) {
      setEmailError('Email is already registered without social media !');
    }
  };

  const onLogin = async () => {
    const userData = {
      email: requestedEmail,
      password: requestedPassword
    };
    const data = await userApi.login(userData);
    data.emailError ? setEmailError(data.emailError) : setEmailError('');
    data.passwordError ? setPasswordError(data.passwordError) : setPasswordError('');
    data.accessToken ? authenticationHelper.authenticate(data, () => setRedirectToHomePage(true)) : null;
  };

  if(redirectToHomePage) {
    return <Redirect to='/'/>;
  }
    
  return (
    <Box style={styles.container}>
      <Card
        raised
        style={{
          backgroundColor: paletteController.cardColor,
          width: isMobile ? null : '55%',
          ...styles.card
        }}
      >
        <CardContent style={styles.content}>
          <Typography
            id='page-title'
            variant='h5'
            style={{
              color: paletteController.textColor
            }}
          >
						Sign In
          </Typography>

          <TextField 
            id='email'
            required
            label='Email' 
            variant='outlined'
            placeholder='Type email...'
            type='email'
            value={requestedEmail}
            style={styles.emailInput}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br/>
          { 
            emailError ? 
              (<Typography 
                id='email-error' 
                color='error'
                style={styles.error}
              >
                {emailError}
              </Typography>) 
              : 
              null 
          }

          <TextField   
            id='password'
            required
            label='Password' 
            variant='outlined'
            placeholder='Type password...'
            type='password'
            value={requestedPassword} 
            style={styles.passwordInput} 
            onChange={(event) => setPassword(event.target.value)}
          />
          <br/>
          { 
            passwordError ? 
              (<Typography 
                id='password-error' 
                color='error'
                style={styles.error}
              >
                {passwordError}
              </Typography>) 
              : 
              null 
          }

          <Typography style={styles.linkContainer}>
            <Link to='/signup'>Create new account</Link>
          </Typography>
          <Typography style={styles.linkContainer}>
            <Link to='/recovery'>Forgot your password? Recover !</Link>
          </Typography>
          <CardActions>
            <Box style={styles.buttonsContainer}>
              <Button
                id='login-button'
                onClick={onLogin}
                style={{
                  backgroundColor: paletteController.mainColor,
                  ...styles.loginButton
                }}
              >
								Login
              </Button>
              <GoogleLogin
                clientId={config.googleClientId}
                isSignedIn={false} 
                onSuccess={responseMedia}
                onFailure={() => console.log('Google auth was canceled')} 
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <IconButton
                    id='google-button'
                    onClick={renderProps.onClick}
                    style={styles.googleButton}
                  >
                    <FcGoogle size={33}/>
                  </IconButton>
                )}           
              />
              <FacebookLogin
                appId={config.facebookAppId}
                autoLoad={false}
                fields='name,email'
                callback={responseMedia}
                onFailure={() => console.log('Facebook auth was canceled')} 
                render={renderProps => (
                  <IconButton
                    id='facebook-button'
                    onClick={renderProps.onClick}
                    style={styles.facebookButton}
                  >
                    <FacebookIcon fontSize='large'/>
                  </IconButton>
                )}
              />
            </Box>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
