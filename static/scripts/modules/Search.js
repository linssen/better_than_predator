'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import config from  '../config.json';
import Film from '../models/Film';

export class Result extends React.Component {
    render() {
        var cssClass = 'search__result-item';
        var year = this.props.date ? ` (${this.props.date.getFullYear()})` : '';
        if (this.props.isSelected) cssClass += ' search__result-item--active';
        return (
            <li>
                <Link
                    to={`/versus/${this.props.id}/${this.props.slug}/`}
                    className={cssClass}
                >{this.props.title}{year}</Link>
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
                    slug={result.slug}
                    date={result.date}
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
        var query = e.target.value;
        this.setState({query: query, selected: 0});
        if (query.length > 2) this.search(query);
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
        this.context.router.push(`/versus/${result.id}/${result.slug}/`);
    }
    search(query) {
        return Film.store.find(query).then((films) => {
            this.setState({results: films});
        });
    }
    render() {
        return (
            <div className="search">
                <input
                    className="search__query"
                    type="search"
                    value={this.state.query}
                    onChange={this.handleQueryChange.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    placeholder="Find a film..."
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
