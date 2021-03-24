const dotenv = require("dotenv");
dotenv.config();

const { environment } = require("@rails/webpacker");

const { less, svg, svgInLess } = require("./loaders");

environment.loaders.append("less", less);
environment.loaders.append("svg", svg);
environment.loaders.append("svgInLess", svgInLess);

module.exports = environment;

const nodeModulesLoader = environment.loaders.get("nodeModules");
if (!Array.isArray(nodeModulesLoader.exclude)) {
  nodeModulesLoader.exclude =
    nodeModulesLoader.exclude === null ? [] : [nodeModulesLoader.exclude];
}

nodeModulesLoader.exclude.push(/@rails\/actioncable/);
