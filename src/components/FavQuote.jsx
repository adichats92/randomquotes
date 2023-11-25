const FavQuote = ({ favQuote }) => {
	return (
		<div>
			<ul>
				<h2>My Favorite Quotes</h2>
				{favQuote.map((favQ) => (
					<li key={favQ.id}>
						<p>"{favQ.content}"</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FavQuote;
