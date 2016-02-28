'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery'

import APIUtils from '../utils/APIUtils'


const API_BASE = 'http://api.themoviedb.org/3/';
const API_KEY = '7fde67af78a621923d00705787723896';
const POSTER_BASE = 'http://image.tmdb.org/t/p/original/';

class Result extends React.Component {
    render() {
        return (
            <li>
                <Link
                    to="/versus"
                    className="search__result-item"
                >{this.props.title}</Link>
            </li>
        )
    }
}

class ResultList extends React.Component {
    render() {
        let resultList = this.props.results.map((result) => {
            return (
                <Result title={result.title} key={result.id}></Result>
            )
        });
        return (
            <ul className="search__result-list">
                {resultList}
            </ul>
        );
    }
}

class TypeAhead extends React.Component {
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
        let url = `${API_BASE}search/movie/`;
        let payload = {
            api_key: API_KEY,
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
                poster: `${POSTER_BASE}${result.poster_path}`
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

class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <TypeAhead />
            </div>
        );
    }
}

export default Search
