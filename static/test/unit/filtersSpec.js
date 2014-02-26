'use strict';

describe('BTP filters', function () {

    beforeEach(module('btp.filters'));

    describe('urlize', function () {
        it('should convert complex strings to safe urls', inject(function (urlizeFilter) {
            expect(urlizeFilter('Big %&#! Zombie')).toEqual('big-zombie');
        }));
    });

    describe('truncate', function () {
        it('should truncate a long string', inject(function (truncateFilter) {
            expect(truncateFilter('A very long name', 9)).toEqual('A very l…');
        }));
    });
});