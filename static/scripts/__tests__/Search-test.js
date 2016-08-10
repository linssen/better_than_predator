jest.unmock('../modules/Search');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import config from  '../config.json';
import { TypeAhead } from '../modules/Search';
import Film from '../models/Film';

describe('Type ahead', () => {
    const $ = require('jquery');
    const resultData = [
        {
            title: 'Film one',
            id: 1,
            rating: 1.5,
            date: new Date(1468578092970),
            poster_url: 'poster-one-url',
            slug: 'film-one'
        },
        {
            title: 'Film two',
            id: 2,
            rating: 2.5,
            date: new Date(1468578092970),
            poster_url: 'poster-two-url',
            slug: 'film-two'
        }
    ]

    beforeEach(() => {
        // Reset ajax mock, so our call counts are more legit
        Film.store.find = jest.fn();
        Film.store.find.mockReturnValue({
            then: (callback) => callback(resultData)
        });
    });

    it('fetches when you type', () => {
        const typeAhead = TestUtils.renderIntoDocument(<TypeAhead/>);
        const typeAheadNode = ReactDOM.findDOMNode(typeAhead);
        var searchInput = TestUtils.findRenderedDOMComponentWithTag(typeAhead, 'input');
        var query = 'something;'
        var $dfd;

        typeAhead.setState({query: query});
        TestUtils.Simulate.change(searchInput);

        expect(searchInput.value).toEqual(query);
        expect(Film.store.find.mock.calls.length).toBe(1);
        expect(Film.store.find).toBeCalledWith(query);
        expect(typeAhead.state.results.length).toBe(2);
        expect(typeAhead.state.results[0].title).toBe(resultData[0].title);
    });

    it('doesn\'t fetch for queries under 3 chars', () => {
        const typeAhead = TestUtils.renderIntoDocument(<TypeAhead/>);
        const typeAheadNode = ReactDOM.findDOMNode(typeAhead);
        var searchInput = TestUtils.findRenderedDOMComponentWithTag(typeAhead, 'input');

        typeAhead.setState({query: '..'});
        TestUtils.Simulate.change(searchInput);

        expect(Film.store.find.mock.calls.length).toBe(0);
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
