import React from 'react';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>{this.props.appName}</h1>
        Awesome App Here...
      </div>
    );
  }
}

export default App;
