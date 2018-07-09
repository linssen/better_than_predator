import request from '@/api/request';

export default {
  find(query) {
    const payload = {
      query,
      api_key: '7fde67af78a621923d00705787723896',
      page: 1,
      include_adult: false,
      search_type: 'ngram',
    };
    return request.get({
      payload,
      url: 'http://api.themoviedb.org/3/search/movie',
    });
  },
  findOne(id) {
    const payload = {
      id,
      api_key: '',
    };
    return payload;
  },
};
