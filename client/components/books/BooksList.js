import React from 'react';
import { isMobile } from 'react-device-detect';
import { Box, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import Book from './Book';
import NewBookForm from './NewBookForm';
import authenticationHelper from '../../helpers/authentication.helper';
import bookApi from '../../api/book.api';
import DummyBook from './DummyBook';
import paletteController from '../../PaletteController';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '10%',
		marginBottom: '7%'
	}
};

const BooksList = () => {
	const [ books, setBooks ] = React.useState([]);
	const [ skip, setSkip ] = React.useState(0);
	const [ shouldLoadMore, setShouldLoadMore ] = React.useState(true);

	React.useEffect(() => {
		loadBooks();
	}, [skip]);

	const loadBooks = async () => {
		let data = await bookApi.listBooks(skip);
		if(data.error) {
			console.log(data.error);
		} else {
			setBooks([...books, ...data]);
			if(data.length === 0) {
				setShouldLoadMore(false);
			};
		};
	};

	const updateBooks = (item) => {
		let updatedBooks = [...books];
		updatedBooks.unshift(item);
		setBooks(updatedBooks);
	};

	return (
		<Box style={styles.container}>
			{authenticationHelper.isAuthenticated() ? (<NewBookForm updateBooks={updateBooks}/>) : null}
			<InfiniteScroll
				dataLength={books.length}
				hasMore={shouldLoadMore}
				next={() => setSkip(books.length)}
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
				{ books.length === 0 ? <DummyBook/> : books.map( (item, index) => <Book book={item} key={index}/> ) }
			</InfiniteScroll>
		</Box>
	);
};

export default BooksList;
