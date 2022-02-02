import React, { useRef, useEffect, useState } from "react";
// monaco editor
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
// mui
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

// Can have default code/imports/version here and can be dynamic for exercises



export default function CodeEditor(props)
{
    const defaultCode = props.defaultCode;

  



    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        alert(editorRef.current.getValue());
    }

    function handleEditorChange(value, event) {
        console.log("here is the current model value:\n", value);
    }
    
    function handleEditorValidation(markers) {
        markers.forEach(marker => console.log("onValidate:", marker.message))
    }

    // possible handleSave function? need to research more on what it does exactly
    // function handleSave()

    return (
        <Container>
        <Editor
            height="75.5vh"
            width="80vh"
            defaultLanguage="sol"
            defaultValue={defaultCode}
            language="sol"
            saveViewState={true}
            theme="vs-dark" // if we dont want dark theme, we can use theme="vs" for light mode (can also be dynamic if we add a button for it)
            lineHeight="19"
            lineNumbers="on"
            automaticLayout={true}
            verticalScrollbarSize={12}
            horizontalScrollbarSize={10}
            vertical="auto"
            horizontal="auto"
            scrollBeyondLastLine={false}
            editorDidMount={handleEditorDidMount} 
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
            onValidate={handleEditorValidation}
        />
        {/* This button is like run/compile and will send value to remix api*/}
        {/* Can edit the button however we want it ==== nothing here is final ====*/}
        <Button sx = {{marginTop: "5px"}}
        onClick={() => {
            showValue();
          }} 
        color="secondary" variant="contained">
            <Typography>Show Value</Typography>
        </Button>
        
        </Container>
        
    )
}