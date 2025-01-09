import gitmonLogo from "@assets/gitmon.svg";
import "@styles/landing.css";

function Landing() {
  return (
    <div className="text-center">
      <div>
        <a
          href="https://github.com/ixfp/gitmon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={gitmonLogo}
            className="logo react h-36 p-6 transition-filter duration-300 mx-auto"
            alt="Gitmon logo"
          />
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

export default Landing;
