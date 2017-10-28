import React from 'react';
import PropTypes from 'prop-types';

class App extends React.PureComponent {
  static propTypes = {
    initialData: PropTypes.object,
  };
  render() {
    return (
      <div>
        <h1>{this.props.initialData.appName}</h1>
        Awesome App Here...
      </div>
    );
  }
}

export default App;
