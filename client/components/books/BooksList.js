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

const BooksList = () => {
	const [ books, setBooks ] = React.useState([]);
	const [ skip, setSkip ] = React.useState(0);
	const [ shouldLoadMore, setShouldLoadMore ] = React.useState(true);

	React.useEffect(() => {
		const controller = new window.AbortController();
		const signal = controller.signal;
		loadBooks(signal);
		return function cleanup() {
			controller.abort();
		};
	}, [skip]);

	const loadBooks = async (signal) => {
		let data = await bookApi.listBooks(skip, signal);
		if(data === undefined) return;
		if(data.error) {
			console.log(data.error);
		} else {
			setBooks([...books, ...data]);
			if(data.length === 0) {
				setShouldLoadMore(false);
			}
		}
	};

	const updateBooks = (item) => {
		let updatedBooks = [...books];
		updatedBooks.unshift(item);
		setBooks(updatedBooks);
	};

	return (
		<Box>
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
