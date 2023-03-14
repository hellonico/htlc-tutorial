import Navbar from "./Navbar";
import CHAINS from "./metadata/chains.json";

const Home = ({loading, chainId, account, ctk, htlc, web3Handler}) => {
    if(loading) {
        return(
            <button type="button" className="btn btn-primary" onClick={web3Handler}>Connect Metamask</button>
        )
    } else {

    }
    const chainName = CHAINS[chainId]["name"];
    const scan = CHAINS[chainId]["scan"];
    const scanAccount = scan+"/"+account;
    const scanMulti = "https://blockscan.com/address/"+account;
    const scanCtk = scan + "/" + ctk.address;
    const scanHtlc = scan + "/" + htlc.address;
  return (
          <div>
            <Navbar />
              <div className="container-fluid">
                  <table className="table">
                      <thead>
                      <tr>
                          <th scope="col">#</th>
                          <th scope="col">Value</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <th scope="row">Chain</th>
                          <td>{chainName}</td>
                      </tr>
                      <tr>
                          <th scope="row">Account</th>
                          <td>
                              <a target="_blank" href={scanAccount}>{account}</a>&nbsp;
                              [  <a target="_blank" href={scanMulti}>blockscan</a> ]
                          </td>
                      </tr>
                      <tr>
                          <th scope="row">Token Address</th>
                          <td><a target="_blank" href={scanCtk}>{ctk.address}</a></td>
                      </tr>
                      <tr>
                          <th scope="row">HTLC address</th>
                          <td><a target="_blank" href={scanHtlc}>{htlc.address}</a></td>
                      </tr>

                      </tbody>
                  </table>

            </div>
      </div>
  );
}
 
export default Home;