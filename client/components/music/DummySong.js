import React from 'react';
import { Skeleton } from '@material-ui/lab';

const styles = {
    dummyText: {
        marginTop: 30,
        marginBottom: 30
    }
};

const DummySong = () => {
    return (
        <div>
            <Skeleton animation='wave' height={50} width='60%'/> 
            <div style={styles.dummyText}>
                <Skeleton animation='wave'/> 
                <Skeleton animation='wave'/> 
                <Skeleton animation='wave'/> 
                <Skeleton animation='wave'/> 
                <Skeleton animation='wave'/> 
                <Skeleton animation='wave'/> 
                <Skeleton animation='wave'/> 
                <Skeleton animation='wave'/> 
            </div>
            <Skeleton variant='rect' animation='wave' height={500}/> 
        </div>
    )
};

export default DummySong;
