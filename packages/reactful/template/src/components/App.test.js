import React from 'react';
import { App } from './App';

import renderer from 'react-test-renderer';

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<App initialData={{ appName: 'TEST' }} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
