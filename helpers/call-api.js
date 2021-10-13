const axios = require('axios');

exports.postApi = (url, data, headers = {}) => {
    return axios.post(url, data, { headers });
};

exports.getApi = (url, headers = {}) => {
    return axios.get(url, { headers });
};
