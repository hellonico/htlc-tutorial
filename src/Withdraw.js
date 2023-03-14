import { useState } from "react";
import { ethers } from "ethers"
import Navbar from "./Navbar";

const Withdraw = ({loading, htlc}) => {
  const [secret, setSecret] = useState(null);
  const [withdrawContractId, setWithdrawContractId] = useState(null);

  const onSecretChange = (e) => {
    setSecret(e.target.value);
  }
  const onWithdrawContractIdChange = (e) => {
    setWithdrawContractId(e.target.value);
  }
  const withdraw = async() => {
    const s = ethers.utils.formatBytes32String(secret);
    console.log(`secret=${s}`);
    const tx = await htlc.withdraw(withdrawContractId, s);
    console.log(tx);
    await tx.wait(1);
  }

  return(
    <div>
      <Navbar/><br/>
      {!loading && <div>
        contract ID on other side : <input type="text" style = {{width: 500}} onChange={onWithdrawContractIdChange}/><br/>
        reveal secret: <input type="text" onChange={onSecretChange}/><br/>
        <button type="button" className="btn btn-success"  onClick={withdraw}>Withdraw</button><br/>
      </div>}
    </div>
  );
}

export default Withdraw;