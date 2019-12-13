import React from 'react';

import { getBooks } from '../services/books';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: false,
      error: null,
    }
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const books = await getBooks();
      this.setState({ books, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  handleBookClick(bookId) {
    const { changeView } = this.props;
    changeView('details', { id: bookId });
  }

  render() {
    const { books, isLoading, error } = this.state;

    if (error) {
      return (
        <div>
          <p>Oops! Something went wrong!</p>
          <pre>{error.message}</pre>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div>
          <p>Loading books...</p>
        </div>
      );
    }

    const bookElements = books.map((book) => {
      return (
        <li
          onClick={this.handleBookClick.bind(this, book.id)}
          key={book.id}
          className="book"
        >
          {book.title} | {book.author}
        </li>
      );
    });

    return (
      <div>
        <button>Add new book</button>
        {books.length ? (
          <ul className="books">{bookElements}</ul>
        ) : (
          <p>No books in the library</p>
        )}
      </div>
    );
  }
}

export default Overview;
