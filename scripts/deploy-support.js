const hre = require("hardhat");

async function main() {
    
  const SupportContract = await hre.ethers.getContractFactory("Support");
  const supportContract  = await SupportContract.deploy();

  console.log("Storage contract deployed to:", supportContract.target);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// Telos: Support contract deployed to: 0x5Ac64F5DA22B25559C7D7522b4B2BB7e2012F382