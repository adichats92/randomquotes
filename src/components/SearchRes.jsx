import Spinner from 'react-bootstrap/Spinner';
const FavQuote = ({ searchResult, isLoading, favQuote, setFavQuote }) => {
	const handleSearchClick = (id, content) => {
		if (searchResult && favQuote) {
			const exists = favQuote.some((favQ) => favQ.id === id);
			if (!exists) {
				setFavQuote((prevQuotes) => [...prevQuotes, { id, content }]);
			} else {
				alert('This quote already exists in your favorites!');
			}
		}
	};

	return (
		<div className='block'>
			<ul className='highlight'>
				{isLoading ? (
					<Spinner
						animation='border'
						variant='primary'
					/>
				) : (
					<div>
						<h2>Search Results</h2>
						{searchResult.map((result) => (
							<li key={result._id}>
								<p style={{ display: 'inline' }}>"{result.content}"</p>
								<button
									style={{
										display: 'inline',
										borderRadius: '40%',
										padding: '0, 1',
									}}
									onClick={() => handleSearchClick(result._id, result.content)}
								>
									☆
								</button>
							</li>
						))}
					</div>
				)}
			</ul>
		</div>
	);
};
export default FavQuote;
