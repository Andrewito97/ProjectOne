import React from 'react';
import Music from './Music';
import NewMusicForm from './NewMusicForm';
import authenticationHelper from '../../helpers/authentication.helper';
import musicApi from '../../api/music.api';
import DummySong from './DummySong';

const MusicList = () => {
    const [ music, setMusic ] = React.useState([]);
    const [ shouldUpdate, setUpdate ] = React.useState(false);
    const [ dummyData, setDummyData ] = React.useState(true);

    React.useEffect(() => {
        loadMusic();
        if(shouldUpdate) {
            loadMusic();
        }
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

    const updateMusicList = () => {
        setUpdate(!shouldUpdate);
    };

    return (
        <div>
            {authenticationHelper.isAuthenticated() ? (<NewMusicForm updateMusicList={updateMusicList}/>) : null}
            <div>
                { 
                dummyData ? <DummySong/>    
                :
                music.map( (item, index) => <Music music={item} key={index}/> )
                }
            </div>
        </div>
    );
};

export default MusicList;