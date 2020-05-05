import React from 'react';
import { Card, 
         CardContent, 
         Typography,
         TextField,
         IconButton,
         Button,
         Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         DialogActions } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import userApi from '../../api/user.api';
import authenticationHelper from '../../helpers/authentication.helper';
import ProfileTabs from './ProfileTabs';

const styles = {
    container: {
        width: '100%',
        minHeight: 200,
        padding: 50
    },
    pageHeader: {
        marginBottom: 40
    },
    nameContainer: {
        width: '100%', 
        position: 'relative'
    },
    emailContainer: {
        width: '100%', 
        position: 'relative',
        marginBottom: 50
    },
    nameField: {
        width: '60%'
    },
    emailField: {
        width: '60%'
    },
    icons: {
        backgroundColor: '#2D986D',
        color: 'white',
        marginLeft: 8,
        position: 'absolute',
        right: 10,
        bottom: 0
    },
    saveButton: {
        backgroundColor: '#2D986D',
        color: 'white',
        marginTop: 60
    }
};

const Profile = () => {
    const [ userName, setUserName ] = React.useState('');
    const [ userNameError, setUserNameError ] = React.useState('');
    const [ shouldEditName, setEditNameStatus ] = React.useState(false);
    const [ userEmail, setUserEmail ] = React.useState('');
    const [ userEmailError, setUserEmailError ] = React.useState('');
    const [ shouldEditEmail, setEditEmailStatus ] = React.useState(false);
    const [ successed, setSuccessed ] = React.useState(false);

    //for preventing to save no changed data 
    const [ savedName, setSavedName ] = React.useState('');
    const [ savedEmail, setSavedEmail ] = React.useState('');

    React.useEffect( () => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const userId = authenticationHelper.isAuthenticated().user._id;
        const user = await userApi.getUserProfile(userId);
        setUserName(user.name);
        setUserEmail(user.email);
        setSavedName(user.name);
        setSavedEmail(user.email);
    };

    const updateUser = async () => {
        const updatedUser = {
            name: userName,
            email: userEmail
        };
        const userId = authenticationHelper.isAuthenticated().user._id;
        const data = await userApi.updateUserProfile(userId, updatedUser);
        if(data.success) {
            setUserEmailError('');
            setUserNameError('');
            setSuccessed(true);
            setSavedName(userName);
            setSavedEmail(userEmail);
        } else {
            if(data.error.code) {
                setUserEmailError('Email is already existss !');
            } else {
                data.error.errors.email ? 
                    setUserEmailError(data.error.errors.email.message) : 
                    setUserEmailError('');
                data.error.errors.name ? 
                    setUserNameError('Inappropriate name length !') : 
                    setUserNameError('');
            };
        };
    };

    let isDisabled = shouldEditName || shouldEditEmail;
    isDisabled = savedName === userName ? (savedEmail === userEmail ? true : false) : false;
  
    return (
        <div>
        <Card style={styles.container}>
            <CardContent style={styles.content}>
                <Typography variant='h5' style={styles.pageHeader}>Profile</Typography>
                <div style={styles.nameContainer}>
                { 
                    shouldEditName ? 
                    <TextField
                        size='small'
                        variant='outlined'
                        defaultValue={userName}
                        style={styles.nameField}
                        onChange={ (event) => setUserName(event.target.value)}
                    />
                    :
                    <Typography 
                        variant='h6'
                        style={styles.nameField}
                    >
                        {userName}
                    </Typography>
                }   
                {       
                    shouldEditName ? 
                    <IconButton
                        onClick={() => setEditNameStatus(false)} 
                        size='small'
                        style={styles.icons}
                    >
                        <SaveIcon/>
                    </IconButton>
                    :
                    <IconButton
                        onClick={() => setEditNameStatus(true)} 
                        size='small'
                        style={styles.icons}
                    >
                        <EditIcon/>
                    </IconButton>
                }
                { userNameError ? (<Typography color='error'>{userNameError}</Typography>) : null }
                </div>
                <br/>
                <div style={styles.emailContainer}>
                {
                    shouldEditEmail ?
                    <TextField
                        size='small'
                        variant='outlined'
                        defaultValue={userEmail}
                        style={styles.emailField}
                        onChange={ (event) => setUserEmail(event.target.value)}
                    />           
                    :
                    <Typography 
                        variant='h6'
                        style={styles.emailField}
                    >
                        {userEmail}
                    </Typography>      
                }
                {
                    shouldEditEmail ? 
                    <IconButton
                        onClick={() => setEditEmailStatus(false)} 
                        size='small'
                        style={styles.icons}
                    >
                        <SaveIcon/>
                    </IconButton>
                    :
                    <IconButton
                        onClick={() => setEditEmailStatus(true)} 
                        size='small'
                        style={styles.icons}
                    >
                        <EditIcon/>
                    </IconButton>
                }
                { userEmailError ? (<Typography color='error'>{userEmailError}</Typography>) : null }
                </div>
                <br/>
                <Button 
                    disabled={isDisabled} 
                    onClick={updateUser} 
                    style={{
                        backgroundColor: isDisabled ? '#BCC0B8' : '#2D986D',
                        color: 'white',
                    }}
                >
                    Save
                </Button>
                <ProfileTabs />
            </CardContent>
        </Card>
        <Dialog open={successed} disableBackdropClick={true}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Account data changed successfully
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        style={styles.icons}
                        onClick={ () => setSuccessed(false) }
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default Profile;