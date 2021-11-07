//Step 6: Add the Pinata creden
require('dotenv').config() //integrate with the .env file
import { pinJSONtoIPFS } from './pinata'; //to reacall the body
const alchemyKey = process.env.ALCHEMY_KEY;
const {createAlchemyWeb3} = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require('../contract-abi.json')
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"

//Step 8: Implement mintNFT function
export const mintNFT = async(url, name, description) => {
  //error handling
  if(url.trim() == "" || (name.trim() == "" || description.trim() == "")){
    return{
      success: false,
      status: "Please make sure all fields are completed before minting"
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //make pinata call
  const pinataResponse = await pinJSONtoIPFS(metadata);
  if(!pinataResponse.success){
    return {
      success: false,
      status: "Something went wrong while uploading your tokenURI"
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress); //loadContract()

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress,
    from: window.ethereum.selectedAddress,
    'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodedABI()
  };

  //sign transaction via Metamask
  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
      });
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message
    }
  }
}

export const connectWallet = async () => {
  if(window.ethereum){
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "write a message in the text-field above",
        address: addressArray[0]
      };
      return obj;
    } catch (error) {
      return{
        address: "",
        status: error.message
      };
    }
  }else {
    return{
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      )
    }
  }
}

export const getCurrentWalletConnected = async() => {
  if(window.ethereum){
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if(addressArray.length > 0){
        return{
          address: addressArray[0],
          status: "Write a message in the text-field above"
        }
      }else{
        return {
          address: "",
          status: "connect to metamask using the top righ button"
        }
      }
    } catch (error) {
      return {
        address: "",
        status: error.message
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      )
    }
  }
}