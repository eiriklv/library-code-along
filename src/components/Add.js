import React from 'react';

import {
  addBook,
} from '../services/books';

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {},
    };
  }

  handleCancelClick(event) {
    event.preventDefault();
    const { changeView } = this.props;
    changeView('');
  }

  async handleSaveClick(event) {
    event.preventDefault();
    const { changeView } = this.props;
    const { book } = this.state;

    try {
      const newBook = await addBook(book);
      changeView('details', { id: newBook.id });
    } catch (error) {
      console.log('Creating book failed', error);
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
    const { book } = this.state;

    return (
      <div>
        <h3>Add book</h3>
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
          <button onClick={this.handleSaveClick.bind(this)}>Add</button>
          <button onClick={this.handleCancelClick.bind(this)}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default Add;
