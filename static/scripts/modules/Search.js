'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import config from  '../config.json';
import { slugify } from '../utils/StringUtils';

export class Result extends React.Component {
    render() {
        return (
            <li>
                <Link
                    to={`/versus/${this.props.id}/${this.props.slug}/`}
                    className="search__result-item"
                >{this.props.title}</Link>
            </li>
        )
    }
}

export class ResultList extends React.Component {
    render() {
        let resultList = this.props.results.map((result) => {
            return (
                <Result
                    title={result.title}
                    key={result.id}
                    id={result.id}
                    slug={slugify(result.title)}
                ></Result>
            )
        });
        return (
            <ul className="search__result-list">
                {resultList}
            </ul>
        );
    }
}

export class TypeAhead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: '', results: []};
        this.handleQueryChange = this.handleQueryChange.bind(this);
    }
    handleQueryChange(e) {
        this.setState({query: e.target.value});
        if (this.state.query.length > 2) {
            this.search(this.state.query);
        }
    }
    search(query) {
        let url = `${config.apiUrl}search/movie`;
        let payload = {
            api_key: config.apiKey,
            query: query,
            page: 1,
            include_adult: false,
            search_type: 'ngram'
        };
        let $dfd = $.ajax({
            url: url,
            data: payload,
            dataType: 'jsonp',
        });
        $dfd.done(this.processResults.bind(this));
    }
    processResults(data) {
        this.setState({results: data.results.map((result) => {
            return {
                title: result.title,
                id: result.id,
                rating: result.vote_average,
                date: result.release_date === '' ? null : new Date(result.release_date),
                poster: `${config.posterUrl}${result.poster_path}`
            };
        })});
    }
    render() {
        return (
            <div className="search">
                <input
                    className="search__query"
                    type="search"
                    value={this.state.query}
                    onChange={this.handleQueryChange}
                />
                <ResultList results={this.state.results} />
            </div>
        );
    }
}

export default class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <TypeAhead />
            </div>
        );
    }
}
