import gitmonLogo from "./assets/gitmon.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://github.com/ixfp/gitmon" target="_blank">
          <img src={gitmonLogo} className="logo" alt="Gitmon logo" />
        </a>
      </div>
      <h1>gitmon.blog</h1>
      <p className="read-the-docs">
        A blog integrated with GitHub for easy content synchronization and
        updates.
      </p>
    </>
  );
}

export default App;
