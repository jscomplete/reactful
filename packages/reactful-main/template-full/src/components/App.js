import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { syncAction, asyncAction } from 'store/actions';

export class App extends React.PureComponent {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    syncAction: PropTypes.func.isRequired,
    asyncAction: PropTypes.func.isRequired,
    currentError: PropTypes.string,
    message: PropTypes.string,
  };

  render() {
    return (
      <div>
        <h1>{this.props.appName}</h1>
        <p>Awesome App Here...</p>
        <a href="#" onClick={this.props.syncAction}>
          Sync Test
        </a>{' '}
        | {' '}
        <a href="#" onClick={this.props.asyncAction}>
          ASync Test
        </a>
        <div style={{ color: 'red' }}>{this.props.currentError}</div>
        <div style={{ color: 'green' }}>{this.props.message}</div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    currentError: state.get('currentError'),
    message: state.get('message'),
    appName: state.get('appName'),
  }),
  { syncAction, asyncAction }
)(App);
