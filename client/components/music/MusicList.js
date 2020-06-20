import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Music from './Music';
import NewMusicForm from './NewMusicForm';
import authenticationHelper from '../../helpers/authentication.helper';
import musicApi from '../../api/music.api';
import DummyMusic from './DummyMusic';

const MusicList = () => {
    const [ music, setMusic ] = React.useState([]);
    const [ skip, setSkip ] = React.useState(0);
    const [ shouldLoadMore, setShouldLoadMore ] = React.useState(true);

    React.useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed) {
            loadMusic();
        };
        return () => isSubscribed = false;
    }, [skip]);

    const loadMusic = async () => {
        const data = await musicApi.listMusic(skip);
        if(data.error) {
            console.log(data.error);
        } 
        else {
            setMusic([...music, ...data]);
            if(data.length === 0) {
                setShouldLoadMore(false);
            };
        };
    };

    const updateMusicList = (item) => {
        let updatedMusic = [...music];
        updatedMusic.unshift(item);
        setMusic(updatedMusic);
    };

    return (
        <InfiniteScroll
            dataLength={music.length}
            hasMore={shouldLoadMore}
            next={() => setSkip(music.length)}
        >
            {authenticationHelper.isAuthenticated() ? (<NewMusicForm updateMusicList={updateMusicList}/>) : null}
            <div>
                { music.length === 0 ? <DummyMusic/> : music.map( (item, index) => <Music music={item} key={index}/> ) }
            </div>
        </InfiniteScroll>
    );
};

export default MusicList;