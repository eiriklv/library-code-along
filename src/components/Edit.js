import React from 'react';

import {
  updateBook,
  getBookById,
} from '../services/books';

class Edit extends React.Component {
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

  handleCancelClick(event) {
    event.preventDefault();
    const { changeView, id } = this.props;
    changeView('details', { id });
  }

  async handleSaveClick(event) {
    event.preventDefault();
    const { changeView, id } = this.props;
    const { book } = this.state;

    try {
      await updateBook(book);
      changeView('details', { id });
    } catch (error) {
      console.log('Deleting book failed', error);
    }
  }

  handleInputChange(field, event) {
    this.setState({
      book: {
        ...this.state.book,
        [field]: event.target.value
      }
    });
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
        <h3>Edit book</h3>
        <form id="form" className="book-form">
          <label htmlFor="title">
            Title
            <input type="text" name="title" value={book.title} onChange={this.handleInputChange.bind(this, 'title')} />
          </label>
          <label htmlFor="author">
            Author
            <input type="text" name="author" value={book.author} onChange={this.handleInputChange.bind(this, 'author')} />
          </label>
          <label htmlFor="coverImage">
            Cover Image Link
            <input type="text" name="coverImage" value={book.coverImage} onChange={this.handleInputChange.bind(this, 'coverImage')} />
          </label>
          <label htmlFor="summary">
            Short Summary
            <input type="text" name="summary" value={book.summary} onChange={this.handleInputChange.bind(this, 'summary')} />
          </label>
          <button onClick={this.handleSaveClick.bind(this)}>Save</button>
          <button onClick={this.handleCancelClick.bind(this)}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default Edit;
