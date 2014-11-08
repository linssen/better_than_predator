'use strict';

angular.module('btp.services', [])
    .factory('Film', ['$resource',
        function ($resource) {
            var base, filter, paramDefaults, transform;

            base = 'http://api.themoviedb.org/3/';
            paramDefaults = {
                api_key: '7fde67af78a621923d00705787723896',
                callback: 'JSON_CALLBACK'
            };
            transform = function (film) {
                return {
                    id: film.id,
                    title: film.title,
                    date: film.release_date === '' ? null : new Date(film.release_date),
                    rating: film.vote_average,
                    poster: 'http://image.tmdb.org/t/p/original' + film.poster_path
                };
            };
            filter = function (film) {
                return film.id !== 106;
            };

            return {
                search: $resource(base + 'search/movie', paramDefaults, {
                    query: {
                        method: 'JSONP',
                        isArray: true,
                        transformResponse: function (data) {
                            return data.results.filter(filter).map(transform);
                        },
                        params: {
                            query: '@query',
                            page: 1,
                            include_adult: false,
                            search_type: 'ngram'
                        }
                    }
                }),
                single: $resource(base + 'movie/:id', paramDefaults, {
                    get: {
                        method: 'JSONP',
                        transformResponse: function (data) {
                            return transform(data);
                        }
                    }
                })
            };
        }
    ]);
