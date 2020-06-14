import React from 'react';
import Music from './Music';
import NewMusicForm from './NewMusicForm';
import authenticationHelper from '../../helpers/authentication.helper';
import musicApi from '../../api/music.api';
import DummyMusic from './DummyMusic';

const MusicList = () => {
    const [ music, setMusic ] = React.useState([]);
    const [ dummyData, setDummyData ] = React.useState(true);

    React.useEffect(() => {
        loadMusic();
    }, []);

    const loadMusic = async () => {
        setDummyData(true)
        const musicData = await musicApi.listMusic();
        if(musicData.error) {
            console.log(musicData.error);
        } 
        else {
            setDummyData(false);
            setMusic(musicData);
        };
    };

    const updateMusicList = (item) => {
        let updatedMusic = [...music];
        updatedMusic.unshift(item);
        setMusic(updatedMusic);
    };

    return (
        <div>
            {authenticationHelper.isAuthenticated() ? (<NewMusicForm updateMusicList={updateMusicList}/>) : null}
            <div>
                { dummyData ? <DummyMusic/> : music.map( (item, index) => <Music music={item} key={index}/> ) }
            </div>
        </div>
    );
};

export default MusicList;