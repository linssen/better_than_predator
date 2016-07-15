jest.unmock('../modules/Search');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import config from  '../config.json';
import { TypeAhead } from '../modules/Search';

describe('Type ahead', () => {
    const $ = require('jquery');
    const results = {
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

    it('fetches when you type', () => {
        var typeAhead = new TypeAhead();
        var $dfd;

        $.ajax.mockReturnValue({
            done: jest.fn().mockReturnValue(results)
        });

        $dfd = typeAhead.search(payload.query);

        expect($.ajax).toBeCalledWith({
            dataType: 'jsonp',
            url: `${config.apiUrl}search/movie`,
            data: payload
        });

    });
});
