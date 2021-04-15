import React from 'react';

import {
  getBookById,
  deleteBookById
} from '../services/books';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {},
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props;

    try {
      this.setState({ isLoading: true });
      const book = await getBookById(id);
      this.setState({ book, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  handleBackClick() {
    const { changeView } = this.props;
    changeView('');
  }

  handleEditClick() {
    const { changeView, id } = this.props;
    changeView('edit', { id });
  }

  async handleDeleteClick() {
    const { changeView, id } = this.props;

    if (!window.confirm('Are you sure?')) {
      return;
    }

    try {
      await deleteBookById(id);
      changeView('');
    } catch (error) {
      console.log('Deleting book failed', error);
    }
  }

  render() {
    const { id } = this.props;
    const { book, isLoading, error } = this.state;

    if (error) {
      return (
        <div>
          <p>Error: {error.message}</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div>
          <p>Loading book details...</p>
        </div>
      )
    }

    if (!book) {
      return (
        <div>
          <p>No book with id: {id} found</p>
        </div>
      );
    }

    return (
      <div>
        <button onClick={this.handleBackClick.bind(this)}>Back to overview</button>
        <img className="cover" src={book.coverImage} />
        <h3>{book.title}</h3>
        <h4>Written by {book.author}</h4>
        <p>{book.summary}</p>
        <button onClick={this.handleEditClick.bind(this)}>Edit</button>
        <button onClick={this.handleDeleteClick.bind(this)}>Delete</button>
      </div>
    );
  }
}

export default Details;
