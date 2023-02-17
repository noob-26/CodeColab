import Editor from "./Editor";
import '../styles/Home.css';
import ButtonAppBar from "./AppBar";
import Settings from "./Settings";
import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { useContext } from "react";
import socketContext from "../utils/socketContext";

const Home = () => {
  const [theme, setTheme] = useState('monokai');
  const [language, setLanguage] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const params = useParams();
  const socket = useContext(socketContext);
  const {id} = params;

  useEffect(() => {
    socket.emit("send-room", id);

    socket.on("send-current-code", (code) => {
      setCode(code);
    });

    socket.on("send-current-input", (code) => {
      setInput(code);
    });

    socket.on("send-current-output", (code) => {
      setOutput(code);
    });

    socket.on("code-receive", (code) => {
      setCode(code);
    });

    socket.on("input-receive", (code) => {
      setInput(code);
    });

    socket.on("output-receive", (code) => {
      setOutput(code);
    });

  }, []);

  const onEditorChange = (newValue) => {
    setCode(newValue);
    socket.emit("code-changed", {
      code: newValue,
      room: id
    });
  }

  const onInputChange = (newValue) => {
    setInput(newValue);
    socket.emit("input-changed", {
      code: newValue,
      room: id
    })
  };

  const onOutputChange = (newValue) => {
    setOutput(newValue);
    socket.emit("output-changed", {
      code: newValue,
      room: id,
    });
  };

  return (
    <div className="home-container">
      <ButtonAppBar />
      <Settings
        code={code}
        input={input}
        setOutput={setOutput}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      <div className="editor-container">
        <div className="code-editor">
          <Editor
            onChange={(newvalue) => {
              onEditorChange(newvalue);
            }}
            code={code}
            setCode={setCode}
            height="80vh"
            theme={theme}
            language={language}
            fontSize={fontSize}
            placeholder={"Write your code here"}
          />
        </div>

        <div className="code-input-output">
          <div className="code-input">
            <Editor
              onChange={(newvalue) => {
                onInputChange(newvalue);
              }}
              code={input}
              setCode={setInput}
              height="40vh"
              theme={theme}
              language={"markdown"}
              fontSize={fontSize}
              placeholder={"Put your input here"}
            />
          </div>

          <div className="code-output">
            <Editor
              onChange={(newvalue) => {
                onOutputChange(newvalue);
              }}
              code={output}
              setCode={setOutput}
              height="40vh"
              theme={theme}
              language={"markdown"}
              fontSize={fontSize}
              placeholder={"Your output appears here"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
