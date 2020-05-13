import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styleController from '../../StyleController';

const styles = {
    dummySong: {
        marginTop: 10,
        marginBottom: 10
    }
};

const DummySong = () => {
    return (
        <div>
            <Skeleton 
                animation='wave' 
                height={50} 
                width='60%'
                style={{backgroundColor: styleController.additionalColor}} 
            /> 
            <Skeleton 
                animation='wave' 
                height={50} 
                width='45%'
                style={{backgroundColor: styleController.additionalColor}} 
            /> 
            <div style={styles.dummySong}>
                <Skeleton 
                    width='70%' 
                    height={75} 
                    animation='wave'
                    style={{backgroundColor: styleController.additionalColor}} 
                /> 
            </div>
            <div style={styles.dummySong}>
                <Skeleton 
                    width='70%' 
                    height={75} 
                    animation='wave'
                    style={{backgroundColor: styleController.additionalColor}} 
                /> 
            </div>
            <div style={styles.dummySong}>
                <Skeleton 
                    width='70%' 
                    height={75} 
                    animation='wave'
                    style={{backgroundColor: styleController.additionalColor}} 
                /> 
            </div>
            <div style={styles.dummySong}>
                <Skeleton
                    width='70%' 
                    height={75} 
                    animation='wave'
                    style={{backgroundColor: styleController.additionalColor}}
                /> 
            </div>
        </div>
    )
};

export default DummySong;
