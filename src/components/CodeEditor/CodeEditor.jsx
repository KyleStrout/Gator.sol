import React, { useRef, useState, useEffect } from "react";
// monaco editor
import Editor from "@monaco-editor/react";
// mui
import { Button, Box } from "@mui/material";

import ThemeSwitch from "./ThemeSwitch";
import AddressContext from "../AddressContext";
import ContractContext from "../ContractContext";

// Can have default code/imports/version here and can be dynamic for exercises

export default function CodeEditor(props) {
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState("vs-light");
  const [newTransactions, setNewTransactions] = useState([]);
  useEffect(() => {
    const url = window.location.href.split("/").pop();
    setContractData({
      ...contractData,
      [url]: {
        compilerData: outputWithAddress,
        transactions: newTransactions,
      },
    });
  }, [newTransactions])


  const [outputWithAddress, setOutputWithAddress] = useState([]);

  const editorRef = useRef(null);

  const { address } = React.useContext(AddressContext);
  const { contractData, setContractData } = React.useContext(ContractContext);

  useEffect(() => {
    checked ? setTheme("vs-dark") : setTheme("vs-light");
  }, [checked]);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  function handleEditorChange(value, event) {
    //console.log("here is the current model value:\n", value);
  }
  function handleEditorValidation(markers) {
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }
  function handleSwitchChange(event) {
    setChecked(event.target.checked);
  }

  function checkError(data) {
    let errorList = [];
    data.errors?.forEach((error) => {
      if (error.severity === "error" || error.errorCode === "3420") {
        var errorInfo = {
          ERROR: `Compilation failed: ${error.message} (type: ${error.type}, code: ${error.errorCode}).`,
        };
        errorList.push(errorInfo);
      }
    });
    return errorList;
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(props.defaultCode);
    }
  }, [props.defaultCode]);

  async function compile() {
    const response = await fetch("http://localhost:3001/compile", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ value: editorRef.current.getValue() }),
    });

    const data = await response.json();
    const errorInfo = checkError(data);
    const url = window.location.href.split("/").pop();
    if (errorInfo?.length > 0) {
      setContractData((prevState) => ({
        ...prevState,
        [url]: {
          ...prevState[url],
          compilerData: errorInfo,
        },
      }));
      return;
    }

    const output = Object.keys(data.contracts["test.sol"]).map((key) => {
      return {
        name: key,
        abi: data.contracts["test.sol"][key].abi,
        address: "",
        bytecode: data.contracts["test.sol"][key].evm.bytecode.object,
      };
    });

    setContractData({
      ...contractData,
      [url]: {
        compilerData: output,
      },
    });
  }

  async function deploy() {
    const compilerData =
      contractData[window.location.href.split("/").pop()].compilerData;

    for (let i = 0; i < compilerData.length; i++) {
      const { bytecode } = compilerData[i];
      let transactionObject = {
        data: "0x" + bytecode,
        from: address,
      };
      const gas = await window.ethereum.request({
        method: "eth_estimateGas",
        params: [transactionObject],
      });
      transactionObject.gas = gas;

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
            const out = compilerData.map((contract) => {
              return {
                ...contract,
                address: rec.contractAddress,
              };
            });
            setOutputWithAddress(out);
            let transaction = {
              method: "constructor",
              contractName: compilerData[i].name,
              //mutability: "pure",
              ...rec,
            }
            setNewTransactions(newTransactions => [...newTransactions, transaction]);

            clearInterval(intervalId);
          }
        },
        1000,
        res,
        intervalId
      );
    }
  }

  const canDeploy = () => {
    // can deploy if the compiler data has at least one abi for this url
    const url = window.location.href.split("/").pop();
    return (
      contractData[url] &&
      contractData[url].compilerData.some((contract) => contract.abi)
    );
  };

  return (
    <Box
      sx={{
        borderBottom: "0.5rem solid #f0f0f0",
      }}
    >
      <Editor
        height="calc(50vh - 6rem)"
        width="100%"
        defaultLanguage="sol"
        defaultValue={props.defaultCode}
        language="sol"
        theme={theme} // if we dont want dark theme, we can use theme="vs" for light mode (can also be dynamic if we add a button for it)
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        onValidate={handleEditorValidation}
        keepCurrentModel={false}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "off",
        }}
      />
      {/* This button is like run/compile and will send value to remix api*/}
      {/* Can edit the button however we want it ==== nothing here is final ====*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme === "vs-dark" ? "#1e1e1e" : "white",
          height: "4rem",
        }}
      >
        <ThemeSwitch
          checked={checked}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ margin: "0 0.5rem" }}
            onClick={compile}
            color="secondary"
            variant="contained"
          >
            Compile
          </Button>

          <Button
            sx={{ margin: "0 0.5rem" }}
            color="secondary"
            variant="contained"
            disabled={!canDeploy()}
            onClick={deploy}
          >
            Deploy
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
