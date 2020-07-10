const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

axios.defaults.baseURL = 'http://127.0.0.1:3000';

const form = new FormData();
form.append('file1', fs.createReadStream('./assets/avatar.jpg'));
form.append('key1', 'my added field');

axios.post('/upload', form, {
    headers: form.getHeaders()
}).then(res => {
    console.log('upload successful', res.data);
}).catch(error => {
    console.error('upload err', error);
});