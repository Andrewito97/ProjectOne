import React from 'react';
import { useParams } from 'react-router-dom';
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
    passwordInput: {
        marginTop: 40,
        width: '100%'
    },
    confirmPassword: {
        marginTop: 30,
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

const ResetPasswordForm = () => {
    const [ requestedPassword, setPassword ] = React.useState('');
    const [ confirmedPassword, setConfirmedPassword ] = React.useState('');
    const [ passwordError, setPasswordError ] = React.useState('');
    const [ successed, setSuccessed ] = React.useState(false);

    let { email, resetToken } = useParams();

    const onChangePassword = async () => {
        const userData = {
            password: requestedPassword,
            confirmedPassword: confirmedPassword
        };
        const data = await userApi.resetPassword(userData, email, resetToken);
        data.passwordError ? setPasswordError(data.passwordError) : setPasswordError('');
        data.message ? setSuccessed(true) : null;
    };
    
    return (
        <div>
        <Card style={styles.container}>
            <CardContent style={styles.content}>
                <Typography variant='h5'>Set new password</Typography>

                <TextField 
                    required
                    label='Password' 
                    variant='outlined'
                    placeholder='Type your new password...'
                    type='password'
                    value={requestedPassword} 
                    style={styles.passwordInput} 
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br/>
                <TextField 
                    required
                    label='Confirm password' 
                    variant='outlined'
                    placeholder='Confirm password...'
                    type='password'
                    value={confirmedPassword} 
                    style={styles.confirmPassword} 
                    onChange={(event) => setConfirmedPassword(event.target.value)}
                />
                <br/>
                { passwordError ? (<Typography color='error'>{passwordError}</Typography>) : null }

                <CardActions>
                    <Button style={styles.button} onClick={onChangePassword}>Change password</Button>
                </CardActions>
            </CardContent>
        </Card>
        <Dialog open={successed} disableBackdropClick={true}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Password has been changed successfully !
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

export default ResetPasswordForm;
