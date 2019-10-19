const { renderToString } = require('vue-server-renderer').createRenderer();
const serverApp = require('../dist-server/app');

const start = context => serverApp(context).then(renderToString);

// const context = { url: '/about' };
// start(context).then(console.log);

module.exports = start;
