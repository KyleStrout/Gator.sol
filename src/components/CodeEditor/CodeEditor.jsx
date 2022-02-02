import React, { useRef, useEffect, useState } from "react";
// monaco editor
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
// mui
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';


// Can have default code/imports/version here and can be dynamic for exercises

const ThemeSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

export default function CodeEditor(props)
{
    const defaultCode = props.defaultCode;

    const [checked, setChecked] = React.useState(true);
    // can have a db keep track of this if you want it to be persistent
    const [theme, setTheme] = React.useState("vs-dark");

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

    const handleSwitchChange = (event) => {
        setChecked(event.target.checked);
    }

    useEffect(() => {
        if (checked) {
            setTheme("vs-dark");
        } else {
            setTheme("vs-light");
        }
    }, [checked]);

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
            theme={theme} // if we dont want dark theme, we can use theme="vs" for light mode (can also be dynamic if we add a button for it)
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
        <Button sx = {{marginTop: "-7px", marginLeft: "0em"}}
        onClick={() => {
            showValue();
          }} 
        color="secondary" variant="contained">
            <Typography>Show Value</Typography>
        </Button>
        <ThemeSwitch sx={{ m: 1, marginLeft: "20em", marginTop:"3px" }} checked={checked} onChange={handleSwitchChange} inputProps={{ 'aria-label': 'controlled' }} />
        </Container>
        
    )
}