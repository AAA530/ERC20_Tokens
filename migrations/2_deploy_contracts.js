var MyTokens = artifacts.require("./MyTokens.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
var MyKycContract = artifacts.require("./KycContract.sol");

require("dotenv").config({ path: "../.env" });
// console.log(process.env);

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyTokens, process.env.INITIAL_TOKENS);
  await deployer.deploy(MyKycContract);
  await deployer.deploy(
    MyTokenSale,
    1,
    addr[0],
    MyTokens.address,
    MyKycContract.address
  );
  let instance = await MyTokens.deployed();
  await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
};
