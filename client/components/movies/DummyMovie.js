import React from 'react';
import { Skeleton } from '@material-ui/lab';

const styles = {
    dummyText: {
        marginTop: 30,
        marginBottom: 30
    }
};

const DummyMovie = () => {
    return (
        <div>
            <Skeleton animation='wave' height={50} width='60%'/> 
            <div style={styles.dummyText}>
                <Skeleton width='90%' animation='wave'/> 
                <Skeleton width='90%' animation='wave'/> 
                <Skeleton width='90%' animation='wave'/> 
                <Skeleton width='90%' animation='wave'/> 
                <Skeleton width='90%' animation='wave'/> 
                <Skeleton width='90%' animation='wave'/> 
                <Skeleton width='90%' animation='wave'/> 
                <Skeleton width='90%' animation='wave'/> 
            </div>
            <Skeleton variant='rect' width='90%' animation='wave' height={500}/> 
        </div>
    )
};

export default DummyMovie;
