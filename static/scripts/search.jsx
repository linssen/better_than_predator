/** @jsx React.DOM */
'use strict';

var PREDATOR = '16751';
var API_KEY = '6ynntf95p6h4pb8df3v73r7q';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/movies/:id.json';
var KEYS = {38: 'up', 40: 'down', 13: 'enter'};

var SearchForm = React.createClass({
    getInitialState: function () {
        return {
            data: {movies:[]},
            curIndex: 0
        };
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
        if (term.length < 2) {
            return false;
        }
        if (e.which in KEYS) {
            return this.navigateResults(e.which);
        }
        window.clearTimeout(this.timeout);
        this.timeout = window.setTimeout(
            this.getResultsFromServer.bind(this, term),
            100
        );
    },
    navigateResults: function (which) {
        var direction;
        switch (KEYS[which]) {
        case 'up':
            direction = -1;
            break;
        case 'down':
            direction = +1;
            break;
        case 'enter':
            // NAVIGATE;
            break;
        }
        this.setState({
            curIndex: this.state.curIndex + direction
        });
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
                <SearchResultList curIndex={this.state.curIndex} data={this.state.data} />
            </div>
        );
    }
});
var SearchResultItem = React.createClass({
    render: function () {
        var className, result, titleUrlized;
        result = this.props.data;
        titleUrlized = result.title
                .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '')
                .replace(/\s{2,}/g, ' ')
                .replace(/\s/g, '-')
                .toLowerCase();
        className = 'search__result-item'
        className += this.props.active ? ' ' + className + '--active' : '';
        return React.DOM.a({
            href: '#/versus/' + result.id + '/' + titleUrlized,
            className: className
            }, result.title + '(' + result.year + ')'
        );
    }
});
var SearchResultList = React.createClass({
    render: function () {
        var searchResultItems = this.props.data.movies.map(function (result, index) {
            return (
                <SearchResultItem data={result} active={this.props.curIndex === index} />
            );
        }, this);
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