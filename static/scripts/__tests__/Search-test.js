jest.unmock('../modules/Search');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import config from  '../config.json';
import { TypeAhead } from '../modules/Search';

describe('Type ahead', () => {
    const $ = require('jquery');
    const resultData = {
        results: [
            {
                title: 'Film one',
                id: 1,
                rating: 1.5,
                date: 1468578092970,
                poster_url: 'poster-one-url'
            },
            {
                title: 'Film two',
                id: 2,
                rating: 2.5,
                date: 1468578092970,
                poster_url: 'poster-two-url'
            }
        ]
    };
    const payload = {
        api_key: config.apiKey,
        query: 'my query',
        page: 1,
        include_adult: false,
        search_type: 'ngram'
    };

    beforeEach(() => {
        // Reset ajax mock, so our call counts are more legit
        $.ajax = jest.fn();
        $.ajax.mockReturnValue({
            done: (callback) => callback(resultData)
        });
    });

    it('fetches when you type', () => {
        const typeAhead = TestUtils.renderIntoDocument(<TypeAhead/>);
        const typeAheadNode = ReactDOM.findDOMNode(typeAhead);
        var searchInput = TestUtils.findRenderedDOMComponentWithTag(typeAhead, 'input');
        var $dfd;

        typeAhead.setState({query: payload.query});
        TestUtils.Simulate.change(searchInput);

        expect(searchInput.value).toEqual(payload.query);
        expect($.ajax.mock.calls.length).toBe(1);
        expect($.ajax).toBeCalledWith({
            dataType: 'jsonp',
            url: `${config.apiUrl}search/movie`,
            data: payload
        });
        expect(typeAhead.state.results.length).toBe(2);
        expect(typeAhead.state.results[0].title).toBe(resultData.results[0].title);
    });

    it('doesn\'t fetch for queries under 3 chars', () => {
        const typeAhead = TestUtils.renderIntoDocument(<TypeAhead/>);
        const typeAheadNode = ReactDOM.findDOMNode(typeAhead);
        var searchInput = TestUtils.findRenderedDOMComponentWithTag(typeAhead, 'input');

        typeAhead.setState({query: '..'});
        TestUtils.Simulate.change(searchInput);

        expect($.ajax.mock.calls.length).toBe(0);
    });

    it('changes selected item with arrow keys', () => {
        var typeAhead = TestUtils.renderIntoDocument(<TypeAhead/>);
        var searchInput = TestUtils.findRenderedDOMComponentWithTag(typeAhead, 'input');
        var typeAheadNode = ReactDOM.findDOMNode(typeAhead);
        var up = () => {
            TestUtils.Simulate.keyDown(searchInput, {
                key: 'ArrowUp', keyCode: 38, which: 38
            });
        }
        var down = () => {
            TestUtils.Simulate.keyDown(searchInput, {
                key: 'ArrowDown', keyCode: 40, which: 40
            });
        }

        typeAhead.setState({query: '...'});
        TestUtils.Simulate.change(searchInput);

        expect(typeAhead.state.selected).toBe(0);
        down();
        expect(typeAhead.state.selected).toBe(1);
        up();
        expect(typeAhead.state.selected).toBe(0);
        // Now make sure we can't move past the limits
        up();
        up();
        expect(typeAhead.state.selected).toBe(0);
        down();
        down();
        down();
        expect(typeAhead.state.selected).toBe(typeAhead.state.results.length);
    });
});
