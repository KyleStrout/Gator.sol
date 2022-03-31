const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const solc = require("solc");
const Web3 = require("web3");

const web3 = new Web3("ws://localhost:8545");
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
  const data = [];
  for (let i = 0; i < contracts.length; i++) {
    // create a web3 contract
    const contract = new web3.eth.Contract(contracts[i].abi);
    // deploy the contract
    const deployData = await contract.deploy({
      data: contracts[i].bytecode,
    });

    // estimate gas
    const gas = await deployData.estimateGas();

    let signedTransaction = await web3.eth.accounts.signTransaction(
      { ...deployData, gas: gas },
      "0xc3f2c5637b88aa992af89fc5e10f5bbd3d533424097c43d0a126a25e1e8ae051"
    );
    const deploy = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    data.push(deploy);
  }
  res.send(
    JSON.stringify({
      data,
    })
  );
});

app.post("/transact", async (req, res) => {
  const transactionObject = req.body.transactionObject;
  const method = req.body.method;
  // get accounts
  const accounts = await web3.eth.getAccounts();
  // get first account
  const address = accounts[0];
  // add the address to the transaction object
  transactionObject.from = address;
  // console.log(transactionObject);

  if (method.stateMutability === "view") {
    console.log("here");

    web3.eth
      .getCode("0xf0754adb533140e31510418d236614bc282a4947")
      .then(console.log);
    // web3.eth.call(
    //   {
    //     to: transactionObject.to,
    //     data: transactionObject.data,
    //     from: address,
    //   },
    //   "latest",
    //   (err, res) => {
    //     console.log("error", err);
    //     console.log("res", res);
    //   }
    // );
    // console.log(response);
    return;
  }

  const gas = await web3.eth.estimateGas({
    to: transactionObject.to,
    data: transactionObject.data,
  });
  transactionObject.gas = gas;

  // console.log(gas);
  // const gas = await transactionObject.estimateGas();
  // console.log(gas);
  // let signedTransaction = await web3.eth.accounts.signTransaction(
  //   { ...transactionObject, gas: gas },
  //   "0x06ce293b3fdf650353d342e8d3a296b0ec788dc497c6dc034f119d3a55828315"
  // );
  // // console.log(signedTransaction);
  // web3.eth
  //   .sendSignedTransaction(signedTransaction.rawTransaction)
  //   .on("transactionHash", console.log)
  //   .on("receipt", console.log);

  // const transactionData = await web3.eth.getTransaction(
  //   transaction.transactionHash
  // );
  // console.log(transactionData);

  // res.send(JSON.stringify({ transaction }));
});

app.post("/getMethodData", (req, res) => {
  const method = req.body.method;
  const inputs = req.body.inputs;
  const encodedFunc = web3.eth.abi.encodeFunctionCall(method, inputs);
  res.send({ encodedFunc });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// get value from codeeditor and send it to the server
