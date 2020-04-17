/* eslint indent: 'off' */

exports.rcc = (componentName) => `import * as React from 'react';

export default class ${componentName} extends React.Component {
  render() {
    return (
      <div>
        ${componentName}...
      </div>
    );
  }
}`;

exports.rpc = (componentName) => `import * as React from 'react';

export default class ${componentName} extends React.PureComponent {
  render() {
    return (
      <div>
        ${componentName}...
      </div>
    );
  }
}`;

exports.rfc = (componentName) => `import * as React from 'react';

export default function ${componentName}() {
  return (
    <div>
      ${componentName}...
    </div>
  );
}`;

exports.jest = {};

exports.jest.default = (componentName) => `import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import ${componentName} from './${componentName}';

afterEach(cleanup);

describe('${componentName}', () => {
  it('renders', () => {
    const { asFragment } = render(<${componentName} />);

    expect(asFragment()).toMatchSnapshot();
  });
});`;
