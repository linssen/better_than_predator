'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import config from  '../config.json';
import Film from '../models/Film';
import StarRating from './StarRating';


class FilmResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div className="film-results__film">
                <div className="film-results__poster">
                    <img src={this.state.poster} width="300" />
                 </div>
                 <div className="film-results__rating">
                    <div className="film-results__score">{this.state.rating}</div>
                    <div className="film-results__stars">
                        <StarRating
                            width="51"
                            height="49"
                            rows="2"
                            outof="10"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            versusId: props.params.id,
            winner: null,
            predator: null,
            versus: null
        };
        this.fetch();
    }
    fetch() {
        $.when(
            Film.store.findOne(this.state.versusId),
            Film.store.findOne(config.predatorId)
        ).done(this.processResults.bind(this));
    }
    processResults(versus, predator) {
        let winner = [versus, predator].sort((a, b) => b.rating - a.rating)[0];
        this.setState({versus: versus, predator: predator, winner: winner});
    }
    render() {
        var year = new Date().getFullYear();
        var conjoin;
        var shareString;
        var tweetUrl;
        var thisUrl;
        var filmNodes;

        if (!this.state.winner) return null;

        thisUrl = `http://www.betterthanpredator.com/#/versus/${this.state.versus.id}/${this.state.versus.slug}/`
        conjoin = this.state.winner.id === this.state.predator.id
            ? 'n’t as good as' : 'better than';
        shareString = `I just found out that ${this.state.versus.title} ` +
            `(${this.state.versus.date.getFullYear()}) is${conjoin} Predator.`
        tweetUrl = `https://twitter.com/share/` +
            `?url=${window.encodeURIComponent(thisUrl)}` +
            `&via=linssen` +
            `&text=${window.encodeURIComponent(shareString)}`;
        filmNodes = [this.state.predator, this.state.versus].map((film) => {
            if (!this.state.versus || !this.state.predator) return null;
            return (
                <FilmResult
                    title={film.title}
                    id={film.id}
                    key={film.id}
                    rating={film.rating}
                    date={film.date}
                    poster={film.poster}
                / >
            );
        });
        return (
            <div>
                <h1>{this.state.winner.title} wins!</h1>
                <div className="film-results">
                    {filmNodes}
                </div>
                <div className="info">
                    <hr />

                    <h3>Why does this even exist?</h3>

                    <p>Because <a href="http://twitter.com/linssen">Wil</a>, <a href="http://twitter.com/gregwood">Greg</a>,
                        and <a href="http://twitter.com/glenswinfield">Glen</a> were in a pub once
                        and they thought you should be able to compare films to Predator. It is
                        after all the ultimate benchmark.</p>

                    <Link to="/" className="button button--again info__button">
                        Again!
                    </Link>

                    <a className="button button--tweet info__button info__button--last" target="_blank" href={tweetUrl}>
                        Tweet this
                    </a>

                    <p className="credit">
                        Copyright © {year} <a href="http://linssen.me/">Wil Linssen</a>,
                        and all of the code is <a href="http://github.com/linssen/better_than_predator">on GitHub</a>.<br />
                        Powered by <a href="https://www.themoviedb.org/">themoviedb.org</a>.
                    </p>

                </div>
            </div>
        );
    }
}

export default Results
