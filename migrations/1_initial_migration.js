const Migrations = artifacts.require("Certi");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
