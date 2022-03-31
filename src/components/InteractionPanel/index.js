import AddressContext from "../AddressContext";
import { useContext, useState } from "react";
import ContractContext from "../ContractContext";
import SimpleSnackbar from "../Snackbar";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ThemeContext } from "../ThemeContext";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Web3 = require("web3");

const web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");

export default function InteractionPanel(props) {
  const { address } = useContext(AddressContext);
  const { contractData, setContractData } = useContext(ContractContext);

  const { customTheme } = useContext(ThemeContext);
  const interact = async (contractAddress, method, contractName, ...args) => {
    let transactionObject = {
      from: address,
      to: contractAddress,
      data: "",
      gas: "",
    };

    const response = await fetch("http://localhost:3001/getMethodData", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ method, inputs: args }),
    });
    const { encodedFunc } = await response.json();
    // send the transaction
    transactionObject.data = encodedFunc;
    const gas = await window.ethereum.request({
      method: "eth_estimateGas",
      params: [transactionObject],
    });
    transactionObject.gas = gas;

    const url = window.location.href.split("/").pop();

    if (method.stateMutability === "view") {
      const res = await window.ethereum.request({
        method: "eth_call",
        params: [transactionObject, "latest"],
      });
      let newTransactions;
      if (contractData[url].transactions) {
        newTransactions = [
          ...contractData[url].transactions,
          {
            method: method.name,
            contractName: contractName,
            //mutability: method.stateMutability,
            from: address,
            to: contractAddress,
            result: web3.eth.abi.decodeParameters(
              method.outputs.map((output) => output.type),
              res
            ),
          },
        ];
      } else {
        newTransactions = [
          {
            method: method.name,
            contractName: contractName,
            //mutability: method.stateMutability,
            from: address,
            to: contractAddress,
            result: web3.eth.abi.decodeParameters(
              method.outputs.map((output) => output.type),
              res
            ),
          },
        ];
      }
      setContractData((prevState) => ({
        ...prevState,
        [url]: {
          ...prevState[url],
          transactions: newTransactions,
        },
      }));
    } else {
      const res = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionObject],
      });
      let intervalId;
      intervalId = setInterval(
        async function () {
          let rec = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [res],
          });
          if (rec) {
            //console.log("Receipt:", rec);
            const url = window.location.href.split("/").pop();
            let newTransactions;
            let transaction = {
              method: method.name,
              contractName: contractName,
              //mutability: method.stateMutability,
              ...rec,
            };
            if (contractData[url].transactions) {
              newTransactions = [
                ...contractData[url].transactions,
                transaction,
              ];
            } else {
              newTransactions = [transaction];
            }
            setContractData((prevState) => ({
              ...prevState,
              [url]: {
                ...prevState[url],
                transactions: newTransactions,
              },
            }));
            clearInterval(intervalId);
          }
        },
        1000,
        res,
        intervalId
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    return Array.from(inputs).map((i) => {
      return i.value;
    });
  };

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(0deg)",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      transform: "rotate(-90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: "4px",
    },
  }));

  if (props.deployed) {
    return props.src.map((contract, index) => {
      return (
        <div key={index}>
          <Accordion defaultExpanded={true} square>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <h3>{contract.name}</h3> <small>at</small>{" "}
                <i>
                  {contract.address.slice(0, 8) +
                    "..." +
                    contract.address.slice(-5)}
                </i>
                {/* copy icon */}
                <SimpleSnackbar content={contract.address}></SimpleSnackbar>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {contract.abi.map((method, index) => {
                return (
                  <div key={index}>
                    <form
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                      }}
                      onSubmit={(e) => {
                        const parameters = onSubmit(e);
                        interact(
                          contract.address,
                          method,
                          contract.name,
                          ...parameters
                        );
                      }}
                    >
                      {typeof method.name !== "undefined" && (
                        <Button
                          sx={{
                            backgroundColor: customTheme.compileButton,
                            color: "white",
                            fontSize: "1.2rem",
                            margin: "0.5rem",
                          }}
                          type="submit"
                          variant="contained"
                        >
                          {method.name}
                        </Button>
                      )}
                      {method.type !== "constructor" &&
                        method.inputs.map((input, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                              }}
                            >
                              <TextField
                                name={`${input.name}-${input.type}`}
                                id="filled-basic"
                                label={input.name + ": " + input.type}
                                variant="filled"
                              />
                            </div>
                          );
                        })}
                    </form>
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        </div>
      );
    });
  }
  return <></>;
}
