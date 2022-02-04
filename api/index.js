var express = require("express");
var app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
var solc = require("solc");

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

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// get value from codeeditor and send it to the server
