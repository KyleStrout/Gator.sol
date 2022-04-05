/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
// monaco editor
import Editor from "@monaco-editor/react";
// mui
import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useLocation } from "react-router-dom";

import AddressContext from "../AddressContext";
import ContractContext from "../ContractContext";
import { ThemeContext } from "../ThemeContext";

import { Formik, Field, Form } from "formik";

import web3 from "web3";

export default function CodeEditor(props) {
  const [newTransactions, setNewTransactions] = useState([]);
  const { customTheme } = React.useContext(ThemeContext);
  const [outputWithAddress, setOutputWithAddress] = useState([]);
  const { contractData, setContractData } = React.useContext(ContractContext);
  const [hasArguments, setHasArguments] = useState(false);
  const [placeHolderText, setPlaceHolderText] = useState("");

  useEffect(() => {
    const url = window.location.href.split("/").pop();
    setContractData({
      ...contractData,
      [url]: {
        ...contractData[url],
        transactions: newTransactions,
      },
    });
  }, [newTransactions]);

  useEffect(() => {
    const url = window.location.href.split("/").pop();
    setContractData({
      ...contractData,
      [url]: {
        ...contractData[url],
        compilerData: outputWithAddress ? outputWithAddress : [],
      },
    });
  }, [outputWithAddress]);

  const location = useLocation();

  React.useEffect(() => {
    const url = location.pathname.split("/").pop();
    const section = contractData[url];
    if (section) {
      setNewTransactions(section.transactions ?? []);
    } else {
      setNewTransactions([]);
    }
  }, [location]);

  const editorRef = useRef(null);

  const { address } = React.useContext(AddressContext);
  //const [currentTheme, setCustomTheme] = React.useContext(ThemeContext);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  function handleEditorChange(value, event) {
    //console.log("here is the current model value:\n", value);
  }
  function handleEditorValidation(markers) {
    markers.forEach((marker) => console.log("onValidate:", marker.message));
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

  function getArguments(contractData) {
    let argumentList = {};
    contractData.forEach((contract) => {
      if (contract.abi.find((abi) => abi.type === "constructor")) {
        argumentList[contract.name] = {
          arguments: contract.abi.find((abi) => abi.type === "constructor")
            .inputs,
        };
      }
    });
    if (Object.values(argumentList).length > 0) {
      setHasArguments(true);
    } else {
      setHasArguments(false);
    }
    return argumentList;
  }

  const initialValues = {
    arguments: "",
  };

  const onSubmit = async (values) => {
    console.log("submitted");
    console.log(values.arguments);
    const data = values.arguments;

    const parsedData = [];
    // parse a comma seperated list of arguments
    data.split(",").forEach((arg) => {
      parsedData.push(arg.trim());
    });
    console.log(parsedData);
    console.log(contractData);
    const encodedParsedData = [];
    // encode the arguments
    parsedData.forEach((arg) => {
      encodedParsedData.push(web3.utils.asciiToHex(arg));
    });
    console.log(encodedParsedData);

    const compilerData =
      contractData[window.location.href.split("/").pop()].compilerData;

    const args = contractData[window.location.href.split("/").pop()].arguments;

    const response = await fetch("http://localhost:3001/deployWithArguments", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        compilerData,
        args,
        argValues: parsedData,
      }),
    });

    const encodedData = await response.json();
    for (let i = 0; i < encodedData.length; i++) {
      let transactionObject = {
        data: encodedData[0],
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

      console.log(res);
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
            console.log("RECEIPT", rec);
            let transaction = {
              method: "constructor",
              contractName: compilerData[i].name,
              ...rec,
            };
            setNewTransactions((newTransactions) => [
              ...newTransactions,
              transaction,
            ]);

            clearInterval(intervalId);
          }
        },
        1000,
        res,
        intervalId
      );
    }
  };

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

    const argumentList = getArguments(output);

    setContractData({
      ...contractData,
      [url]: {
        ...contractData[url],
        compilerData: output,
        arguments: argumentList,
      },
    });

    if (Object.values(argumentList).length > 0) {
      let tempText = "";
      Object.values(argumentList).forEach((contract) => {
        contract.arguments.forEach((argument) => {
          tempText += `${argument.type} ${argument.name}, `;
        });
      });
      setPlaceHolderText(tempText);
    }
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
            };
            setNewTransactions((newTransactions) => [
              ...newTransactions,
              transaction,
            ]);

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
      contractData[url].compilerData?.some((contract) => contract.abi)
    );
  };

  return (
    <Box
      sx={{
        borderBottom: customTheme.border,
      }}
    >
      <Editor
        height="calc(50vh - 6rem)"
        width="100%"
        defaultLanguage="sol"
        defaultValue={props.defaultCode}
        language="sol"
        theme={customTheme.codeEditor} // if we dont want dark theme, we can use theme="vs" for light mode (can also be dynamic if we add a button for it)
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        onValidate={handleEditorValidation}
        keepCurrentModel={false}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
        }}
      />
      {/* This button is like run/compile and will send value to remix api*/}
      {/* Can edit the button however we want it ==== nothing here is final ====*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: customTheme.buttonsbackground,
          height: "4rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Button
            sx={{
              margin: "0 0.5rem",
              backgroundColor: customTheme.compileButton,
            }}
            onClick={compile}
            //color= {customTheme.backgroundColor}
            variant="contained"
          >
            Compile
          </Button>
          {!hasArguments && (
            <Button
              sx={{ margin: "0 0.5rem" }}
              color="secondary"
              variant="contained"
              disabled={!canDeploy()}
              onClick={deploy}
            >
              Deploy
            </Button>
          )}
          {/* need help styling this it looks really bad and probably needing some sort of dropdown or way to expand the arguments */}
          {hasArguments && (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              sx={{ style: "inherit" }}
            >
              {(props) => (
                <Form>
                  <Button
                    type="submit"
                    sx={{ margin: "0 0.5rem", padding: "" }}
                    color="secondary"
                    variant="contained"
                    disabled={!canDeploy()}
                  >
                    Deploy
                  </Button>
                  <Field
                    as={TextField}
                    inputProps={{ style: { fontSize: 12 } }}
                    label="arguments"
                    name="arguments"
                    placeholder={placeHolderText}
                    variant="standard"
                    required
                  />
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Box>
    </Box>
  );
}
