import { useState } from "react";
import { ethers } from "ethers"
import CTK_ABI from "./metadata/CToken.json";
import HTLC_ABI from "./metadata/HashedTimelockERC20.json";
import CTK_ADDRESSES from "./metadata/CToken-address.json";
import HTLC_ADDRESSES from "./metadata/HashedTimelockERC20-address.json";

const address = {"5":{"ctk":{}}}
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [ctk, setCtk] = useState(null);
  const [htlc, setHtlc] = useState(null);
  const [signer, setSigner] = useState(null);
  const [amount, setAmount] = useState(null);
  const [secret, setSecret] = useState(null);
  const [hashlock, setHashlock] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [contractId, setContractId] = useState('');
  const [withdrawContractId, setWithdrawContractId] = useState(null);


  const web3Handler = async () => {
    const chainId = parseInt(await window.ethereum.request({ method: 'eth_chainId' }));
    setChainId(chainId);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);

    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();
    setSigner(signer);
    console.log(CTK_ADDRESSES[chainId]);
    const ctkContract = new ethers.Contract(CTK_ADDRESSES[chainId], CTK_ABI.abi, signer);
    console.log(signer);
    setCtk(ctkContract);
    const htlcContract = new ethers.Contract(HTLC_ADDRESSES[chainId], HTLC_ABI.abi, signer)
    setHtlc(htlcContract);

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    })
    loadContracts(signer)
  }
  const loadContracts = (signer) => {
    setLoading(false);
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

  const onWithdrawContractIdChange = (e) => {
    setWithdrawContractId(e.target.value);
  }

  const onSecretChange = (e) => {
    setSecret(e.target.value);
  }

  const withdraw = async() => {
    const s = ethers.utils.formatBytes32String(secret);
    console.log(`secret=${s}`);
    await htlc.withdraw(withdrawContractId, s);
  }

  return (
    <nav className="navbar">
        <div>
          {loading ? (
            <div>
              <button onClick={web3Handler}>Connect Metamask</button>
            </div>
          ) : (
            <div>
              chain ID = {chainId}<br/>Account = {account} <br/> Token Address = {ctk.address}<br/>HTLC address = {htlc.address}<br/>
              <br/><br/><br/>
              receiver: <input type="text" style = {{width: 400}} onChange={onReceiverChange}/><br/>
              timelock: <input type="text" onChange={onExpiryChange}/> expiry = {(new Date(expiry*1000)).toString()}<br/>
              hashlock: <input type="text"  style = {{width: 500}} onChange={onTimelockChange}/><br/>
              amount: <input type="text" onChange={onAmountChange}/> wei value = {amount}<br/>
              <button onClick={create}>Create HTLC contract</button><br/>
              new HTLC contract ID : {contractId}
              <br/><br/><br/>
              contract ID on other side : <input type="text" style = {{width: 500}} onChange={onWithdrawContractIdChange}/><br/>
              reveal secret: <input type="text" onChange={onSecretChange}/><br/>
              <button onClick={withdraw}>Withdraw</button><br/>
            </div>
          )}
        </div>
    </nav>
  );
}
 
export default Home;