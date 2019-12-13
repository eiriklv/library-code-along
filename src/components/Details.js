import React from 'react';

class Details extends React.Component {
  render() {
    const { id } = this.props;

    return (
      <div>This is the details view for book with id: {id}</div>
    );
  }
}

export default Details;
