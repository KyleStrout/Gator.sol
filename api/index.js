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

app.post("/api/compile", (req, res, next) => {
  console.log(req.body.value);
  try {
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
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/getMethodData", (req, res) => {
  try {
    const method = req.body.method;
    const inputs = req.body.inputs;
    console.log("inputs: ", inputs);
    console.log(method, inputs);

    const encodedFunc = web3.eth.abi.encodeFunctionCall(method, inputs);

    console.log("encoded function: ", encodedFunc);

    res.send({ encodedFunc });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/deployWithArguments", async (req, res) => {
  try {
    const compilerData = req.body.compilerData;
    const args = req.body.args;
    const argValues = req.body.argValues;

    const encodedAbis = [];
    let lastIndex = 0;
    for (let i = 0; i < compilerData.length; i++) {
      const { abi, bytecode, name } = compilerData[i];
      const currentArgs = args[name];
      console.log(currentArgs);
      const numOfArgs = currentArgs.arguments.length;
      // get slice of argValues based on length of numOfArgs
      const currentArgValues = argValues.slice(
        lastIndex,
        numOfArgs + lastIndex
      );
      lastIndex += numOfArgs;

      for (let i = 0; i < currentArgs.arguments.length; i++) {
        const argType = currentArgs.arguments[i].type;
        console.log("argType: ", argType);
        const argValue = currentArgValues[i];

        //console.log("argType", argType);
        if (argType === "bytes32[]") {
          //console.log(argValue);
          // make string into array
          const argValueArray = argValue.slice(1, -1).split(",");
          console.log("argValueArray: ", argValueArray);
          // const newArray = JSON.parse(argValue.replace("'", '"'));
          const typedArgValueArray = argValueArray.map((arg) => {
            const hex = web3.utils.asciiToHex(arg);
            return web3.utils.padRight(hex, 64, "0");
          });
          currentArgValues[i] = typedArgValueArray;
        } else if (argType === "bytes32") {
          const hex = web3.utils.asciiToHex(argValue);
          currentArgValues[i] = web3.utils.padRight(hex, 64, "0");
        } else if (argType === "uint256" || argType === "int256") {
          currentArgValues[i] = parseInt(argValue);
        } else {
          currentArgValues[i] = argValue;
        }
      }

      const contract = new web3.eth.Contract(abi);
      const encodedAbi = contract
        .deploy({
          data: `0x${bytecode}`,
          arguments: currentArgValues,
        })
        .encodeABI();
      //console.log(encodedAbi);
      encodedAbis.push(encodedAbi);
    }
    res.send(encodedAbis);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;

// get value from codeeditor and send it to the server
