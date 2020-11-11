const Token = artifacts.require("MyTokens");

var chai = require("chai");
const BN = web3.utils.BN;
const chainBN = require("chai-bn")(BN);

chai.use(chainBN);

var chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);

const expect = chai.expect;
contract("Token Test", async (accounts) => {
  const [deployedAccount, recepientAccount, anotherAccount] = accounts;

  it("all tokens are present", async () => {
    let instance = await Token.deployed();
    let totalSupply = await instance.totalSupply();
    expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(
      totalSupply
    );
  });

  it("Transfer tokens form on to another", async () => {
    const senToken = 1;
    let instance = await Token.deployed();
    let totalSupply = await instance.totalSupply();
    expect(await instance.balanceOf(deployedAccount)).to.be.a.bignumber.equal(
      totalSupply
    );
    expect(instance.transfer(recepientAccount, senToken)).to.eventually.be
      .fulfilled;
    expect(
      instance.balanceOf(deployedAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(senToken)));
    expect(
      instance.balanceOf(recepientAccount)
    ).to.eventually.be.a.bignumber.equal(new BN(senToken));
  });
});
