export default {
    get (params) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let query = Object.keys(params.payload)
            .map((key) => {
                let encoded = encodeURIComponent(params.payload[key]);
                return `${key}=${encoded}`;
            })
            .join('&');
        xhr.open('GET', `${params.url}?${query}`);
        xhr.onload = () => resolve(xhr);
        xhr.onerror = () => reject(xhr);
        xhr.send();
      });
    }
};
