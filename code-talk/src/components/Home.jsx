import Editor from "./Editor";
import '../styles/Home.css';
import ButtonAppBar from "./AppBar";
import Settings from "./Settings";

const Home = () => {
  return (
    <div className="home-container">
      <ButtonAppBar />
      <Settings />

      <div className="editor-container">
        <div className="code-editor">
          <Editor height="80vh" />
        </div>

        <div className="code-input-output">
          <div className="code-input">
            <Editor height="40vh" />
          </div>

          <div className="code-output">
            <Editor height="40vh" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
