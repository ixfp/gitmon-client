import React from "react";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";
import { useDummyData } from "@hooks/temp/useDummyData";

const IntroComponent: React.FC = () => {
  const { data, isLoading, isError } = useDummyData("dummyIntro");

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <div>Error fetching data</div>;
  }

  return <ReactMarkdown>{data.intro}</ReactMarkdown>;
};

export default IntroComponent;
