'use strict';

angular.module('btp.services', [])
    .factory('Film', ['$resource',
        function ($resource) {
            var base, paramDefaults;

            base = 'http://api.themoviedb.org/3/';
            paramDefaults = {
                api_key: '7fde67af78a621923d00705787723896',
                callback: 'JSON_CALLBACK'
            };

            return {
                search: $resource(base + 'search/movie', paramDefaults, {
                    query: {
                        method: 'JSONP',
                        isArray: true,
                        transformResponse: function (data) {
                            console.log(data.results[0]);
                            return data.results;
                        },
                        params: {
                            query: '@query',
                            page: 1,
                            include_adult: false
                        }
                    }
                }),
                single: $resource(base + 'movie/:id', paramDefaults, {
                    get: {
                        method: 'JSONP',
                        transformResponse: function (data) {
                            data.poster = 'http://image.tmdb.org/t/p/original' + data.poster_path;
                            return data;
                        }
                    }
                })
            };
        }
    ]);
