import React from 'react';
import { Card, 
         CardContent, 
         Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import userApi from '../../api/user.api';
import ProfileTabs from './ProfileTabs';

const styles = {
    container: {
        width: '100%',
        minHeight: 200,
        padding: 50
    }
};

const Profile = () => {
    const [ userName, setUserName] = React.useState('')
    const [ userEmail, setUserEmail] = React.useState('')

    let params = useParams();

    React.useEffect( () => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const user = await userApi.getUserProfile(params.userId);
        setUserName(user.name);
        setUserEmail(user.email);
    };

    return (
        <div>
        <Card style={styles.container}>
            <CardContent style={styles.content}>
                <Typography variant='h5'>Profile</Typography>
                <Typography>{userName}</Typography>
                <Typography>{userEmail}</Typography>
                <ProfileTabs />
            </CardContent>
        </Card>
        </div>
    )
};

export default Profile;