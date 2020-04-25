import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         Button,
         CardActions } from '@material-ui/core';
import userApi from '../../api/user.api';
import config from '../../../config';
import authenticationHelper from '../../helpers/authentication.helper';

const styles = {
    container: {
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
        backgroundColor: '#2D986D' ,
        color: 'white',
        marginTop: 60
    },
    googleButton: {
        marginTop: 60,
        marginLeft: 60
    }
};

const LoginForm = () => {
    const [requestedEmail, setEmail] = React.useState('')
    const [requestedPassword, setPassword] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')
    const [redirectToHomePage, setRedirectToHomePage] = React.useState(false)

    const responseGoogle = async (response) => {
        const googleProfile = response.getBasicProfile();
        console.log(googleProfile);
        const userData = {
            name: googleProfile.getName(),
            email: googleProfile.getEmail(),
            password: googleProfile.getId(),
            isGoogleAccount: true
        };
        const data = await userApi.checkIfGoogleAccExists(userData);
        if(data.notExist) {
            const signInData = await userApi.create(userData);
            if(signInData.message) {
                const loginData = await userApi.login(userData);
                loginData.accessToken ? authenticationHelper
                    .authenticate(loginData, () => setRedirectToHomePage(true)) : null
            };
        };
        if(data.isGoogleAccount) {
            const loginData = await userApi.login(userData);
            loginData.accessToken ? authenticationHelper
                .authenticate(loginData, () => setRedirectToHomePage(true)) : null
        };
        if(data.isNotGoogleAccount) {
            setEmailError('This email is already registered without google auth !')
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
        <Card style={styles.container}>
            <CardContent style={styles.content}>
                <Typography variant='h5'>Sign In</Typography>

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
                    <Button style={styles.loginButton} onClick={onLogin}>Login</Button>
                    <div style={styles.googleButton}>
                        <GoogleLogin
                            clientId={config.googleClientId}
                            buttonText='Sign In'    
                            isSignedIn={false} 
                            onSuccess={responseGoogle}
                            onFailure={() => console.log('Google auth cancel')} 
                            cookiePolicy={'single_host_origin'}                   
                        />
                    </div>
                </CardActions>
            </CardContent>
        </Card>
    )
};

export default LoginForm;
