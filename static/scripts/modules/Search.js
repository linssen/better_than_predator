'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import config from  '../config.json';
import { slugify } from '../utils/StringUtils';

export class Result extends React.Component {
    render() {
        var cssClass = 'search__result-item';
        if (this.props.isSelected) cssClass += ' search__result-item--active';
        return (
            <li>
                <Link
                    to={`/versus/${this.props.id}/${this.props.slug}/`}
                    className={cssClass}
                >{this.props.title}</Link>
            </li>
        )
    }
}

export class ResultList extends React.Component {
    render() {
        var resultList = this.props.results.map((result, idx) => {
            var isSelected = this.props.selected === idx;
            return (
                <Result
                    title={result.title}
                    key={result.id}
                    id={result.id}
                    slug={slugify(result.title)}
                    isSelected={isSelected}
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
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {query: '', results: [], selected: 0};
        this.handleQueryChange = this.handleQueryChange.bind(this);
    }
    handleQueryChange(e) {
        this.setState({query: e.target.value, selected: 0});
        if (this.state.query.length > 2) {
            this.search(this.state.query);
        }
    }
    handleKeyDown(e) {
        if ([40, 38].indexOf(e.keyCode) > -1) this.navigateList(e.keyCode);
        if (e.keyCode === 13) this.chooseResult();
    }
    navigateList(keyCode) {
        var direction = 0;
        var numResults = this.state.results.length;
        var selected = this.state.selected;

        if (numResults === 0) return;

        if (keyCode === 40 && selected < numResults) selected +=1;
        if (keyCode === 38 && selected > 0) selected -=1;
        this.setState({selected: selected});

        return selected;
    }
    chooseResult() {
        var result = this.state.results[this.state.selected] || null;
        if (this.state.results.length === 0 || result === null) return;
        this.context.router.push(`/versus/${result.id}/${slugify(result.title)}/`);
    }
    search(query) {
        var url = `${config.apiUrl}search/movie`;
        var payload = {
            api_key: config.apiKey,
            query: query,
            page: 1,
            include_adult: false,
            search_type: 'ngram'
        };
        var $dfd = $.ajax({
            url: url,
            data: payload,
            dataType: 'jsonp',
        });
        $dfd.done(this.processResults.bind(this));
        return $dfd;
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
                    onKeyDown={this.handleKeyDown.bind(this)}
                />
                <ResultList results={this.state.results} selected={this.state.selected} />
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
