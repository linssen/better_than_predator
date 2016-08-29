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
        var move = ({key='ArrowDown', count=1}) => {
            var codes = {ArrowDown: 40, ArrowUp: 38};
            for (var i=0; i<count; i++) {
                TestUtils.Simulate.keyDown(searchInput, {
                    key: key, keyCode: codes[key], which: codes[key]
                });
            }
        };

        typeAhead.setState({query: '...'});
        TestUtils.Simulate.change(searchInput);

        expect(typeAhead.state.selected).toBe(0);
        move({key: 'ArrowDown'});
        expect(typeAhead.state.selected).toBe(1);
        move({key: 'ArrowUp'});
        expect(typeAhead.state.selected).toBe(0);
        // Now make sure we can't move past the limits
        move({key: 'ArrowUp', count: 2});
        expect(typeAhead.state.selected).toBe(0);
        move({key: 'ArrowDown', count: 3});
        expect(typeAhead.state.selected).toBe(typeAhead.state.results.length);
    });
});
