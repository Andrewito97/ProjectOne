import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         Button,
         CardActions } from '@material-ui/core'
import userApi from '../api/user.api'
import authenticationHelper from '../helpers/authentication.helper'

const styles = {
    container: {
        width: '70%',
        minHeight: 200,
        padding: 30
    },
    textInput: {
        width: '70%'
    },
    linkContainer: {
        marginTop: 30
    },
    button: {
        backgroundColor: '#1976D2' ,
        color: 'white',
        marginTop: 60
    }
}

const LoginForm = () => {
    const [requestedEmail, setEmail] = React.useState('')
    const [requestedPassword, setPassword] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')
    const [redirectToHomePage, setRedirectToHomePage] = React.useState(false)

    const onLogin = async () => {
        const userData = {
            email: requestedEmail,
            password: requestedPassword
        }
        const data = await userApi.login(userData)
        data.emailError ? setEmailError(data.emailError) : setEmailError('')
        data.passwordError ? setPasswordError(data.passwordError) : setPasswordError('')
        data.accessToken ? authenticationHelper.authenticate(data, () => setRedirectToHomePage(true)) : null
    }

    if(redirectToHomePage) {
        return <Redirect to='/'/>
    }
    
    return (
        <Card style={styles.container}>
            <CardContent style={styles.content}>
                <Typography>Sign In</Typography>

                <TextField style={styles.textInput} 
                           label='Email' 
                           type='email'
                           value={requestedEmail} 
                           onChange={(event) => setEmail(event.target.value)}
                />
                <br/>
                { emailError ? (<Typography color='error'>{emailError}</Typography>) : null }

                <TextField style={styles.textInput} 
                           label='Password' 
                           type='password'
                           value={requestedPassword} 
                           onChange={(event) => setPassword(event.target.value)}
                />
                <br/>
                { passwordError ? (<Typography color='error'>{passwordError}</Typography>) : null }

                <div style={styles.linkContainer}>
                    <Link to='/signup'>Create new account</Link>
                </div>
                <CardActions>
                    <Button style={styles.button} onClick={onLogin}>Login</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default LoginForm
