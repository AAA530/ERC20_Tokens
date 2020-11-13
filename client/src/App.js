// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
  const [accounts, setAccounts] = useState();
  const [tokenInstance, setTokenInstance] = useState();
  const [tokenSalesInstance, setTokenSalesInstance] = useState();
  const [kycInstance, setKycInstance] = useState();
  const [obj, setObj] = useState({
    loaded: false,
    kycAddress: "",
  });
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    async function ConfigureWithTruffle() {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        setAccounts(accounts);
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const tokenInstance = new web3.eth.Contract(
          MyToken.abi,
          MyToken.networks[networkId] && MyToken.networks[networkId].address
        );
        setTokenInstance(tokenInstance);

        const tokenSalesInstance = new web3.eth.Contract(
          MyTokenSale.abi,
          MyTokenSale.networks[networkId] &&
            MyTokenSale.networks[networkId].address
        );
        setTokenSalesInstance(tokenSalesInstance);

        const kycInstance = new web3.eth.Contract(
          KycContract.abi,
          KycContract.networks[networkId] &&
            KycContract.networks[networkId].address
        );
        setKycInstance(kycInstance);

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setObj({ ...obj, loaded: true });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    }
    ConfigureWithTruffle();
  }, []);

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(name);
    setObj({
      ...obj,
      [name]: value,
    });
  };

  const handleKycWhiteListing = async () => {
    await kycInstance.methods
      .SetKycCompleted(obj.kycAddress)
      .send({ from: accounts[0] });
    alert("KYC is completed for " + obj.kycAddress);
  };

  console.log(obj);

  console.log(obj.kycAddress);
  return (
    <div>
      <h1>ERC 20 Tokens of Kasper</h1>
      <h2>KYC Whitelisting</h2>
      Enter Your address :
      <input
        type="text"
        name="kycAddress"
        value={obj.kycAddress}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleKycWhiteListing}>
        Set Kyc
      </button>
    </div>
  );
}

export default App;
