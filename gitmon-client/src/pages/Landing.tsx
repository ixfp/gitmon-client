// import React, { useRef } from "react";
import gitmonLogo from "@assets/gitmon.svg";
import "@styles/landing.css";
// import { useNavigate } from "react-router-dom";
import GithubLoginButton from "@components/GithubLoginButton";

function Landing() {
  // const navigate = useNavigate();

  // const inputRef = useRef<HTMLInputElement>(null);

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter" && inputRef.current) {
  //     // Enter 키가 눌렸을 때 /temp로 이동\
  //     const inputValue = inputRef.current.value.trim();
  //     navigate(`/tempBlog/${inputValue}`);
  //   }
  // };

  return (
    <div className="flex flex-col items-center">
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
      <br />
      {/* <input ref={inputRef} onKeyDown={handleKeyDown} /> */}
      <GithubLoginButton />
    </div>
  );
}

export default Landing;
