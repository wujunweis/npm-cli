const ora = require('ora');
const loading = ora('Loading');

exports.startLoading = (text = 'Loading...') => {
    loading.text = text;
    loading.color = 'green';
    loading.start();
};

exports.endLoading = () => {
    loading.stop();
};