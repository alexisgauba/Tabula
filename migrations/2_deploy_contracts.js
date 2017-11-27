var LandPlot = artifacts.require("./LandPlot.sol");
var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer) {
  deployer.deploy(LandPlot);
  deployer.deploy(Registry);
};
