const Token = artifacts.require("MyTokens");

var chai = require("chai");
const BN = web3.utils.BN;
const chainBN = require("chai-bn")(BN);

chai.use(chainBN);

var chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);

const expect = chai.expect;
contract("Token Test", async (accounts) => {
  it("all tokens"),
    async () => {
      let instance = await Token.deployed();
      let totalSupply = await instance.totalSupply();
      expect(
        await instance.balanceOf(accounts[0])
      ).to.eventually.be.a.bignumber.equal(totalSupply);
    };
});
