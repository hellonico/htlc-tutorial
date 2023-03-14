import Navbar from "./Navbar";

const Home = ({loading, chainId, account, ctk, htlc, web3Handler}) => {
  return (
      <div>
        {loading ? (
            <button type="button" className="btn btn-primary" onClick={web3Handler}>Connect Metamask</button>
        ) : (
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
                          <th scope="row">Chain Id</th>
                          <td>{chainId}</td>
                      </tr>
                      <tr>
                          <th scope="row">Account</th>
                          <td>{account}</td>
                      </tr>
                      <tr>
                          <th scope="row">Token Address</th>
                          <td>{ctk.address}</td>
                      </tr>
                      <tr>
                          <th scope="row">HTLC address</th>
                          <td>{htlc.address}</td>
                      </tr>

                      </tbody>
                  </table>

            </div>
          </div>
        )}
      </div>
  );
}
 
export default Home;