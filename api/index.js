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
  //console.log(content);

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
  console.log(output);
});

app.post("/deploy", (req, res, next) => {
  const compilerData = req.body.value;
  console.log("compilerData: ", compilerData);

  var web3 = new Web3(
    "https://rinkeby.infura.io/v3/0c6e1fdd5857469c92b40636f1cdf73a"
  );

  compilerData.forEach((contract) => {
    let contractABI = contract.abi;
    let contractBytecode = "0x" + contract.bytecode;
    let contractInstance = new web3.eth.Contract(contractABI);
    let contractAddress = contractInstance
      // newContractInstance.options.address
      .deploy({
        data: contractBytecode,
      })
      .send({
        from: req.body.address,
        gas: "1000000",
      })
      .on("error", function (error) {
        console.log("ERROR");
      })
      .then(function (newContractInstance) {
        console.log(
          "Contract deployed to: ",
          newContractInstance.options.address
        );
      });
  });

  // res.send(JSON.stringify(newContractInstance.options.address));
  res.send({
    status: "ok",
  });

  // TODO: Figure out how to keep contract in application
  // Could use a state in a parent component, or use somehting like redux
  // https://redux.js.org/
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// get value from codeeditor and send it to the server
