var express = require("express");
var app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
var solc = require("solc");
var Web3 = require("web3");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/compile", (req, res, next) => {
  const content = req.body.value;
  console.log(content);

  var input = {
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

  var output = JSON.parse(solc.compile(JSON.stringify(input)));
  res.send(output);
  // `output` here contains the JSON output as specified in the documentation
  for (var contractName in output.contracts["test.sol"]) {
    console.log(
      contractName +
        ": " +
        output.contracts["test.sol"][contractName].evm.bytecode.object
    );
  }
});

app.post("/deploy", (req, res, next) => {
  var web3 = new Web3("http://localhost:3001");
  let abi = req.body.abi;
  let bytecode = "0x" + req.body.bytecode;

  // abi, address (like a node to connect to?), options (bytecode, gasPrice, etc.)
  let contract = new web3.eth.Contract(abi);
  // contract has object with list of methods and events

  //console.log(web3);
  console.log(contract);
  res.send(JSON.parse(JSON.stringify(contract)));
  // TODO: Figure out how to keep contract in application
  // Could use a state in a parent component, or use somehting like redux
  // https://redux.js.org/
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// get value from codeeditor and send it to the server
