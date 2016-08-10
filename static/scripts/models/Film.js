import $ from 'jquery';

import config from  '../config.json';
import { slugify } from '../utils/StringUtils';

export class FilmStore {

    static find(query) {
        var payload = {
            api_key: config.apiKey,
            query: query,
            page: 1,
            include_adult: false,
            search_type: 'ngram',
        };
        return $.ajax({
            url: `${config.apiUrl}search/movie`,
            data: payload,
            dataType: 'jsonp',
        }).then((data, textStatus, jqXHR) => {
            return data.results.map(this.transformResult);
        });
    }

    static findOne(id) {
        var payload = {
            api_key: config.apiKey
        };
        return $.ajax({
            url: `${config.apiUrl}movie/${id}`,
            method: 'GET',
            dataType: 'jsonp',
            data: payload
        }).then((data) => {
            return this.transformResult(data);
        });
    }

    static transformResult(data) {
        return new Film({
            title: data.title,
            id: data.id,
            rating: data.vote_average,
            date: data.release_date === '' ? null : new Date(data.release_date),
            poster: `${config.posterUrl}${data.poster_path}`,
            slug: slugify(data.title),
        })
    }
}

export default class Film {
    static store = FilmStore;

    constructor(props) {
        this.title = props.title;
        this.id = props.id;
        this.rating = props.rating;
        this.date = props.date;
        this.poster = props.poster;
        this.slug = props.slug;
    }

}
