import React from 'react';
import { Skeleton } from '@material-ui/lab';
import paletteController from '../../PaletteController';

const styles = {
    dummySong: {
        marginTop: 10,
        marginBottom: 10
    }
};

const DummySong = () => {

    const dummySong = (
        <div style={styles.dummySong}>
            <Skeleton 
                width='30%' 
                height={25} 
                animation='wave'
                style={{backgroundColor: paletteController.additionalColor}} 
            /> 
            <Skeleton 
                width='80%' 
                height={70} 
                animation='wave'
                style={{backgroundColor: paletteController.additionalColor}} 
            /> 
        </div>
    )

    return (
        <div>
            <Skeleton 
                animation='wave' 
                height={40} 
                width='60%'
                style={{backgroundColor: paletteController.additionalColor}} 
            /> 
            <Skeleton 
                animation='wave' 
                height={40} 
                width='45%'
                style={{backgroundColor: paletteController.additionalColor}} 
            /> 
            {dummySong}
            {dummySong}
            {dummySong}
            {dummySong}
        </div>
    )
};

export default DummySong;
