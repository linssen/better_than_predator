'use strict';

describe('BTP filters', function () {

    beforeEach(module('btp.filters'));

    describe('urlize', function() {

        it('should convert complex strings to safe urls', inject(function(urlizeFilter) {
            expect(urlizeFilter('Honey, I Shrunk The Kids')).toEqual('honey-i-shrunk-the-kids');
        }));
    });
});