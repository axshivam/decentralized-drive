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

  const proxyContractAddress = await decentralizedDrive.getAddress();

  fs.writeFileSync(
    "contractAddress.json",
    `{\n "DecentralizedDriveContractAddress" :"${proxyContractAddress}" \n}`
  );

  console.log(`Contract deployed to: ${proxyContractAddress}`);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyContractAddress);

  console.log("Implementation Address:", implementationAddress);

  fs.writeFileSync("ImplementationAddress.json", `{\n "Implementation" :"${implementationAddress}" \n}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
