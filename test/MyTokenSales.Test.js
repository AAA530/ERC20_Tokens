const Token = artifacts.require("MyTokens");
const TokenSale = artifacts.require("MyTokenSale");
require("dotenv").config({ path: "../.env" });

var chai = require("chai");
const BN = web3.utils.BN;
const chainBN = require("chai-bn")(BN);

chai.use(chainBN);

var chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);

const expect = chai.expect;
contract("TokenSale Test", async (accounts) => {
  const [deployedAccount, recepientAccount, anotherAccount] = accounts;

  it("It should not have any token in deployed account", async () => {
    let instance = await TokenSale.deployed();
    // let totalSupply = await instance.totalSupply();
    return expect(
      await instance.balanceOf(deployedAccount)
    ).to.be.a.bignumber.equal(new BN(0));
  });
});
