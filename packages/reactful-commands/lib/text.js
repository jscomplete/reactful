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

export default const ${componentName} = (props) => {
  return (
    <div>
    </div>
  );
};`;

exports.rsc = (componentName) =>
  `import React from 'react';
import { ConnectedComponent } from 'state-components';

export default class ${componentName} extends ConnectedComponent {
  static stateMap = [];
  static actionsMap = {};

  render() {
    return (
      <div>
      </div>
    );
  }
}`;

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

exports.jest.rsc = (componentName) =>
  `import React from 'react';
import { shallowRender } from 'immutable-state-components/helpers';

import ${componentName} from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    const wrapper = shallowRender(<${componentName} />, {
      initialData: {},
      initialState: {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});`;
