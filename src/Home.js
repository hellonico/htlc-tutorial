import Navbar from "./Navbar";

const Home = ({loading, chainId, account, ctk, htlc, web3Handler}) => {
  return (
      <div>
        {loading ? (
          <div>
            <button type="button" className="btn btn-primary" onClick={web3Handler}>Connect Metamask</button>
          </div>
        ) : (
          <div>
            <Navbar />
            chain ID = {chainId}<br/>Account = {account} <br/> Token Address = {ctk.address}<br/>HTLC address = {htlc.address}<br/>
          </div>
        )}
      </div>
  );
}
 
export default Home;