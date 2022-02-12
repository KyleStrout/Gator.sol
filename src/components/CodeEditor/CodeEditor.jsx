import React, { useRef, useState, useEffect } from "react";
// monaco editor
import Editor from "@monaco-editor/react";
// mui
import { Button, Box } from "@mui/material";

import ThemeSwitch from "./ThemeSwitch";
import AddressContext from "../AddressContext";

// Can have default code/imports/version here and can be dynamic for exercises

export default function CodeEditor(props) {
  const [checked, setChecked] = useState(false);
  const [compilerData, setCompilerData] = useState(null);
  const [theme, setTheme] = useState("vs-light");

  const editorRef = useRef(null);

  const { address } = React.useContext(AddressContext);

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
    if (errorInfo.length > 0) {
      props.onCompile(errorInfo);
      return;
    }

    const output = Object.keys(data.contracts["test.sol"]).map((key) => {
      return {
        name: key,
        abi: data.contracts["test.sol"][key].abi,
        bytecode: data.contracts["test.sol"][key].evm.bytecode.object,
      };
    });
    props.onCompile(output);
    setCompilerData(output);
  }

  async function deploy(compilerData) {
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
      console.log("res", res);
    }
  }

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
            disabled={compilerData === null}
            onClick={() => deploy(compilerData)}
          >
            Deploy
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
