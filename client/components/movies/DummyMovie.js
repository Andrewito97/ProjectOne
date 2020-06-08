import React from 'react';
import { Skeleton } from '@material-ui/lab';
import paletteController from '../../PaletteController';

const styles = {
    dummyText: {
        marginTop: 30,
        marginBottom: 30
    }
};

const DummyMovie = () => {

    const fakeTitle = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={45} width='60%'/> 

    const fakeTextLine = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={27} width='90%'/> 

    const fakeVideo = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={300} width='90%' variant='rect'/> 
    return (
        <div>
            {fakeTitle}
            <div style={styles.dummyText}>
                {fakeTextLine}
                {fakeTextLine}
                {fakeTextLine}
                {fakeTextLine}
                {fakeTextLine}
                {fakeTextLine}
                {fakeTextLine}
                {fakeTextLine}
            </div>
            {fakeVideo}
        </div>
    )
};

export default DummyMovie;
