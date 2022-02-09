import React, { useRef, useState, useEffect } from "react";
// monaco editor
import Editor from "@monaco-editor/react";
// mui
import { Button, Box } from "@mui/material";

import ThemeSwitch from "./ThemeSwitch";

// Can have default code/imports/version here and can be dynamic for exercises

export default function CodeEditor(props) {
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState("vs-light");

  const [deployment, setDeployment] = useState(null);

  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  function handleEditorChange(value, event) {
    console.log("here is the current model value:\n", value);
  }
  function handleEditorValidation(markers) {
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }
  function handleSwitchChange(event) {
    setChecked(event.target.checked);
  }

  useEffect(() => {
    checked ? setTheme("vs-dark") : setTheme("vs-light");
  }, [checked]);

  async function compile() {
    const response = await fetch("http://localhost:3001/compile", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ value: editorRef.current.getValue() }),
    });

    const data = await response.json();
    props.onCompile(data);


    // this is terrible ill fix this later, but also we might have multiple contracts idk
    let contractName = "";
    for (var cName in data.contracts["test.sol"]) {
      contractName = cName;
    }

    setDeployment({
      ...deployment, 
      abi: data.contracts["test.sol"][contractName].abi, 
      bytecode: data.contracts["test.sol"][contractName].evm.bytecode.object
    })
  }

  async function deploy() {
    const response = await fetch("http://localhost:3001/deploy", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      // body: JSON.stringify({abi, bytecode}),
      body: JSON.stringify(deployment),
    });
      const data = await response.json();
      // TODO: send data to interaction tab
      //props.onDeploy(data);
  }

  // possible handleSave function? need to research more on what it does exactly
  // function handleSave()

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
        saveViewState={true}
        theme={theme} // if we dont want dark theme, we can use theme="vs" for light mode (can also be dynamic if we add a button for it)
        editorDidMount={handleEditorDidMount}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        onValidate={handleEditorValidation}
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
            disabled={deployment === null} 
            onClick={deploy}
          >
            Deploy
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
