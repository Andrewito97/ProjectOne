import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         Button,
         CardActions,
         Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         DialogActions } from '@material-ui/core';
import userApi from '../api/user.api';

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

const RecoverForm = () => {
    const [requestedEmail, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [successed, setSuccessed] = React.useState(false);

    const onRecover = async () => {
        const userData = {
            email: requestedEmail,
        };
        const data = await userApi.recoverPassword(userData);
        data.emailError ? setEmailError(data.emailError) : setEmailError('');
        data.message ? setSuccessed(true) : null;
    }
    
    return (
        <div>
        <Card style={styles.container}>
            <CardContent style={styles.content}>
                <Typography>Recovery</Typography>

                <TextField style={styles.textInput} 
                           label='Email' 
                           type='email'
                           value={requestedEmail} 
                           onChange={(event) => setEmail(event.target.value)}
                />
                <br/>
                { emailError ? (<Typography color='error'>{emailError}</Typography>) : null }

                <CardActions>
                    <Button style={styles.button} onClick={onRecover}>Send password</Button>
                </CardActions>
            </CardContent>
        </Card>
        <Dialog open={successed} disableBackdropClick={true}>
            <DialogTitle>Recovery</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Password has been sent successfully on your email address !
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

export default RecoverForm;
