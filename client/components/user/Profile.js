import React from 'react';
import { Card, 
         CardContent, 
         Typography,
         TextField,
         IconButton,
         Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import userApi from '../../api/user.api';
import postApi from '../../api/post.api';
import musicApi from '../../api/music.api';
import movieApi from '../../api/movie.api';
import authenticationHelper from '../../helpers/authentication.helper';
import ProfileTabs from './ProfileTabs';
import paletteController from '../../PaletteController';
import ConfirmWindow from '../ConfirmWindow';
import SuccessWindow from '../SuccessWindow';

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
    cardFooterContainer: {
        position: 'relative'
    },
    saveButton: {
        color: 'white'
    }
};

const Profile = () => {
    const [ userName, setUserName ] = React.useState('');
    const [ userNameError, setUserNameError ] = React.useState('');
    const [ shouldEditName, setEditNameStatus ] = React.useState(false);
    const [ userEmail, setUserEmail ] = React.useState('');
    const [ userEmailError, setUserEmailError ] = React.useState('');
    const [ shouldEditEmail, setEditEmailStatus ] = React.useState(false);
    const [ successedUpdate, setSuccessedUpdate ] = React.useState(false);
    const [ successedDelete, setSuccessedDelete ] = React.useState(false);
    const [ confirm, setConfirm ] = React.useState(false)
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
            setSuccessedUpdate(true);
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

    const deleteUser = async () => {
        const userId = authenticationHelper.isAuthenticated().user._id;
        const userPosts = await postApi.getUserNewsFeed(userId);
        const userMusic = await musicApi.getUserMusic(userId);
        const userMovies = await movieApi.getUserMovies(userId);
        for(let post of userPosts) {
            await postApi.deletePost(post._id);
        };
        for(let music of userMusic) {
            let audios = music.audios;
            for(let audio of audios) {
                await musicApi.deleteAudio(audio);
            };
            await musicApi.deleteMusic(music._id);
        };
        for(let movie of userMovies) {
            const videoData = await movieApi.deleteVideo(movie._id);
            if(videoData.success) {
                await movieApi.deleteMovie(movie._id);
            };
        };
        const data = await userApi.deleteUserProfile(userId);
        if(data.success) setSuccessedDelete(true);
        await userApi.logout();
    };

    const toMainPage = () => {
        location.replace('/');
    };

    let isDisabled = shouldEditName || shouldEditEmail;
  
    return (
        <div>
            <Card 
                style={{
                    backgroundColor: paletteController.cardColor,
                    ...styles.card
                }}
            >
                <CardContent>
                    <Typography 
                        variant='h5' 
                        style={{
                            color: paletteController.textColor,
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
                                color: paletteController.textColor,
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
                                backgroundColor: paletteController.mainColor,
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
                                backgroundColor: paletteController.mainColor,
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
                                color: paletteController.textColor,
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
                                backgroundColor: paletteController.mainColor,
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
                                backgroundColor: paletteController.mainColor,
                                ...styles.icons
                            }}
                        >
                            <EditIcon/>
                        </IconButton>
                    }
                    { userEmailError ? (<Typography color='error'>{userEmailError}</Typography>) : null }
                    </div>
                    <br/>
                    <div style={styles.cardFooterContainer}>
                        <Button 
                            disabled={isDisabled} 
                            onClick={updateUser} 
                            style={{
                                backgroundColor: isDisabled ? paletteController.grey : paletteController.mainColor,
                                ...styles.saveButton
                            }}
                        >
                            Save
                        </Button>
                        { noChanges ? (<Typography style={{color: 'orange'}}>{noChanges}</Typography>) : null }

                        <IconButton
                            onClick={() => setConfirm(true)}
                            style={{
                                backgroundColor: paletteController.mainColor,
                                ...styles.icons
                            }}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
            <ProfileTabs />
            <SuccessWindow
                open={successedUpdate}
                message='Account data changed successfully'
                onClick={() => setSuccessedUpdate(false)}
            />
            <SuccessWindow
                open={successedDelete}
                message='Account deleted successfully'
                onClick={() => { 
                    setSuccessedDelete(false); 
                    toMainPage();
                }}
            />
            <ConfirmWindow
                open={confirm}
                onCancel={() => setConfirm(false)}
                onConfirm={deleteUser}
                title='Delete Account confirmation'
            />
        </div>
    )
};

export default Profile;