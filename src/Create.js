import { useState } from "react";
import { ethers } from "ethers"
import Navbar from "./Navbar";

const NewContract = ({contractid}) => {
  if (contractid == "") {
    return <div/>
  } else {
    return (
        <>
          <label htmlFor="static-new">New HTLC contract ID</label>
          <input type="text" readOnly className="col-sm-10 form-control-plaintext" id="static-new" value={contractid}/>
        </>
    )
  }
}

const Create = ({loading, ctk, htlc}) => {
  const [amount, setAmount] = useState(null);
  const [hashlock, setHashlock] = useState("");
  const [expiry, setExpiry] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [contractId, setContractId] = useState('');

  const onhashchange = (e) => {
    const packed = ethers.utils.formatBytes32String(e.target.value);
    const hashlock = ethers.utils.soliditySha256(['bytes32'], [packed]);
    // console.log(hashlock);
    setHashlock(hashlock);
    // setHashlock(e.target.value);
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
    // reset if set previously
    setContractId("")

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
      <Navbar/>
        {!loading && <div className="container-fluid">
          <div className="form-group">
            <label htmlFor="receiver">Receiver</label>
            <input class="col-sm-10 form-control form-control-sm" id="receiver" type="text" onChange={onReceiverChange}/>

            <label htmlFor="timelock">Timelock</label>
            <input class="col-sm-10 form-control form-control-sm"  id="timelock" type="text" onChange={onExpiryChange}/>

            <label htmlFor="static-expiry">Expiry</label>
            <input type="text" readOnly class="col-sm-10 form-control-plaintext" id="static-expiry" value={(new Date(expiry*1000)).toString()}/>


            <label htmlFor="hashlock">Hashlock (plain)</label>
            <input class="col-sm-10 form-control form-control-sm" id="hashlock" type="text" onChange={onhashchange}/>

            <label htmlFor="static-secret">Hashlock (encoded)</label>
            <input type="text" readOnly className="col-sm-10 form-control-plaintext" id="static-secret" value={hashlock}/>

            <label htmlFor="amount">Amount</label>
            <input class="col-sm-10 form-control form-control-sm"  id="amount" type="text" onChange={onAmountChange}/>

            <label htmlFor="static-amount">Wei Value</label>
            <input type="text" readOnly className="col-sm-10 form-control-plaintext" id="static-amount" value={amount}/>

            <button type="button" className="btn btn-success" onClick={create}>Create HTLC contract</button><br/>

            <NewContract contractid={contractId}/>
          </div>


      </div>}
    </div>
  );
}

export default Create;