'use strict';

import React from 'react';
import { Link } from 'react-router';


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
        this.setState({results: [
            {title: this.state.query, id: 1}
        ]})
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
