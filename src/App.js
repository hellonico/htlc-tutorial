import { useState } from "react";
import { ethers } from "ethers"
import CTK_ABI from "./metadata/CToken.json";
import HTLC_ABI from "./metadata/HashedTimelockERC20.json";
import CTK_ADDRESSES from "./metadata/CToken-address.json";
import HTLC_ADDRESSES from "./metadata/HashedTimelockERC20-address.json";
import Home from "./Home";
import Create from "./Create";
import Withdraw from "./Withdraw";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [ctk, setCtk] = useState(null);
  const [htlc, setHtlc] = useState(null);
  const [signer, setSigner] = useState(null);

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

  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element={
              <Home loading={loading} chainId={chainId} account={account} ctk={ctk} htlc={htlc} web3Handler={web3Handler}/>
            } />
            <Route exact path="/withdraw" element={
              <Withdraw loading={loading} htlc={htlc} />
            } />
            <Route exact path="/create" element={
              <Create loading={loading} ctk={ctk} htlc={htlc} />
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
