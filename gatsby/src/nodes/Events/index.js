const req = require.context('./', true, /.js$/);
const modules = req.keys().map(req);
module.exports = modules;
