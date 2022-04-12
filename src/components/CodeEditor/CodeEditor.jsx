/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
// monaco editor
import Editor from "@monaco-editor/react";
// mui
import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useLocation } from "react-router-dom";

import AddressContext from "../AddressContext";
import ContractContext from "../ContractContext";
import { useTheme } from "@mui/styles";
import { Formik, Field, Form } from "formik";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import web3 from "web3";

let URL;
if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:3001";
} else {
  URL = "";
}

export default function CodeEditor(props) {
  const theme = useTheme();
  const [newTransactions, setNewTransactions] = useState([]);
  const [outputWithAddress, setOutputWithAddress] = useState([]);
  const { contractData, setContractData } = React.useContext(ContractContext);
  const [hasArguments, setHasArguments] = useState(false);

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

  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { address } = React.useContext(AddressContext);

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
    contractData?.forEach((contract) => {
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
    setDialogOpen(false);
    setOpen(true);
    setMessage("Deploying contract...");

    console.log(values);
    const data = Object.values(values).slice(1, Object.values(values).length);
    console.log(data);

    const parsedData = [];
    // parse a comma seperated list of arguments
    data.forEach((arg) => {
      parsedData.push(arg.trim());
    });
    const encodedParsedData = [];
    // encode the arguments
    parsedData.forEach((arg) => {
      encodedParsedData.push(web3.utils.asciiToHex(arg));
    });

    console.log(parsedData);

    const compilerData =
      contractData[window.location.href.split("/").pop()].compilerData;

    const args = argumentList;
    console.log("args", args);

    const body = {
      compilerData,
      args,
      argValues: parsedData,
    };
    console.log(body);
    let response;
    try {
      response = await fetch(`${URL}/api/deployWithArguments`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }

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
            setOpen(true);
            setMessage("Got transaction receipt! Waiting to be mined...");
            setOutputWithAddress(out);
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
            setOpen(true);
            setMessage("Contract deployed successfully!");
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

  const [argumentList, setArgumentList] = useState({});

  async function compile() {
    setOpen(false);
    setMessage("Compiling...");
    setOpen(true);
    let response;
    try {
      response = await fetch(`${URL}/api/compile`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ value: editorRef.current.getValue() }),
      });
    } catch (error) {
      setMessage("Compilation failed. Server Error.");
    }
    if (!response) {
      return;
    }
    const data = await response.json();
    const errorInfo = checkError(data);
    const url = window.location.href.split("/").pop();
    if (errorInfo?.length > 0) {
      setTimeout(() => {
        setOpen(false);
        setMessage("Error compiling!");
        setOpen(true);
      }, 1100);
      setContractData((prevState) => ({
        ...prevState,
        [url]: {
          ...prevState[url],
          compilerData: errorInfo,
        },
      }));
      return;
    }
    setTimeout(() => {
      setOpen(false);
      setMessage("Done!");
      setOpen(true);
    }, 1100);

    const output = Object.keys(data.contracts["test.sol"]).map((key) => {
      return {
        name: key,
        abi: data.contracts["test.sol"][key].abi,
        address: "",
        bytecode: data.contracts["test.sol"][key].evm.bytecode.object,
      };
    });

    setArgumentList(getArguments(output));

    setContractData({
      ...contractData,
      [url]: {
        ...contractData[url],
        compilerData: output,
        arguments: argumentList,
      },
    });
  }

  async function deploy() {
    setOpen(false);
    setMessage("Deploying...");
    setOpen(true);
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
          setOpen(false);
          setMessage("Got TX receipt! Waiting for contract to be mined...");
          setOpen(true);
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
            setOpen(false);
            setMessage("Contract mined! Check the interaction panel!");
            setOpen(true);
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

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box
      sx={{
        borderBottom: theme.palette.border,
      }}
    >
      <Editor
        height="calc(50vh - 6rem)"
        width="100%"
        defaultLanguage="sol"
        defaultValue={props.defaultCode}
        language="sol"
        theme={theme.palette.codeEditor} // if we dont want dark theme, we can use theme="vs" for light mode (can also be dynamic if we add a button for it)
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
          backgroundColor: theme.palette.backgroundColor,
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
              backgroundColor: theme.palette.compileButton,
            }}
            onClick={compile}
            variant="contained"
          >
            Compile
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={action}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          />

          <Button
            sx={{
              margin: "0 0.5rem",
              backgroundColor: theme.palette.deployButton,
            }}
            variant="contained"
            disabled={!canDeploy()}
            onClick={hasArguments ? handleClick : deploy}
          >
            {hasArguments ? "Deploy with Arguments" : "Deploy"}
          </Button>
          {/* need help styling this it looks really bad and probably needing some sort of dropdown or way to expand the arguments */}
          {hasArguments && (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              sx={{ style: "inherit" }}
            >
              <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <Form>
                  <DialogTitle>Deploy with Arguments</DialogTitle>
                  <DialogContent>
                    {Object.values(argumentList).map((contract, index) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: "1rem",
                          }}
                          key={index}
                        >
                          {contract.arguments.map((argument) => {
                            return (
                              <Field
                                as={TextField}
                                inputProps={{ style: { fontSize: 12 } }}
                                label={argument.name}
                                name={argument.name}
                                variant="standard"
                                required
                                key={argument.name}
                              />
                            );
                          })}
                        </Box>
                      );
                    })}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        handleCloseDialog();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                      Deploy
                    </Button>
                  </DialogActions>
                </Form>
              </Dialog>
            </Formik>
          )}
        </Box>
      </Box>
    </Box>
  );
}
