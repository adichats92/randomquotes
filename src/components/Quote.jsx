import Spinner from 'react-bootstrap/Spinner';
const Quote = ({ quote, isLoading }) => {
	return (
		<div>
			<h2>A Random Quote</h2>
			<div>
				{isLoading ? (
					<Spinner
						animation='border'
						variant='primary'
					/>
				) : (
					<div>
						<p className='highlight'>"{quote.content}"</p>
						<h4>~{quote.author}</h4>
					</div>
				)}
			</div>
		</div>
	);
};

export default Quote;
