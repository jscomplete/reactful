/* eslint indent: "off" */

exports.rcc = (componentName) =>
  `import React from 'react';

export default class ${componentName} extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}`;

exports.rpc = (componentName) =>
  `import React from 'react';

export default class ${componentName} extends React.PureComponent {
  render() {
    return (
      <div>
      </div>
    );
  }
}`;

exports.rfc = (componentName) =>
  `import React from 'react';

export default const ${componentName} = ({}) => {
  return (
    <div>
    </div>
  );
};`;

exports.jest = {};

exports.jest.default = (componentName) =>
  `import React from 'react';
import renderer from 'react-test-renderer';

import ${componentName} from './${componentName}';

describe('${componentName}', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <${componentName} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});`;
