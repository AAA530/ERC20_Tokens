const Token = artifacts.require("MyTokens");
const TokenSale = artifacts.require("MyTokenSale");
require("dotenv").config({ path: "../.env" });

chai = require("./Setup");
const BN = web3.utils.BN;

const expect = chai.expect;
contract("TokenSale Test", async (accounts) => {
  const [deployedAccount, recepientAccount, anotherAccount] = accounts;

  it("It should not have any token in deployed account", async () => {
    let instance = await Token.deployed();
    // let totalSupply = await instance.totalSupply();
    return expect(
      await instance.balanceOf(deployedAccount)
    ).to.be.a.bignumber.equal(new BN(0));
  });
});
