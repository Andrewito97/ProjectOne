import React from 'react';
import { Skeleton } from '@material-ui/lab';
import styleController from '../../StyleController';

const styles = {
    dummyText: {
        marginTop: 30,
        marginBottom: 30
    }
};

const DummyMovie = () => {

    const fakeTitle = 
    <Skeleton style={{backgroundColor: styleController.additionalColor}} animation='wave' height={50} width='60%'/> 

    const fakeTextLine = 
    <Skeleton style={{backgroundColor: styleController.additionalColor}} width='90%' animation='wave'/> 

    const fakeVideo = 
    <Skeleton style={{backgroundColor: styleController.additionalColor}} variant='rect' width='90%' animation='wave' height={500}/> 
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
