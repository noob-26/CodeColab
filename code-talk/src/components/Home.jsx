import Editor from "./Editor";
import '../styles/Home.css';
import ButtonAppBar from "./AppBar";
import Settings from "./Settings";
import { useState } from 'react';

const Home = () => {
  const [theme, setTheme] = useState('monokai');
  const [language, setLanguage] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

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
              code={output}
              setCode={setOutput}
              height="40vh"
              theme={theme}
              language={"markdown"}
              fontSize={fontSize}
              placeholder={"Put your output here"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
