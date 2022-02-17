import AddressContext from "../AddressContext";
import { useContext } from "react";

export default function InteractionPanel(props) {
  const { address } = useContext(AddressContext);
  const interact = async (contractAddress, method, ...args) => {
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

    if (method.stateMutability === "view") {
      const res = await window.ethereum.request({
        method: "eth_call",
        params: [transactionObject, "latest"],
      });
      console.log("View: ", res);
    } else {
      const res = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionObject],
      });
      console.log("Transaction: ", res);
      let intervalId;
      intervalId = setInterval(
        async function () {
          let rec = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [res],
          });
          if (rec) {
            console.log("Receipt:", rec);
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

  // // for contract in src
  if (props.deployed) {
    return props.src.map((contract, index) => {
      return (
        <div key={index}>
          <h1>{contract.name}</h1>
          <p>{contract.address}</p>
          {contract.abi.map((method, index) => {
            return (
              <div key={index}>
                <h2>{method.name}</h2>
                <form
                  onSubmit={(e) => {
                    const parameters = onSubmit(e);
                    interact(contract.address, method, ...parameters);
                  }}
                >
                  <button type="submit">{method.name}</button>
                  {method.inputs.map((input, index) => {
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
        </div>
      );
    });
  }
  return <></>;
}
