const { environment } = require('@rails/webpacker')

const {less} = require('./loaders');

environment.loaders.append('less', less);

module.exports = environment;

const nodeModulesLoader = environment.loaders.get('nodeModules');
if (!Array.isArray(nodeModulesLoader.exclude)) {
  nodeModulesLoader.exclude =
    nodeModulesLoader.exclude === null ? [] : [nodeModulesLoader.exclude];
}

nodeModulesLoader.exclude.push(/@rails\/actioncable/);