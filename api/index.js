const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const solc = require("solc");
const Web3 = require("web3");

const web3 = new Web3("ws://178.128.155.103:8545");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/compile", (req, res, next) => {
  const content = req.body.value;

  const input = {
    language: "Solidity",
    sources: {
      "test.sol": {
        content: content,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  res.send(output);
});

app.post("/deploy", async (req, res) => {
  const contracts = req.body;
  // log the network name that we're on
  console.log(await web3.eth.getChainId());
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  // get account balances
  console.log(await web3.eth.getBalance(accounts[0]));

  for (let i = 0; i < contracts.length; i++) {
    console.log("here");
    // create a web3 contract
    const contract = new web3.eth.Contract(contracts[i].abi);
    // deploy the contract
    const deployData = await contract.deploy({
      data: contracts[i].bytecode,
    });

    let signedTransaction = await web3.eth.accounts.signTransaction(
      { ...deployData, gas: "1000000" },
      "0x299f7f8b4b5398c8532b437f4398af61be9c97f753699da5772d1d11e07be485"
    );
    const deploy = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    console.log(deploy);
  }
});

app.post("/getMethodData", (req, res) => {
  const method = req.body.method;
  const inputs = req.body.inputs;
  console.log("inputs: ", inputs);
  console.log(method, inputs);

  const encodedFunc = web3.eth.abi.encodeFunctionCall(method, inputs);

  console.log("encoded function: ", encodedFunc);

  res.send({ encodedFunc });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// get value from codeeditor and send it to the server
