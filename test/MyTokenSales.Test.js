const Token = artifacts.require("MyTokens");
const TokenSale = artifacts.require("MyTokenSale");
const KYC = artifacts.require("KycContract");
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

  it("All tokens should be in token smart contract", async () => {
    let instance = await Token.deployed();
    let balanceOfTokenSale = await instance.balanceOf(TokenSale.address);
    let totalSupply = await instance.totalSupply();
    return expect(balanceOfTokenSale).to.be.a.bignumber.equal(totalSupply);
  });

  it("Sholud be possible to buy tokens", async () => {
    let TokenInstance = await Token.deployed();
    let TokenSaleInstance = await TokenSale.deployed();
    let kycInstance = await KYC.deployed();
    let balanceBefore = await TokenInstance.balanceOf(deployedAccount);

    kycInstance.SetKycCompleted(deployedAccount);
    expect(
      TokenSaleInstance.sendTransaction({
        from: deployedAccount,
        value: web3.utils.toWei("1", "wei"),
      })
    ).to.be.fulfilled;
    return expect(
      TokenInstance.balanceOf(deployedAccount)
    ).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
  });
});
