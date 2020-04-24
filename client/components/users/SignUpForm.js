import React from 'react';
import { Link } from 'react-router-dom';
import { Card,
         CardContent, 
         Typography, 
         TextField, 
         CardActions, 
         Button,
         Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         DialogActions } from '@material-ui/core';
import userApi from '../../api/user.api';

const styles = {
    container: {
        width: '55%',
        minHeight: 350,
        padding: 50
    },
    nameInput: {
        marginTop: 40,
        width: '100%'
    },
    emailInput: {
        marginTop: 30,
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
    button: {
        backgroundColor: '#2D986D' ,
        color: 'white',
        marginTop: 60
    }
};

const SignUpForm = () => {
    const [requestedName, setName] = React.useState('');
    const [requestedEmail, setEmail] = React.useState('');
    const [requestedPassword, setPassword] = React.useState('');
    const [nameError, setNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [successed, setSuccessed] = React.useState(false);

    const onCreate = async () => {
        const userData = {
            name: requestedName,
            email: requestedEmail,
            password: requestedPassword
        };
        const data = await userApi.create(userData);
        if(data.message) {
            setEmailError('');
            setNameError('');
            setPasswordError('');
            setSuccessed(true);
        } else {
            if(data.error.code) {
                setEmailError('Email is already existss!');
            } else {
                data.error.errors.email ? setEmailError(data.error.errors.email.message) : setEmailError('');
                data.error.errors.name ? setNameError(data.error.errors.name.message) : setNameError('');
                data.error.errors.password ? setPasswordError(data.error.errors.password.message) : setPasswordError('');
            }
        };
    };
    
    return (
        <div>
        <Card style={styles.container}>
            <CardContent style={styles.content}>
                <Typography variant='h5'>Sign Up</Typography>

                <TextField 
                    required
                    label='Name' 
                    variant='outlined'
                    placeholder='Type your name...'
                    value={requestedName} 
                    style={styles.nameInput} 
                    onChange={(event) => setName(event.target.value)}
                />
                <br/>
                { nameError ? (<Typography color='error'>{nameError}</Typography>) : null }

                <TextField 
                    required
                    label='Email' 
                    variant='outlined'
                    placeholder='Type your email...'
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
                    placeholder='Type your password...'
                    type='password'
                    value={requestedPassword}
                    style={styles.passwordInput} 
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br/>
                { passwordError ? (<Typography color='error'>{passwordError}</Typography>) : null }

                <div style={styles.linkContainer}>
                    <Link to='/login'>Allready have an account? Login</Link>
                </div>

                <CardActions>
                    <Button style={styles.button} onClick={onCreate}>Create</Button>
                </CardActions>
            </CardContent>
        </Card>
        <Dialog open={successed} disableBackdropClick={true}>
            <DialogTitle>New Account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    New account successfully created.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Link to="/login">
                <Button style={styles.button} >
                    Login
                </Button>
            </Link>
            </DialogActions>
        </Dialog>
        </div>
    )
};

export default SignUpForm;
