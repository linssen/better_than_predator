import request from './request';

export default {
    find(query) {
        let payload = {
            api_key: '7fde67af78a621923d00705787723896',
            query: query,
            page: 1,
            include_adult: false,
            search_type: 'ngram'
        };
        return request.get({
            url: 'http://api.themoviedb.org/3/search/movie',
            payload: payload
        });
    },
    findOne(id) {
        let payload = {
            api_key: ''
        };
        return payload;
    }
}
