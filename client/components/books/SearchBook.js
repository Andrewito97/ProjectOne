import React from 'react';
import { Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Book from './Book';
import bookApi from '../../api/book.api';
import DummyBook from './DummyBook';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '3%',
		marginBottom: '7%'
	}
};

const SearchBook = () => {
	const [ book, setBook ] = React.useState([]);

	const { bookId } = useParams();

	React.useEffect(() => {
		loadBook();
	}, [bookId]);

	const loadBook = async () => {
		let data = await bookApi.findBook(bookId);
		if(data.error) {
			console.log(data.error);
		} else {
			setBook(data);
		}
	};

	return (
		<Box style={styles.container}>
			{ book.length === 0 ? <DummyBook/> : <Book book={book}/> }
		</Box>
	);
};

export default SearchBook;
