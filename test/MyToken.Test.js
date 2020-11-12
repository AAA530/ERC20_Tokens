const Token = artifacts.require("MyTokens");
require("dotenv").config({ path: "../.env" });

var chai = require("chai");
const BN = web3.utils.BN;
const chainBN = require("chai-bn")(BN);

chai.use(chainBN);

var chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);

const expect = chai.expect;
contract("Token Test", async (accounts) => {
  const [deployedAccount, recepientAccount, anotherAccount] = accounts;

  beforeEach(async () => {
    this.myToken = await Token.new(process.env.INITIAL_TOKENS);
  });

  it("all tokens are present", async () => {
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    return expect(
      await instance.balanceOf(accounts[0])
    ).to.be.a.bignumber.equal(totalSupply);
  });

  it("Transfer tokens form on to another", async () => {
    const senToken = 1;
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    expect(await instance.balanceOf(deployedAccount)).to.be.a.bignumber.equal(
      totalSupply
    );
    expect(instance.transfer(recepientAccount, senToken)).to.eventually.be
      .fulfilled;
    expect(
      instance.balanceOf(deployedAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(senToken)));
    return expect(
      instance.balanceOf(recepientAccount)
    ).to.eventually.be.a.bignumber.equal(new BN(senToken));
  });

  it("It's not possible to send more tokens than account 1 has", async () => {
    let instance = this.myToken;
    let balanceOfAccount = await instance.balanceOf(deployedAccount);
    expect(instance.transfer(recepientAccount, new BN(balanceOfAccount + 1))).to
      .eventually.be.rejected;

    //check if the balance is still the same
    return expect(
      instance.balanceOf(deployedAccount)
    ).to.eventually.be.a.bignumber.equal(balanceOfAccount);
  });
});
