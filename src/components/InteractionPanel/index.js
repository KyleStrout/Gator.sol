import AddressContext from "../AddressContext";
import { useContext, useState } from "react";
import ContractContext from "../ContractContext";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTheme } from "@mui/styles";

const Web3 = require("web3");

const web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");

let URL;
if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:3001";
} else {
  URL = "";
}
export default function InteractionPanel(props) {
  const theme = useTheme();
  const { address } = useContext(AddressContext);
  const { contractData, setContractData } = useContext(ContractContext);
  const interact = async (contractAddress, method, contractName, ...args) => {
    let transactionObject = {
      from: address,
      to: contractAddress,
      data: "",
      gas: "",
    };

    setOpen(false);
    setMessage("Calling method: " + method.name + "...");
    setOpen(true);

    const response = await fetch(`${URL}/api/getMethodData`, {
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

    if (
      method.stateMutability === "view" ||
      method.stateMutability === "pure"
    ) {
      const res = await window.ethereum.request({
        method: "eth_call",
        params: [transactionObject, "latest"],
      });
      const decoded = await web3.eth.abi.decodeParameters(
        method.outputs.map((output) => output.type),
        res
      );
      console.log("decodedEntries: ", Object.values(decoded));
      const decodedEntries = Object.values(decoded);
      console.log("length: ", decodedEntries.length);
      let tempResult = "";
      for (let i = 0; i < decodedEntries.length - 1; i++) {
        if (i === decodedEntries.length - 2) {
          tempResult += `${decodedEntries[i]}`;
        } else {
          tempResult += `${decodedEntries[i]}, `;
        }
      }
      method.result = tempResult;
      console.log(method.result);
      let newTransactions;
      if (contractData[url].transactions) {
        console.log("here");
        newTransactions = [
          ...contractData[url].transactions,
          {
            method: method.name,
            contractName: contractName,
            //mutability: method.stateMutability,
            from: address,
            to: contractAddress,
            result: tempResult,
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
      setTimeout(() => {
        setOpen(false);
        setMessage("Received response from blockchain!");
        setOpen(true);
      }, 1100);
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
          setMessage("Got TX recepit! Waiting on confirmation...");
          setCloseDuration(60000);
          setOpen(true);
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
            setOpen(false);
            setMessage("Confirmed!");
            setCloseDuration(1000);
            setOpen(true);
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
      marginTop: "0",
      marginBottom: "0",
    },
  }));

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [closeDuration, setCloseDuration] = useState(1000);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  if (props.deployed) {
    return props.src.map((contract, index) => {
      return (
        <div key={index}>
          <Accordion
            sx={{
              //color for interact pannel after/under expansion
              backgroundColor: theme.palette.sideNavAccordion,
              color: theme.palette.textColor,
            }}
            defaultExpanded={true}
            square
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                marginBlock: 0,
                backgroundColor: theme.palette.sideNavAccordion,
                color: theme.palette.textColor,
              }}
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: "1",
                  }}
                >
                  <Snackbar
                    open={open}
                    autoHideDuration={closeDuration}
                    onClose={handleClose}
                    message={message}
                    action={action}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  />
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={(e) => {
                      setMessage("Address copied to clipboard!");
                      setCloseDuration(1000);
                      setOpen(true);
                      e.stopPropagation();
                      navigator.clipboard.writeText(contract.address);
                      setOpen(true);
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={(e) => {
                      // navigate to rinkbey ether scan for contract address
                      window.open(
                        `https://rinkeby.etherscan.io/address/${contract.address}`,
                        "_blank"
                      );
                    }}
                  >
                    <LanguageIcon fontSize="small" />
                  </IconButton>
                </div>
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
                            backgroundColor: theme.palette.compileButton,
                            color: "white",
                            margin: "0.5rem",
                            textTransform: "none",
                            fontSize: "1rem",
                          }}
                          size="medium"
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
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                flexGrow: 1,
                              }}
                            >
                              <TextField
                                name={`${input.name}-${input.type}`}
                                id="filled-basic"
                                label={
                                  <span
                                    style={{
                                      color: theme.palette.outputPanelText,
                                    }}
                                  >
                                    {input.name + ": " + input.type}
                                  </span>
                                }
                                //label={input.name + ": " + input.type}
                                variant="filled"
                                size="small"
                                sx={{ paddingTop: ".2rem" }}
                              />
                            </div>
                          );
                        })}
                      {method.result && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexGrow: 1,
                          }}
                        >
                          <span>
                            <small> Result: </small>
                            {method.result.length <= 32 && (
                              <strong> {method.result}</strong>
                            )}
                            {method.result.length > 32 && (
                              <strong>
                                {method.result.slice(0, 32) + "..."}
                              </strong>
                            )}
                          </span>
                        </div>
                      )}
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
