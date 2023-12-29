import { ethers, upgrades } from "hardhat";
import fs from "fs";

async function main() {
  const decentralizedDriveContract = await ethers.getContractFactory(
    "DecentralizedDrive"
  );

  const decentralizedDrive = await upgrades.deployProxy(
    decentralizedDriveContract,
    [],
    {
      initializer: "initialize",
    }
  );

  await decentralizedDrive.waitForDeployment();

  fs.writeFileSync(
    "contractAddress.json",
    `{\n "DecentralizedDriveContractAddress" :${decentralizedDrive.target} "" \n }`
  );

  console.log(`Contract deployed to: ${decentralizedDrive.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
