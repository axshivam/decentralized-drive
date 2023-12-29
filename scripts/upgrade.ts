import { ethers, upgrades } from "hardhat";
import fs from "fs";

async function main() {
  const contractAddress = "";

  const decentralizedDriveContractV2 = await ethers.getContractFactory(
    "DecentralizedDriveV2"
  );

  const decentralizedDriveV2 = await upgrades.upgradeProxy(
    contractAddress,
    decentralizedDriveContractV2
  );

  await decentralizedDriveV2.waitForDeployment();

  console.log(
    `DecentralizedDrive Contract upgraded to: ${decentralizedDriveV2.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
