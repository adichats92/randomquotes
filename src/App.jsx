import { useState, useEffect } from 'react';
import axios from 'axios';
import Quote from './components/Quote';
import FavQuote from './components/FavQuote';
import SearchRes from './components/SearchRes';

function App() {
	const [quote, setQuote] = useState({});
	const [favQuote, setFavQuote] = useState([]);
	const [searchResult, setSearchResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	console.log(quote);
	const getQuote = () => {
		setIsLoading((prev) => !prev);
		axios
			.get('https://api.quotable.io/random')
			.then((res) => {
				setIsLoading((prev) => !prev);
				setQuote(res.data);
				setIsLoading();
			})
			.catch((error) => {
				console.error(error);
				setIsLoading((prev) => !prev);
			});
	};

	const handleSearch = () => {
		setIsLoading((prev) => !prev);
		axios
			.get(`https://api.quotable.io/search/quotes?query=${searchQuery}`)
			.then((res) => {
				setSearchResult(res.data.results);
				setIsLoading((prev) => !prev);
			})
			.catch((error) => {
				console.error(error);
				setIsLoading((prev) => !prev);
			});
	};

	useEffect(() => {
		getQuote();
	}, []);

	const handleClick = () => {
		if (quote._id && quote.content) {
			const exists = favQuote.some((favQ) => favQ.id === quote._id);
			if (!exists) {
				setFavQuote((prevQuotes) => [
					...prevQuotes,
					{ id: quote._id, content: quote.content },
				]);
			} else {
				alert('This quote already exists in your favorites!');
			}
		}
	};

	return (
		<>
			<div className='App'>
				<div className='block'>
					<Quote
						quote={quote}
						isLoading={isLoading}
					/>
					<button onClick={getQuote}>New Quote</button>
					<button onClick={() => handleClick(quote._id, quote.content)}>
						Add to Fav
					</button>
					<input
						type='text'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search quotes...'
					/>
					<button onClick={handleSearch}>Search</button>
					<SearchRes
						isLoading={isLoading}
						searchResult={searchResult}
						quote={quote}
						favQuote={favQuote}
						setFavQuote={setFavQuote}
					/>
				</div>
				<div className='block'>
					<FavQuote favQuote={favQuote} />
				</div>
			</div>
		</>
	);
}

export default App;
