import React from 'react';
import { Link } from 'react-router-dom';
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
import userApi from '../../api/user.api';

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
    button: {
        backgroundColor: '#2D986D' ,
        color: 'white',
        marginTop: 60
    }
};

const RecoveryForm = () => {
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
    };
    
    return (
        <div>
        <Card style={styles.container}>
            <CardContent style={styles.content}>
                <Typography variant='h5'>Recovery</Typography>

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

                <CardActions>
                    <Button style={styles.button} onClick={onRecover}>Send recovery link</Button>
                </CardActions>
            </CardContent>
        </Card>
        <Dialog open={successed} disableBackdropClick={true}>
            <DialogTitle>Recovery</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Recovery link has been sent successfully on your email address !
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

export default RecoveryForm;
