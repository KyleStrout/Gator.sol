const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const solc = require("solc");
const Web3 = require("web3");

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
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

app.post("/getMethodData", (req, res) => {
  const method = req.body.method;
  const inputs = req.body.inputs;
  console.log("inputs: ", inputs);
  console.log(method, inputs);

  const encodedFunc = web3.eth.abi.encodeFunctionCall(method, inputs);

  console.log(encodedFunc);

  res.send({ encodedFunc });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// get value from codeeditor and send it to the server
