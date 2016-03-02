jest.dontMock('../utils/StringUtils');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const StringUtils = require('../utils/StringUtils');

describe('slugify', () => {
    it('transforms a string neatly', () => {
        let str = 'Hello, world.';
        let slug = StringUtils.slugify(str);
        expect(slug).toEqual('hello-world');
    });

    it('swaps unicode characters for their uri encoded counterpart', () => {
        let str = 'Hello, ☃.';
        let slug = StringUtils.slugify(str);
        expect(slug).toEqual('hello-%E2%98%83');
    });
});
