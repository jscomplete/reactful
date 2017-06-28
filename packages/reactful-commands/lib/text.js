/* eslint indent: "off" */

exports.rcc = (componentName, pure = true) =>
  `import React from 'react';

class ${componentName} extends React.${pure ? 'Pure' : ''}Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default ${componentName};`;

exports.rfc = (componentName) =>
  `import React from 'react';

const ${componentName} = (props) => {
  return (
    <div>
    </div>
  );
};

export default ${componentName};`;

exports.jestSnap = (componentName) =>
  `import React from 'react';
import ${componentName} from '../${componentName}';

import renderer from 'react-test-renderer';

describe('${componentName}', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <${componentName} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});`;
