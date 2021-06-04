import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import InfiniteScroll from 'react-infinite-scroll-component';
import Music from './Music';
import NewMusicForm from './NewMusicForm';
import MusicGenreSelect from './MusicGenreSelect';
import DummyMusic from './DummyMusic';
import authenticationHelper from '../../helpers/authentication.helper';
import cookieHelper from '../../helpers/cookie.helper';
import musicApi from '../../api/music.api';
import paletteController from '../../PaletteController';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '10%',
		marginBottom: '7%'
	}
};

const MusicList = () => {
	const [ music, setMusic ] = React.useState([]);
	const [ genre, setGenre ] = React.useState('All');
	const [ skip, setSkip ] = React.useState(0);
	const [ shouldLoadMore, setShouldLoadMore ] = React.useState(true);
	const [ audioToPlay, setAudioToPlay ] = React.useState([{}]);
		
	React.useEffect(() => {
		setData();
	}, [skip]);

	const setData = () => {
		if(cookieHelper.getCookie('OneProjectMusic')) {
			setGenre(cookieHelper.getCookie('OneProjectMusic'));
			loadMusic(cookieHelper.getCookie('OneProjectMusic'));
		} else {
			setGenre('All');
			loadMusic('All');
		};
	};

	const loadMusic = async (genre) => {
		let data = await musicApi.listMusic(genre, skip);
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

	const handleChange = (event) => {
		setMusic('');
		setGenre(event.target.value);
		cookieHelper.setCookie('OneProjectMusic', event.target.value);
		location.reload();
	};

	const handleAutoplay = (musicId, currentAudio) => {
		const audiosToPlay = [];
		for(let item of music) {
			for(let audio of item.audios) {
				audiosToPlay.push({musicId: item._id, audio: audio});
			}
		}
		const nextAudio = audiosToPlay[audiosToPlay.findIndex((item) => {
			return  item.musicId === musicId && item.audio === currentAudio;
		}) + 1];
		setAudioToPlay(nextAudio);
	};

	return (
		<Box style={styles.container}>
			{authenticationHelper.isAuthenticated() ? (<NewMusicForm updateMusicList={updateMusicList}/>) : null}
			<MusicGenreSelect value={genre} handleChange={handleChange}/>
			<InfiniteScroll
				dataLength={music.length}
				hasMore={shouldLoadMore}
				next={() => setSkip(music.length)}
				loader={
					<Typography variant='h5' align='center' style={{color: paletteController.textColor}}>
						Loading...
					</Typography>
				}
				style={{
					paddingRight: isMobile ? 0 : 10,
					paddingLeft: isMobile ? 0 : 10
				}}
			>
				{
					music.length === 0 ? 
						<DummyMusic/> 
						:
						music.map( (item, index) => (
							<Music music={item} key={index} handleAutoplay={handleAutoplay} audioToPlay={audioToPlay}/> 
						)) 
				}
			</InfiniteScroll>
		</Box>
	);
};

export default MusicList;
