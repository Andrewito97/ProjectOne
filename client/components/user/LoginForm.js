import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         Button,
         CardActions } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import userApi from '../../api/user.api';
import config from '../../../config';
import authenticationHelper from '../../helpers/authentication.helper';
import styleController from '../../StyleController';
import '../style.css';

const styles = {
    card: {
        width: '55%',
        minHeight: 200,
        padding: 50
    },
    emailInput: {
        marginTop: 40,
        width: '100%'
    },
    passwordInput: {
        marginTop: 30,
        marginBottom: 30,
        width: '100%'
    },
    linkContainer: {
        marginTop: 30
    },
    loginButton: {
        color: 'white',
        marginTop: 60
    },
    googleButton: {
        marginTop: 60,
        marginLeft: '18%',
        width: 35
    },
    facebookButton: {
        marginTop: 60,
        marginLeft: '25%',
    }
};

const LoginForm = () => {
    const [ requestedEmail, setEmail ] = React.useState('')
    const [ requestedPassword, setPassword ] = React.useState('')
    const [ emailError, setEmailError ] = React.useState('')
    const [ passwordError, setPasswordError ] = React.useState('')
    const [ redirectToHomePage, setRedirectToHomePage ] = React.useState(false)

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
        };
        const data = await userApi.checkIfMediaAccExists(userData);
        if(data.notExist) {
            const signInData = await userApi.create(userData);
            if(signInData.message) {
                const loginData = await userApi.login(userData);
                loginData.accessToken ? authenticationHelper
                    .authenticate(loginData, () => setRedirectToHomePage(true)) : null
            };
        };
        if(data.isGoogleAccount) {
            if(isGoogle) {
                const loginData = await userApi.login(userData);
                loginData.accessToken ? authenticationHelper
                    .authenticate(loginData, () => setRedirectToHomePage(true)) : null
            } else {
                setEmailError('Email is already registered with google !');
            };
        };
        if(data.isFacebookAccount) {
            if(!isGoogle) {
                const loginData = await userApi.login(userData);
                loginData.accessToken ? authenticationHelper
                    .authenticate(loginData, () => setRedirectToHomePage(true)) : null
            } else {
                setEmailError('Email is already registered with facebook !');
            };
        };
        if(data.isNotMediaAccount) {
            setEmailError('Email is already registered without social media !')
        };
    };

    const onLogin = async () => {
        const userData = {
            email: requestedEmail,
            password: requestedPassword
        }
        const data = await userApi.login(userData)
        data.emailError ? setEmailError(data.emailError) : setEmailError('')
        data.passwordError ? setPasswordError(data.passwordError) : setPasswordError('')
        data.accessToken ? authenticationHelper.authenticate(data, () => setRedirectToHomePage(true)) : null
    };

    if(redirectToHomePage) {
        return <Redirect to='/'/>
    };
    
    return (
        <Card 
            style={{
                backgroundColor: styleController.cardColor,
                ...styles.card
            }}
        >
            <CardContent style={styles.content}>
                <Typography 
                    variant='h5'
                    style={{
                        color: styleController.textColor
                    }}
                >
                    Sign In
                </Typography>

                <TextField 
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
                { emailError ? (<Typography color='error'>{emailError}</Typography>) : null }

                <TextField   
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
                { passwordError ? (<Typography color='error'>{passwordError}</Typography>) : null }

                <div style={styles.linkContainer}>
                    <Link to='/signup'>Create new account</Link>
                </div>
                <div style={styles.linkContainer}>
                    <Link to='/recovery'>Forgot your password? Recover !</Link>
                </div>
                <CardActions>
                    <Button 
                        onClick={onLogin}
                        style={{
                            backgroundColor: styleController.mainColor,
                            ...styles.loginButton
                        }}
                    >
                        Login
                    </Button>
                    <div style={styles.googleButton} id='google_button_container'>
                        <GoogleLogin
                            clientId={config.googleClientId}
                            buttonText='Google'
                            isSignedIn={false} 
                            onSuccess={responseMedia}
                            onFailure={() => console.log('Google auth was canceled')} 
                            cookiePolicy={'single_host_origin'}                
                        />
                    </div>
                    <div style={styles.facebookButton}>
                        <FacebookLogin
                            appId={config.facebookAppId}
                            autoLoad={false}
                            fields='name,email'
                            textButton='Facebook'
                            cssClass='facebook-button'
                            icon={<FacebookIcon/>}
                            callback={responseMedia}
                            onFailure={() => console.log('Facebook auth was canceled')} 
                        />
                    </div>
                </CardActions>
            </CardContent>
        </Card>
    )
};

export default LoginForm;
