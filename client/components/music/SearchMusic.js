import React from 'react';
import { Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Music from './Music';
import musicApi from '../../api/music.api';
import DummyMusic from './DummyMusic';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '10%',
		marginBottom: '7%'
	},
};

const SearchMusic = () => {
	const [ music, setMusic ] = React.useState([]);

	const { musicId } = useParams();

	React.useEffect(() => {
		loadMusic();
	}, [musicId]);

	const loadMusic = async () => {
		let data = await musicApi.findMusic(musicId);
		if(data.error) {
			console.log(data.error);
		} else {
			setMusic(data);
		}
	};

	return (
		<Box style={styles.container}>
			{ music.length === 0 ? <DummyMusic/> : <Music music={music}/> }
		</Box>
	);
};

export default SearchMusic;
