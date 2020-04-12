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
};

const ResetPasswordForm = () => {
    const [requestedPassword, setPassword] = React.useState('');
    const [confirmedPassword, setConfirmedPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [successed, setSuccessed] = React.useState(false);

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
                <Typography>Set new password</Typography>

                <TextField style={styles.textInput} 
                           label='Password' 
                           type='password'
                           value={requestedPassword} 
                           onChange={(event) => setPassword(event.target.value)}
                />
                <br/>
                <TextField style={styles.textInput} 
                           label='Confirm password' 
                           type='password'
                           value={confirmedPassword} 
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
