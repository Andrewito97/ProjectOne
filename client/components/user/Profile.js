import React from 'react';
import { Card, 
         CardContent, 
         Typography,
         TextField,
         IconButton } from '@material-ui/core';
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
};

const Profile = () => {
    const [ userName, setUserName ] = React.useState('');
    const [ shouldEditName, setEditNameStatus ] = React.useState(false);
    const [ userEmail, setUserEmail ] = React.useState('');
    const [ shouldEditEmail, setEditEmailStatus ] = React.useState(false);

    React.useEffect( () => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const userId = authenticationHelper.isAuthenticated().user._id
        const user = await userApi.getUserProfile(userId);
        setUserName(user.name);
        setUserEmail(user.email);
    };

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
                </div>
                <ProfileTabs />
            </CardContent>
        </Card>
        </div>
    )
};

export default Profile;