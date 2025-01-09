import gitmonLogo from "./assets/gitmon.svg";
import "./index.css";
import "./App.css";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto p-8 text-center">
      <div >
        <a href="https://github.com/ixfp/gitmon" target="_blank" className="mx-auto">
          <img src={gitmonLogo} className="logo" alt="Gitmon logo" />
        </a>
      </div>
      <h1>gitmon.blog</h1>
      <p className="read-the-docs">
        A blog integrated with GitHub for easy content synchronization and
        updates.
      </p>
    </div>
  );
}

export default App;
