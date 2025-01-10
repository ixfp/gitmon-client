import React from "react";

import { useDummyData } from "@hooks/temp/useDummyData";

import Loading from "./Loading";
import MarkdownRenderer from "./MarkdownRenderer";

const IntroComponent: React.FC = () => {
  const { data, isLoading, isError } = useDummyData("dummyIntro");

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <div>Error fetching data</div>;
  }

  return <MarkdownRenderer markdown={data.intro} />;
};

export default IntroComponent;
