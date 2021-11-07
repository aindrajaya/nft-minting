require('dotenv').config()
import axios from 'axios';

const key = process.env.PINATA_KEY;
const secret = process.env.PINATA_SECRET;

export const pinJSONtoIPFS = async(JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  return axios.post(url, JSONBody, {
    headers: {
      pinata_api_key: key,
      pinata_secret_api_key: secret,
    }
  })
  .then(function(res){
    return{
      success: true,
      pinataUrl: "https://gateway.pinata.cloud/ipfs/"+res.data.IpfsHash
    }
  })
  .catch(function(err){
    console.log(err)
    return {
      success: false,
      message: error.message
    }
  })
}