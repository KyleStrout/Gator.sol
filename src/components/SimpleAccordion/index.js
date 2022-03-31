import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SimpleSnackbar from "../Snackbar";

export default function SimpleAccordion(props) {
  const { address } = useContext(AddressContext);

  const { contractData, setContractData } = useContext(ContractContext);

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

  const { contract } = props;
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div
            slot="header"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "10px",
            }}
          >
            <h3>{contract.name}</h3> <small>at</small>{" "}
            <i>
              {contract.address.slice(0, 8) +
                "..." +
                contract.address.slice(-5)}
            </i>
            <SimpleSnackbar content={contract.address}></SimpleSnackbar>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {contract.abi.map((method, index) => {
            return (
              <div key={index} slot="details">
                <h2>{method.name}</h2>
                <form
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
                    <button type="submit">{method.name}</button>
                  )}
                  {method.type !== "constructor" &&
                    method.inputs.map((input, index) => {
                      return (
                        <div key={index}>
                          <h3>{input.name}</h3>
                          <p>{input.type}</p>
                          <input name={`${input.name}-${input.type}`}></input>
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
}
