import slugify from '../utils/slugify';

describe('slugify', () => {
  it('slugifies a standard string', () => {
    expect(slugify('This is a cool string')).toEqual('this-is-a-cool-string');
  });

  it('handles punctuation', () => {
    expect(slugify('Turkish İ and I and i and ı')).toEqual('turkish-i-and-i-and-i-and-i');
  });
});
