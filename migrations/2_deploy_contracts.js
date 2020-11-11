var MyTokens = artifacts.require("./MyTokens.sol");

module.exports = async function (deployer) {
  await deployer.deploy(MyTokens, 10000);
};
