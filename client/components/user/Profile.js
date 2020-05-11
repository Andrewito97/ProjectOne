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
import styleController from '../../StyleController';

const styles = {
    card: {
        padding: 37
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
        color: 'white',
        marginLeft: 8,
        position: 'absolute',
        right: 10,
        bottom: 0
    },
    saveButton: {
        color: 'white',
    },
    okButton: {
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
    const [ noChanges, setNoChanges ] = React.useState(false);

    React.useEffect( () => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const userId = authenticationHelper.isAuthenticated().user._id;
        const user = await userApi.getUserProfile(userId);
        setUserName(user.name);
        setUserEmail(user.email);
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
            setNoChanges('')
            setSuccessed(true);
        } else if(data.noChanges) {
            setNoChanges(data.noChanges)
        } else {
            setNoChanges('')
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
  
    return (
        <div>
            <Card 
                style={{
                    backgroundColor: styleController.cardColor,
                    ...styles.card
                }}
            >
                <CardContent>
                    <Typography 
                        variant='h5' 
                        style={{
                            color: styleController.textColor,
                            ...styles.pageHeader
                        }}
                    >
                        Profile
                    </Typography>
                    <div style={styles.nameContainer}>
                    { 
                        shouldEditName ? 
                        <TextField
                            size='small'
                            variant='outlined'
                            defaultValue={userName}
                            style={styles.nameField}
                            onChange={ (event) => setUserName(event.target.value) }
                        />
                        :
                        <Typography 
                            variant='h6'
                            style={{
                                color: styleController.textColor,
                                ...styles.nameField
                            }}
                        >
                            {userName}
                        </Typography>
                    }   
                    {       
                        shouldEditName ? 
                        <IconButton
                            onClick={() => setEditNameStatus(false)} 
                            size='small'
                            style={{
                                backgroundColor: styleController.mainColor,
                                ...styles.icons
                            }}
                        >
                            <SaveIcon/>
                        </IconButton>
                        :
                        <IconButton
                            onClick={() => setEditNameStatus(true)} 
                            size='small'
                            style={{
                                backgroundColor: styleController.mainColor,
                                ...styles.icons
                            }}
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
                            style={{
                                color: styleController.textColor,
                                ...styles.emailField
                            }}
                        >
                            {userEmail}
                        </Typography>      
                    }
                    {
                        shouldEditEmail ? 
                        <IconButton
                            onClick={() => setEditEmailStatus(false)} 
                            size='small'
                            style={{
                                backgroundColor: styleController.mainColor,
                                ...styles.icons
                            }}
                        >
                            <SaveIcon/>
                        </IconButton>
                        :
                        <IconButton
                            onClick={() => setEditEmailStatus(true)} 
                            size='small'
                            style={{
                                backgroundColor: styleController.mainColor,
                                ...styles.icons
                            }}
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
                            backgroundColor: isDisabled ? styleController.grey : styleController.mainColor,
                            ...styles.saveButton
                        }}
                    >
                        Save
                    </Button>
                    { noChanges ? (<Typography style={{color: 'orange'}}>{noChanges}</Typography>) : null }
                </CardContent>
            </Card>
            <ProfileTabs />
            <Dialog open={successed} disableBackdropClick={true}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Account data changed successfully
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={ () => setSuccessed(false) }
                        style={{
                            backgroundColor: styleController.mainColor,
                            ...styles.okButton
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default Profile;