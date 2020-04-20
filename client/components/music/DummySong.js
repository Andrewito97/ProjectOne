import React from 'react';
import { Skeleton } from '@material-ui/lab';

const styles = {
    dummySong: {
        marginTop: 10,
        marginBottom: 10
    }
};

const DummySong = () => {
    return (
        <div>
            <Skeleton animation='wave' height={50} width='60%'/> 
            <Skeleton animation='wave' height={50} width='45%'/> 
            <div style={styles.dummySong}>
                <Skeleton width='90%' height={100} animation='wave'/> 
            </div>
            <div style={styles.dummySong}>
                <Skeleton width='90%' height={100} animation='wave'/> 
            </div>
            <div style={styles.dummySong}>
                <Skeleton width='90%' height={100} animation='wave'/> 
            </div>
            <div style={styles.dummySong}>
                <Skeleton width='90%' height={100} animation='wave'/> 
            </div>
        </div>
    )
};

export default DummySong;
