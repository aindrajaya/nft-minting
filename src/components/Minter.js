import React, { useEffect, useState } from 'react'
import {connectWallet, getCurrentWalletConnected, mintNFT} from '../utils/Interact'

const Minter = (props) => {
  //state variables
  const [walletAddress, setWallet] = useState("")
  const [status, setStatus] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")

  function addWalletListener(){
    if(window.ethereum){
      window.etherem.on("accountChanged", (accounts) => {
        if(accounts.length > 0){
          setWallet(accounts[0])
          setStatus("Write a message in the text-field above")
        } else {
          setWallet("")
          setStatus("Connect to metamask using the top right button")
        }
      })
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      )
    }
  }

  useEffect(async() => {
    const [address, status] = await getCurrentWalletConnected()
    setWallet(address)
    setStatus(status)

    addWalletListener()
  }, [])

  const connectWalledPressed = async () => {
    //TODO: implmement
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletAddress.address)
  }

  const onMintPressed = async()=> {
    //TODO: Implement
    const {status} = await mintNFT(url, name, description)
    setStatus(status)
  }

  return(
    <div className="Minter">
      <button id="walletButton" onClick={connectWalledPressed}>
        {walletAddress.length > 0 ? (
          "Connected: "+
          String(walletAddress).substring(0, 6) +
          "..." + 
          String(walletAddress).substring(38)
        ):(
          <span>Connect Wallet</span>
        )}
      </button>
      <br/>
      <h1 id="title">Alchemy NFT Minter Tutorial</h1>
      <p>
      Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>Link to Assets: </h2>
        <input 
          type="text"
          placeholder="e.g. https://gateway.pinata/cloud/ipfs/<hash>"
          onChange={(event) => setUrl(event.target.value)}
        />
        <h2>Name: </h2>
        <input 
          type="text"
          placeholder="e.g. My First NFT"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>Description: </h2>
        <input 
          type="text"
          placeholder="e.g. NFT Trial from Alchemy Tutorial"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  )
}

export default Minter
