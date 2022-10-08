const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "junior elite gate true palace layer provide town ask wheel knock biology",
  "https://goerli.infura.io/v3/0b3ceaa6c1db43ffb31c85e91bf870c3"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log(`Contract deployed to: ${result.options.address}`);
  provider.engine.stop();
};
deploy();
