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
            return data.results.map((d) => new Film(d));
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
            return new Film(data);
        });
    }
}

export default class Film {
    static store = FilmStore;

    constructor({title, id, vote_average, release_date, poster_path}) {
        this.title = title;
        this.id = id;
        this.rating = vote_average;
        this.date = release_date === '' ? null : new Date(release_date);
        this.poster = `${config.posterUrl}${poster_path}`;
        this.slug = slugify(title);
    }

}
