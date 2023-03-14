async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  

    // const ctoken = await ethers.getContractFactory("CToken");
    // const ctk = await ctoken.deploy();
    // saveFrontendFiles(ctk , "CToken");
    // console.log("CToken address is " + ctk.address);

    // const HashedTimelockERC20 = await ethers.getContractFactory("HashedTimelockERC20");
    // const htlc = await HashedTimelockERC20.deploy();
    // saveFrontendFiles(htlc , "HashedTimelockERC20");
    // console.log("HTLC address is " + htlc.address);

  }
  
  function saveFrontendFiles(contract, name) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../metadata";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address: contract.address }, undefined, 2)
    );
  
    const contractArtifact = artifacts.readArtifactSync(name);
  
    fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(contractArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });