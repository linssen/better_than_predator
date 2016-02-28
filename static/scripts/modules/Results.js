'use strict';

import React from 'react';
import { Link } from 'react-router';


class Results extends React.Component {
    render() {
        return (
            <div>
                <h1>Someone wins!</h1>
                <div className="film-results">
                     <div class="film-results__poster">
                        <img src="" width="300" />
                     </div>
                     <div class="film-results__rating">
                        <div class="film-results__score">RATING</div>
                        <div
                            class="film-results__stars"
                            star-width="51"
                            star-height="49"
                            rows="2"
                            outof="10"
                        ></div>
                    </div>
                </div>
                <div class="info">
                    <hr />

                    <h3>Why does this even exist?</h3>

                    <p>Because <a href="http://twitter.com/linssen">Wil</a>, <a href="http://twitter.com/gregwood">Greg</a>,
                        and <a href="http://twitter.com/glenswinfield">Glen</a> were in a pub once
                        and they thought you should be able to compare films to Predator. It is
                        after all the ultimate benchmark.</p>

                    <Link to="/" className="button button--again info__button">
                        Again!
                    </Link>

                    <a class="button button--tweet info__button info__button--last" target="_blank" href="">
                        Tweet this
                    </a>

                    <p class="credit">
                        Copyright © YYYY <a href="http://linssen.me/">Wil Linssen</a>,
                        and all of the code is <a href="http://github.com/linssen/better_than_predator">on GitHub</a>.<br />
                        Powered by <a href="https://www.themoviedb.org/">themoviedb.org</a>.
                    </p>

                </div>
            </div>
        );
    }
}

export default Results
