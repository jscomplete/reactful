export const rcc = (
  componentName: string,
): string => `import * as React from 'react';

export default class ${componentName} extends React.Component {
  render() {
    return (
      <div>
        ${componentName}...
      </div>
    );
  }
}`;

export const rfc = (
  componentName: string,
): string => `import * as React from 'react';

export default function ${componentName}() {
  return (
    <div>
      ${componentName}...
    </div>
  );
}`;

export const rtest = (
  componentName: string,
): string => `import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import ${componentName} from './${componentName}';

afterEach(cleanup);

describe('${componentName}', () => {
  it('renders', () => {
    const { asFragment } = render(<${componentName} />);

    expect(asFragment()).toMatchSnapshot();
  });
});`;
