const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const solc = require("solc");

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

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// get value from codeeditor and send it to the server
