import { nameFromPath } from './index';

describe('nameFormPath', () => {
  it('returns the last part of the path', () => {
    const name = nameFromPath('path/to/here');
    expect(name).toBe('here');
  });
  it('returns the argument if it is not a path', () => {
    const name = nameFromPath('there');
    expect(name).toBe('there');
  });
});
