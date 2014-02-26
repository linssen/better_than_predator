'use strict';

angular.module('btp.services', [])
    .factory('Film', ['$resource',
        function ($resource) {
            /*jshint camelcase: false */
            var defaultParams, Film;
            defaultParams = {
                apikey: '6ynntf95p6h4pb8df3v73r7q',
                callback: 'JSON_CALLBACK'
            };
            Film = $resource(
                'http://api.rottentomatoes.com/api/public/v1.0/movies/:id.json',
                defaultParams,
                {
                    query: {
                        method: 'JSONP',
                        isArray: true,
                        params: {
                            q: 'honey',
                            page_limit: 10,
                            page: 1
                        },
                        transformResponse: function (data) {
                            return data.movies;
                        }
                    },
                    get: {
                        method: 'JSONP',
                        isArray: false,
                        transformResponse: function (data) {
                            var date;
                            if ('' + data.id === PREDATOR) { data.posters.original = '/static/images/predator.jpg'; }
                            data.ratings.combined = (data.ratings.critics_score + data.ratings.audience_score) / 2;
                            data.ratings.combined = Math.round(data.ratings.combined) / 10;
                            date = data.release_dates.theater || data.release_dates.dvd || null;
                            if (date) {
                                data.release_dates.computed = new Date(date.split('-'));
                            }

                            return data;
                        }
                    }
                }
            );

            return Film;
        }
    ]);
