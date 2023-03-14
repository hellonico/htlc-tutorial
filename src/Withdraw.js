import { useState } from "react";
import { ethers } from "ethers"
import Navbar from "./Navbar";

const Withdraw = ({loading, htlc}) => {
  const [secret, setSecret] = useState("");
  const [withdrawContractId, setWithdrawContractId] = useState("");

  const onSecretChange = (e) => {
    const s = ethers.utils.formatBytes32String(e.target.value);
    setSecret(s);
  }
  const onWithdrawContractIdChange = (e) => {
    setWithdrawContractId(e.target.value);
  }
  const withdraw = async() => {
    // const s = ethers.utils.formatBytes32String(secret);
    console.log(`secret=${secret}`);
    const tx = await htlc.withdraw(withdrawContractId, secret);
    console.log(tx);
    await tx.wait(1);
  }

  return(
      <div>
      <Navbar/>
      {!loading && <div className="container-fluid">

        <div className="form-group">
          <label htmlFor="contract">Contract Id</label>
          <input className="col-sm-10 form-control form-control-sm"  id="contract" type="text" onChange={onWithdrawContractIdChange}/>

          <label htmlFor="secret">Secret (plain)</label>
          <input className="col-sm-10 form-control form-control-sm"  id="secret" type="text" onChange={onSecretChange}/>

          <label htmlFor="static-secret">Secret (encoded)</label>
          <input type="text" readOnly className="col-sm-10 form-control-plaintext" id="static-secret" value={secret}/>

          <button type="button" className="btn btn-success"  onClick={withdraw}>Withdraw</button>
        </div>
      </div>}
    </div>
  );
}

export default Withdraw;