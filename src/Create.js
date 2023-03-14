import { useState } from "react";
import { ethers } from "ethers"
import Navbar from "./Navbar";

const Create = ({loading, ctk, htlc}) => {
  const [amount, setAmount] = useState(null);
  const [hashlock, setHashlock] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [contractId, setContractId] = useState('');

  const onTimelockChange = (e) => {
    //const packed = ethers.utils.formatBytes32String(e.target.value);
    //setHashlock(ethers.utils.soliditySha256(['bytes32'], [packed]));
    setHashlock(e.target.value);
  }
  const onAmountChange = (e) => {
    const wei = ethers.utils.parseEther(e.target.value);
    setAmount(wei.toString());
  }
  const onExpiryChange = (e) => {
    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    const future = parseInt(e.target.value);
    setExpiry((secondsSinceEpoch+future));
  }
  const onReceiverChange = (e) => {
    setReceiver(e.target.value);
  }

  const create = async() => {
    const apvtx = await ctk.approve(htlc.address, amount);
    console.log(apvtx);
    await apvtx.wait(1);
    //console.log(`${receiver} ${hashlock} ${expiry} ${ctk.address} ${amount}`);
    const contractId = ethers.BigNumber.from(ethers.utils.randomBytes(32));
    const htcltx = await htlc.newContract(contractId, receiver, hashlock, expiry, ctk.address, amount);
    console.log(htcltx);
    await htcltx.wait(1);
    setContractId(contractId.toHexString());
    //console.log(contractId.toString());
    //await (await ctk.transfer(htlc.address, amount)).wait();
  }

  return (
    <div>
      <Navbar/><br/>
        {!loading && <div>
        receiver: <input type="text" style = {{width: 400}} onChange={onReceiverChange}/><br/>
        timelock: <input type="text" onChange={onExpiryChange}/> expiry = {(new Date(expiry*1000)).toString()}<br/>
        hashlock: <input type="text"  style = {{width: 500}} onChange={onTimelockChange}/><br/>
        amount: <input type="text" onChange={onAmountChange}/> wei value = {amount}<br/>
        <button type="button" className="btn btn-primary" onClick={create}>Create HTLC contract</button><br/>
        new HTLC contract ID : {contractId}
      </div>}
    </div>
  );
}

export default Create;