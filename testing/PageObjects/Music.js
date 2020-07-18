/* eslint-disable no-undef */
class Music {
	get musicAuthor() {
		return $('#music-title div span:nth-child(1)');
	}

	get musicGenre() {
		return $('#music-title div span:nth-child(2)');
	}

	get audioName() {
		return $('#audio-name');
	}

	get playPauseButton() {
		return $('#play-pause-button');
	}

	get audioVolumeButton() {
		return $('#audio-volume-button');
	}

	get musicDate() {
		return $('#music-date');
	}

	get deleteMusicButton() {
		return $('#delete-music-button');
	}
}

export default new Music();
