/** @jsx React.DOM */
'use strict';

var PREDATOR = '16751';
var API_KEY = '6ynntf95p6h4pb8df3v73r7q';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/movies/:id.json';

var SearchForm = React.createClass({
    getInitialState: function () {
        return {data: {movies:[]}};
    },
    getResultsFromServer: function (term) {
        $.ajax({
            url: API_URL.replace('/:id', ''),
            dataType: 'jsonp',
            data: {
                q: term,
                page_limit: 10,
                apikey: API_KEY,
                page: 1
            },
            success: function (data) {
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    keyUp: function (e) {
        var term;
        term = this.refs.term.getDOMNode().value.trim();
        if (term.length < 2) { return false; }
        window.clearTimeout(this.timeout);;
        this.timeout = window.setTimeout(
            this.getResultsFromServer.bind(this, term),
            100
        );
    },
    render: function () {
        return (
            <div className="search">
                <input
                    type="search"
                    className="search__query"
                    id="search_query"
                    placeholder="Find a film..."
                    ref="term"
                    onKeyUp={this.keyUp}
                />
                <SearchResultList data={this.state.data} />
            </div>
        );
    }
});
var SearchResultItem = React.createClass({
    render: function () {
        var result;
        result = this.props.data;
        return (
            <a
                href="#/versus/{{f.id}}/{{f.title | urlize}}"
                className="search__result-item"
            >
                {result.title} ({result.year})
            </a>
        );
    }
});
var SearchResultList = React.createClass({
    render: function () {
        var searchResultItems = this.props.data.movies.map(function (result) {
            return (
                <SearchResultItem data={result} />
            );
        });
        return (
            <ul className="search__result-list">
                {searchResultItems}
            </ul>
        );
    }
});

React.renderComponent(
    <SearchForm />,
    document.getElementById('main')
);