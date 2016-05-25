import 'test-helper';
import transform from 'function-to-constructor';

describe('functionToConstructor', () => {
  it('transforms RegExp function calls into new expressions', () => {
    expect(transform).to.transform('function-to-constructor/basic');
  });
});
