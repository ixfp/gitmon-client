import gitmonLogo from "@assets/gitmon.svg";
import React from "react";
import "@styles/landing.css";
import Image from "next/image";
import { Button } from "@components/ui/button";

function Landing() {
  return (
    <div className="text-center">
      <a
        className="flex justify-center"
        href="https://github.com/ixfp/gitmon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={gitmonLogo}
          className="size-24 p-6 transition-filter duration-300"
          alt="Gitmon logo"
        />
      </a>
      <h1>gitmon.blog</h1>
      <p className="read-the-docs">
        A blog integrated with GitHub for easy content synchronization and
        updates.
      </p>
      <br />
      <p>{"Let's Go to..."}</p>
      <Button>Empty Button, Please add Auth Button here</Button>
    </div>
  );
}

export default Landing;
