import React from 'react';
import './App.css';

import Overview from './components/Overview';
import Details from './components/Details';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: '',
      params: {},
    };
  }

  handleChangeView(view = '', params = {}) {
    this.setState({ view, params });
  }

  render() {
    const { view, params } = this.state;

    let ActiveView;

    switch (view) {
      case 'details':
        ActiveView = Details;
        break;
      default:
        ActiveView = Overview;
    }

    return (
      <div>
        <h1>Library App</h1>
        <ActiveView
          {...params}
          changeView={this.handleChangeView.bind(this)}
        />
      </div>
    );
  }
}

export default App;
